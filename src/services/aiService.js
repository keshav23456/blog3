/**
 * AI Service
 * 
 * Unified AI service supporting multiple providers:
 * - OpenAI (GPT-4, GPT-3.5)
 * - Anthropic (Claude)
 * - Google (Gemini)
 */

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

// AI Provider Configuration
const AI_CONFIG = {
  provider: import.meta.env.VITE_AI_PROVIDER || 'openai', // 'openai', 'claude', 'gemini'
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: 'gpt-4-turbo-preview',
  },
  claude: {
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    model: 'claude-3-sonnet-20240229',
  },
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    model: 'gemini-2.5-flash', // Latest model name
  },
};

class AIService {
  constructor() {
    this.provider = AI_CONFIG.provider;
    this.initializeClients();
  }

  initializeClients() {
    // Initialize OpenAI
    if (AI_CONFIG.openai.apiKey) {
      this.openai = new OpenAI({
        apiKey: AI_CONFIG.openai.apiKey,
        dangerouslyAllowBrowser: true, // For client-side use (consider backend for production)
      });
    }

    // Initialize Claude
    if (AI_CONFIG.claude.apiKey) {
      this.claude = new Anthropic({
        apiKey: AI_CONFIG.claude.apiKey,
        dangerouslyAllowBrowser: true,
      });
    }

    // Initialize Gemini
    if (AI_CONFIG.gemini.apiKey) {
      this.gemini = new GoogleGenerativeAI(AI_CONFIG.gemini.apiKey);
    }
  }

  /**
   * Main AI completion method
   * Routes to appropriate provider
   */
  async complete(prompt, options = {}) {
    try {
      switch (this.provider) {
        case 'openai':
          return await this.completeWithOpenAI(prompt, options);
        case 'claude':
          return await this.completeWithClaude(prompt, options);
        case 'gemini':
          return await this.completeWithGemini(prompt, options);
        default:
          throw new Error(`Unknown AI provider: ${this.provider}`);
      }
    } catch (error) {
      console.error(`AI ${this.provider} error:`, error);
      throw error;
    }
  }

  /**
   * OpenAI completion
   */
  async completeWithOpenAI(prompt, options = {}) {
    if (!this.openai) {
      throw new Error('OpenAI client not initialized. Check API key.');
    }

    const response = await this.openai.chat.completions.create({
      model: options.model || AI_CONFIG.openai.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000,
    });

    return response.choices[0].message.content;
  }

