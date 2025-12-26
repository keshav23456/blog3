/**
 * Comment Moderation Component
 * 
 * AI-powered comment moderation for spam and toxicity detection
 */

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Shield, AlertTriangle, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import aiService from '../services/aiService';

export default function CommentModeration({ commentText, onModerationResult, autoCheck = false }) {
  const [isChecking, setIsChecking] = useState(false);
  const [spamResult, setSpamResult] = useState(null);
  const [toxicityResult, setToxicityResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (autoCheck && commentText && commentText.length > 10) {
      checkComment();
    }
  }, [autoCheck, commentText]);

  const checkComment = async () => {
    if (!commentText || commentText.length < 10) {
      setError('Comment too short to analyze');
      return;
    }

    if (!aiService.isConfigured()) {
      setError('AI service not configured');
      return;
    }

    setIsChecking(true);
    setError(null);

    try {
      const [spam, toxicity] = await Promise.all([
        aiService.detectSpam(commentText),
        aiService.detectToxicity(commentText),
      ]);

      setSpamResult(spam);
      setToxicityResult(toxicity);

      if (onModerationResult) {
        onModerationResult({
          isSpam: spam.isSpam,
          isToxic: toxicity.isToxic,
          action: toxicity.action,
          severity: toxicity.severity,
          shouldBlock: spam.isSpam || toxicity.action === 'reject',
          shouldFlag: toxicity.action === 'flag',
        });
      }
    } catch (err) {
      console.error('Moderation error:', err);
      setError('Failed to moderate comment. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'reject':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'flag':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'approve':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  if (!commentText) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-600" />
          AI Comment Moderation
        </label>
        {!autoCheck && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={checkComment}
            disabled={isChecking}
            className="gap-2"
          >
            {isChecking ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Check Comment
              </>
            )}
          </Button>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      {isChecking && (
        <div className="flex items-center justify-center gap-2 py-4 text-blue-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Analyzing comment...</span>
        </div>
      )}

      {(spamResult || toxicityResult) && !isChecking && (
        <div className="space-y-3">
          {/* Spam Detection Result */}
          {spamResult && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Spam Detection:</span>
                <Badge variant={spamResult.isSpam ? 'destructive' : 'default'}>
                  {spamResult.isSpam ? (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Spam ({Math.round(spamResult.confidence * 100)}%)
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Clean ({Math.round(spamResult.confidence * 100)}%)
                    </>
                  )}
                </Badge>
              </div>
              {spamResult.isSpam && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {spamResult.reason}
                </p>
              )}
            </div>
          )}

          {/* Toxicity Detection Result */}
          {toxicityResult && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Toxicity Check:</span>
                <div className="flex gap-2">
                  {toxicityResult.isToxic && (
                    <Badge className={getSeverityColor(toxicityResult.severity)}>
                      {toxicityResult.severity} severity
                    </Badge>
                  )}
                  <Badge className={getActionColor(toxicityResult.action)}>
                    {toxicityResult.action}
                  </Badge>
                </div>
              </div>
              {toxicityResult.isToxic && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Confidence: {Math.round(toxicityResult.confidence * 100)}%
                  </p>
                  {toxicityResult.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {toxicityResult.categories.map((cat) => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Overall Status */}
          {(spamResult?.isSpam || toxicityResult?.action === 'reject') && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-sm text-red-700 dark:text-red-400 font-medium">
                This comment should be blocked
              </span>
            </div>
          )}

          {toxicityResult?.action === 'flag' && !spamResult?.isSpam && (
            <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-orange-700 dark:text-orange-400 font-medium">
                This comment requires manual review
              </span>
            </div>
          )}

          {!spamResult?.isSpam && toxicityResult?.action === 'approve' && (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-700 dark:text-green-400 font-medium">
                Comment looks good!
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


