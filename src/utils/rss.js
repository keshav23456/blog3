/**
 * RSS Feed Generation Utilities
 * 
 * Generates RSS 2.0 feed for blog posts
 * Can be used for feed readers and syndication
 */

import appwriteService from '../appwrite/config';

/**
 * Generate RSS feed XML
 */
export const generateRSSFeed = async () => {
  try {
    const siteUrl = window.location.origin;
    const currentDate = new Date().toUTCString();
    
    // Get all active posts
    const posts = await appwriteService.getPosts();
    
    // Build RSS XML
    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Apogee Blog</title>
    <link>${siteUrl}</link>
    <description>Discover insightful articles, stories, and ideas from talented writers</description>
    <language>en-us</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
`;

    // Add each post
    if (posts && posts.documents) {
      posts.documents
        .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
        .forEach((post) => {
          const postDate = new Date(post.$createdAt).toUTCString();
          const postUrl = `${siteUrl}/post/${post.$id}`;
          
          // Strip HTML tags from content for description
          const plainText = post.content.replace(/<[^>]*>/g, '');
          const description = plainText.substring(0, 200) + '...';
          
          // Get featured image URL if exists
          let imageUrl = '';
          if (post.featuredimages) {
            imageUrl = appwriteService.getFilePreview(post.featuredimages);
          }

          rss += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${postDate}</pubDate>
      ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ''}
      ${post.tags && post.tags.length > 0 ? post.tags.map(tag => `<category>${tag}</category>`).join('\n      ') : ''}
    </item>
`;
        });
    }

    rss += `  </channel>
</rss>`;

    return rss;
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    throw error;
  }
};

/**
 * Download RSS feed as XML file
 */
export const downloadRSSFeed = async () => {
  try {
    const rss = await generateRSSFeed();
    
    // Create blob and download
    const blob = new Blob([rss], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rss.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('RSS feed downloaded successfully');
  } catch (error) {
    console.error('Error downloading RSS feed:', error);
  }
};

/**
 * Get RSS feed as string (for copy-paste)
 */
export const getRSSFeedString = async () => {
  return await generateRSSFeed();
};