  /**
   * Claude completion
   */
  async completeWithClaude(prompt, options = {}) {
    if (!this.claude) {
      throw new Error('Claude client not initialized. Check API key.');
    }

    const response = await this.claude.messages.create({
      model: options.model || AI_CONFIG.claude.model,
      max_tokens: options.maxTokens || 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0].text;
  }

  /**
   * Gemini completion
   */
  async completeWithGemini(prompt, options = {}) {
    if (!this.gemini) {
      throw new Error('Gemini client not initialized. Check API key.');
    }

    const model = this.gemini.getGenerativeModel({
      model: options.model || AI_CONFIG.gemini.model,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  /**
   * Writing Assistant - Improve Writing
   */
  async improveWriting(content) {
    const prompt = `Improve the following text. Make it more engaging, clear, and professional while preserving the original meaning and tone:

${content}

Provide only the improved version without explanations.`;

    return await this.complete(prompt);
  }

  /**
   * Writing Assistant - Make Concise
   */
  async makeConcise(content) {
    const prompt = `Make the following text more concise while keeping all key information:

${content}

Provide only the concise version without explanations.`;

    return await this.complete(prompt);
  }

  /**
   * Writing Assistant - Fix Grammar
   */
  async fixGrammar(content) {
    const prompt = `Fix grammar, spelling, and punctuation errors in the following text:

${content}

Provide only the corrected version without explanations or markup.`;

    return await this.complete(prompt);
  }

  /**
   * Writing Assistant - Change Tone
   */
  async changeTone(content, tone) {
    const tonePrompts = {
      professional: 'professional and formal',
      casual: 'casual and conversational',
      technical: 'technical and precise',
      friendly: 'friendly and approachable',
      academic: 'academic and scholarly',
    };

    const toneDescription = tonePrompts[tone] || tone;

    const prompt = `Rewrite the following text in a ${toneDescription} tone:

${content}

Provide only the rewritten version without explanations.`;

    return await this.complete(prompt);
  }

  /**
   * Writing Assistant - Generate Summary
   */
  async generateSummary(content, maxLength = 200) {
    const prompt = `Create a concise summary of the following text (max ${maxLength} words):

${content}

Provide only the summary without introductory phrases.`;

    return await this.complete(prompt, { maxTokens: 300 });
  }

  /**
   * AI Tag Generation
   */
  async generateTags(content, maxTags = 5) {
    const prompt = `Analyze the following blog post content and suggest ${maxTags} relevant tags/keywords. Consider the main topics, themes, and key concepts.

Content:
${content.substring(0, 2000)} ${content.length > 2000 ? '...' : ''}

Respond with only a JSON array of tags with confidence scores, like this:
[{"tag": "technology", "confidence": 0.95}, {"tag": "ai", "confidence": 0.88}]

Provide only the JSON array, no other text.`;

    const response = await this.complete(prompt, { temperature: 0.5 });
    
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return [];
    } catch (error) {
      console.error('Error parsing tags:', error);
      return [];
    }
  }

  /**
   * AI Category Detection
   */
  async detectCategory(content) {
    const categories = [
      'Technology',
      'Business',
      'Health & Wellness',
      'Travel',
      'Food & Cooking',
      'Entertainment',
      'Education',
      'Lifestyle',
      'Sports',
      'Science',
      'Politics',
      'Finance',
      'Other',
    ];

    const prompt = `Analyze the following blog post content and assign it to the most appropriate category from this list:
${categories.join(', ')}

Content:
${content.substring(0, 2000)} ${content.length > 2000 ? '...' : ''}

Respond with only a JSON object like this:
{"category": "Technology", "confidence": 0.92, "alternativeCategories": ["Science", "Business"]}

Provide only the JSON object, no other text.`;

    const response = await this.complete(prompt, { temperature: 0.3 });
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { category: 'Other', confidence: 0.5, alternativeCategories: [] };
    } catch (error) {
      console.error('Error parsing category:', error);
      return { category: 'Other', confidence: 0.5, alternativeCategories: [] };
    }
  }

  /**
   * Comment Moderation - Spam Detection
   */
  async detectSpam(commentText) {
    const prompt = `Analyze if the following comment is spam. Consider:
- Excessive links or promotional content
- Irrelevant content
- Repetitive patterns
- Suspicious keywords

Comment:
${commentText}

Respond with only a JSON object like this:
{"isSpam": true, "confidence": 0.95, "reason": "Contains multiple promotional links"}

Provide only the JSON object.`;

    const response = await this.complete(prompt, { temperature: 0.2 });
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { isSpam: false, confidence: 0.5, reason: 'Unable to analyze' };
    } catch (error) {
      console.error('Error detecting spam:', error);
      return { isSpam: false, confidence: 0.5, reason: 'Analysis error' };
    }
  }

  /**
   * Comment Moderation - Toxicity Detection
   */
  async detectToxicity(commentText) {
    const prompt = `Analyze the following comment for toxic content. Check for:
- Hate speech or discrimination
- Harassment or bullying
- Profanity or vulgarity
- Threats or violence
- Personal attacks

Comment:
${commentText}

Respond with only a JSON object like this:
{"isToxic": true, "severity": "high", "confidence": 0.92, "categories": ["profanity", "personal attack"], "action": "flag"}

Severity: "low", "medium", "high"
Action: "approve", "flag", "reject"

Provide only the JSON object.`;

    const response = await this.complete(prompt, { temperature: 0.2 });
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { isToxic: false, severity: 'low', confidence: 0.5, categories: [], action: 'approve' };
    } catch (error) {
      console.error('Error detecting toxicity:', error);
      return { isToxic: false, severity: 'low', confidence: 0.5, categories: [], action: 'approve' };
    }
  }

  /**
   * Check if AI service is configured
   */
  isConfigured() {
    switch (this.provider) {
      case 'openai':
        return !!AI_CONFIG.openai.apiKey;
      case 'claude':
        return !!AI_CONFIG.claude.apiKey;
      case 'gemini':
        return !!AI_CONFIG.gemini.apiKey;
      default:
        return false;
    }
  }
}

// Export singleton instance
const aiService = new AIService();
export default aiService;

