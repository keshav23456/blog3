/**
 * Sitemap Generation Utilities
 * 
 * Generates XML sitemap for SEO
 * Can be run manually or scheduled
 */

import appwriteService from '../appwrite/config';

/**
 * Generate sitemap XML
 */
export const generateSitemap = async () => {
  try {
    const siteUrl = window.location.origin;
    
    // Get all active posts
    const posts = await appwriteService.getPosts();
    
    // Build sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- All Posts Page -->
  <url>
    <loc>${siteUrl}/all-posts</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

    // Add each post
    if (posts && posts.documents) {
      posts.documents.forEach((post) => {
        const postDate = new Date(post.$createdAt);
        sitemap += `  
  <!-- Post: ${post.title} -->
  <url>
    <loc>${siteUrl}/post/${post.$id}</loc>
    <lastmod>${postDate.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      });
    }

    sitemap += `</urlset>`;

    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
};

/**
 * Download sitemap as XML file
 */
export const downloadSitemap = async () => {
  try {
    const sitemap = await generateSitemap();
    
    // Create blob and download
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Sitemap downloaded successfully');
  } catch (error) {
    console.error('Error downloading sitemap:', error);
  }
};

/**
 * Get sitemap as string (for copy-paste)
 */
export const getSitemapString = async () => {
  return await generateSitemap();
};


