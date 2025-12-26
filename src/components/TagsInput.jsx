import React, { useState, useRef } from 'react';
import { X, Tag as TagIcon } from 'lucide-react';
import { Badge } from './ui/badge';

const TagsInput = ({ value = [], onChange, placeholder = "Add tags..." }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      // Remove last tag on backspace if input is empty
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const trimmedInput = input.trim().toLowerCase();
    if (trimmedInput && !value.includes(trimmedInput)) {
      onChange([...value, trimmedInput]);
      setInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Tags
      </label>
      
      {/* Tags Display */}
      <div 
        className="flex flex-wrap gap-2 p-3 border-2 border-border rounded-lg bg-background focus-within:border-primary transition-colors cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, index) => (
          <Badge 
            key={index}
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1 text-sm"
          >
            <TagIcon className="w-3 h-3" />
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="ml-1 hover:text-destructive focus:outline-none"
              aria-label={`Remove ${tag} tag`}
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        
        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ''}
          dir="ltr"
          style={{ direction: 'ltr', textAlign: 'left' }}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm"
        />
      </div>

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground">
        Press Enter or comma to add tags. Click X to remove.
      </p>
    </div>
  );
};

export default TagsInput;

