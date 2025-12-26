/**
 * Reading Time Calculator
 * 
 * Calculates estimated reading time based on word count
 * Average reading speed: 200-250 words per minute
 */

const WORDS_PER_MINUTE = 225;
const WORDS_PER_MINUTE_SLOW = 200;
const WORDS_PER_MINUTE_FAST = 250;

/**
 * Strip HTML tags and get plain text
 */
const stripHtml = (html) => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
};

/**
 * Count words in text
 */
const countWords = (text) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Calculate reading time in minutes
 */
export const calculateReadingTime = (content, options = {}) => {
  const {
    wordsPerMinute = WORDS_PER_MINUTE,
    includeImages = true,
    imageReadingTime = 12, // seconds per image
  } = options;

  // Get plain text
  const plainText = stripHtml(content);
  
  // Count words
  const wordCount = countWords(plainText);
  
  // Calculate base reading time
  let readingTimeMinutes = wordCount / wordsPerMinute;

  // Add time for images (if content includes images)
  if (includeImages) {
    const imageCount = (content.match(/<img/g) || []).length;
    const imageTimeMinutes = (imageCount * imageReadingTime) / 60;
    readingTimeMinutes += imageTimeMinutes;
  }

  return Math.ceil(readingTimeMinutes);
};

/**
 * Format reading time for display
 */
export const formatReadingTime = (minutes) => {
  if (minutes < 1) return 'Less than a minute';
  if (minutes === 1) return '1 minute read';
  return `${minutes} min read`;
};

/**
 * Get reading time with range
 */
export const getReadingTimeRange = (content) => {
  const plainText = stripHtml(content);
  const wordCount = countWords(plainText);

  const minTime = Math.ceil(wordCount / WORDS_PER_MINUTE_FAST);
  const maxTime = Math.ceil(wordCount / WORDS_PER_MINUTE_SLOW);

  if (minTime === maxTime) {
    return formatReadingTime(minTime);
  }

  return `${minTime}-${maxTime} min read`;
};

/**
 * Get detailed reading stats
 */
export const getReadingStats = (content) => {
  const plainText = stripHtml(content);
  const wordCount = countWords(plainText);
  const characterCount = plainText.length;
  const sentenceCount = (plainText.match(/[.!?]+/g) || []).length;
  const paragraphCount = (content.match(/<p>/g) || []).length;
  const imageCount = (content.match(/<img/g) || []).length;

  const readingTime = calculateReadingTime(content);

  return {
    wordCount,
    characterCount,
    sentenceCount,
    paragraphCount,
    imageCount,
    readingTime: formatReadingTime(readingTime),
    readingTimeMinutes: readingTime,
  };
};

export default {
  calculateReadingTime,
  formatReadingTime,
  getReadingTimeRange,
  getReadingStats,
};


