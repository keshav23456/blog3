/**
 * AI Writing Assistant Component
 * 
 * Provides AI-powered writing suggestions directly in the editor
 */

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Wand2,
  Minimize2,
  Check,
  FileEdit,
  Zap,
  Sparkles,
  Loader2,
  AlertCircle,
  ArrowRight,
  Copy,
  Briefcase,
  MessageCircle,
  Code2,
  Smile,
} from 'lucide-react';
import aiService from '../services/aiService';

export default function AIWritingAssistant({ selectedText, onReplace, onInsert }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeAction, setActiveAction] = useState(null);

  if (!selectedText) {
    return (
      <Card className="border-2 border-dashed border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Writing Assistant
            </span>
          </CardTitle>
          <CardDescription className="text-base mt-3 leading-relaxed">
            ✨ Select text in the editor above to enhance your writing with AI
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-purple-100 dark:border-purple-900">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">How to use:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Highlight text by dragging your mouse</li>
                  <li>Choose an AI action</li>
                  <li>Review and apply the suggestion</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleAction = async (action, tone = null) => {
    if (!aiService.isConfigured()) {
      setError('AI service not configured. Please add an API key in your environment variables.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setActiveAction(action === 'tone' ? `${action}-${tone}` : action);

    try {
      let improvedText;

      switch (action) {
        case 'improve':
          improvedText = await aiService.improveWriting(selectedText);
          break;
        case 'concise':
          improvedText = await aiService.makeConcise(selectedText);
          break;
        case 'grammar':
          improvedText = await aiService.fixGrammar(selectedText);
          break;
        case 'tone':
          improvedText = await aiService.changeTone(selectedText, tone);
          break;
        case 'summary':
          improvedText = await aiService.generateSummary(selectedText);
          break;
        default:
          throw new Error('Unknown action');
      }

      setResult(improvedText);
    } catch (err) {
      console.error('AI error:', err);
      setError(err.message || 'Failed to process text. Please try again.');
    } finally {
      setIsLoading(false);
      setActiveAction(null);
    }
  };

  const handleReplace = () => {
    if (result && onReplace) {
      onReplace(result);
      setResult(null);
    }
  };

  const handleInsert = () => {
    if (result && onInsert) {
      onInsert(result);
      setResult(null);
    }
  };

  const toneOptions = [
    { value: 'professional', icon: Briefcase, label: 'Professional', color: 'blue' },
    { value: 'casual', icon: MessageCircle, label: 'Casual', color: 'green' },
    { value: 'technical', icon: Code2, label: 'Technical', color: 'purple' },
    { value: 'friendly', icon: Smile, label: 'Friendly', color: 'pink' },
  ];

  return (
    <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/20 shadow-lg">
      <CardHeader className="pb-4 border-b border-purple-100 dark:border-purple-900">
        <CardTitle className="flex items-center justify-between text-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 animate-pulse">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
              AI Assistant
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Active
          </div>
        </CardTitle>
        <CardDescription className="text-base mt-2 flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="font-semibold text-purple-600 dark:text-purple-400">{selectedText.length}</span> characters selected
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        {/* Quick Actions Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="h-auto py-4 px-4 justify-start hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all group"
              onClick={() => handleAction('improve')}
              disabled={isLoading}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
                  <Wand2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">Improve Writing</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Enhance quality & clarity</div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4 px-4 justify-start hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
              onClick={() => handleAction('concise')}
              disabled={isLoading}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                  <Minimize2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">Make Concise</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Remove unnecessary words</div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4 px-4 justify-start hover:bg-green-50 dark:hover:bg-green-950/30 hover:border-green-300 dark:hover:border-green-700 transition-all group"
              onClick={() => handleAction('grammar')}
              disabled={isLoading}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">Fix Grammar</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Correct errors & typos</div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4 px-4 justify-start hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:border-orange-300 dark:hover:border-orange-700 transition-all group"
              onClick={() => handleAction('summary')}
              disabled={isLoading}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/40 transition-colors">
                  <FileEdit className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">Summarize</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Create brief summary</div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Button>
          </div>
        </div>

        {/* Tone Change Section */}
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-purple-500" />
            Change Tone
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {toneOptions.map((tone) => (
              <Button
                key={tone.value}
                variant="outline"
                className={`h-auto py-3 px-3 hover:bg-${tone.color}-50 dark:hover:bg-${tone.color}-950/30 hover:border-${tone.color}-300 dark:hover:border-${tone.color}-700 transition-all group`}
                onClick={() => handleAction('tone', tone.value)}
                disabled={isLoading}
              >
                <div className="flex items-center gap-2 w-full">
                  <tone.icon className={`h-4 w-4 text-${tone.color}-600 dark:text-${tone.color}-400`} />
                  <span className="text-sm font-medium">{tone.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border-2 border-purple-200 dark:border-purple-800">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-purple-600 dark:text-purple-400" />
              <div className="text-center">
                <p className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                  AI is thinking...
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Generating your improved text
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900 dark:text-red-100 mb-1">Error</p>
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-5 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <p className="font-bold text-purple-900 dark:text-purple-100">
                  AI Suggestion
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-purple-100 dark:border-purple-900">
                <p className="text-base text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {result}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
                <Check className="h-3 w-3" />
                <span>{result.length} characters • Ready to apply</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={handleReplace} 
                className="h-12 gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Check className="h-5 w-5" />
                Replace Text
              </Button>
              <Button 
                variant="outline" 
                onClick={handleInsert} 
                className="h-12 gap-2 border-2 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:border-purple-300 dark:hover:border-purple-700"
              >
                <Zap className="h-5 w-5" />
                Insert Below
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

