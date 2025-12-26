/**
 * AI Tag Generator Component
 * 
 * Automatically suggests tags based on post content
 */

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sparkles, Loader2, Plus, X } from 'lucide-react';
import aiService from '../services/aiService';

export default function AITagGenerator({ content, currentTags = [], onAddTags }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const generateTags = async () => {
    if (!content || content.length < 100) {
      setError('Please write at least 100 characters to generate tags');
      return;
    }

    if (!aiService.isConfigured()) {
      setError('AI service not configured');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const tags = await aiService.generateTags(content, 8);
      setSuggestions(tags);
    } catch (err) {
      console.error('Tag generation error:', err);
      setError('Failed to generate tags. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const addTag = (tagObj) => {
    if (onAddTags && !currentTags.includes(tagObj.tag)) {
      onAddTags([...currentTags, tagObj.tag]);
      setSuggestions(suggestions.filter((s) => s.tag !== tagObj.tag));
    }
  };

  const removeSuggestion = (tag) => {
    setSuggestions(suggestions.filter((s) => s.tag !== tag));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-600" />
          AI Tag Suggestions
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={generateTags}
          disabled={isGenerating || !content}
          className="gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Tags
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      {suggestions.length > 0 && (
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg space-y-2">
          <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
            Suggested Tags (click to add):
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((tagObj) => (
              <div key={tagObj.tag} className="relative group">
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-purple-600 hover:text-white transition-colors pr-8"
                  onClick={() => addTag(tagObj)}
                >
                  {tagObj.tag}
                  <span className="ml-1 text-xs opacity-70">
                    {Math.round(tagObj.confidence * 100)}%
                  </span>
                </Badge>
                <button
                  type="button"
                  onClick={() => removeSuggestion(tagObj.tag)}
                  className="absolute -top-1 -right-1 bg-gray-200 dark:bg-gray-700 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


