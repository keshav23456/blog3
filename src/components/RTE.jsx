import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "", onSelectionChange }) {
  return (
    <div className="w-full space-y-2" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative rounded-lg border border-gray-300 shadow-sm hover:border-blue-500 transition-colors duration-200" dir="ltr" style={{ direction: 'ltr' }}>
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Editor
              value={value || defaultValue}
              apiKey="qao5sgbszpb9mp752c40eyocl8w3jkime0fndo083rlziqze"
              init={{
                height: 500,
                menubar: true,
                readonly: false,
                skin: "oxide",
                content_css: "default",
                directionality: "ltr",
                language: "en",
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                  "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "help", "wordcount"
                ],
                toolbar: [
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify |",
                  "bullist numlist outdent indent | removeformat | help | image media link table code"
                ].join(" "),
                content_style: `
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #374151;
                    margin: 1rem;
                    direction: ltr !important;
                    text-align: left !important;
                  }
                  * {
                    direction: ltr !important;
                    unicode-bidi: normal !important;
                  }
                  p, h1, h2, h3, h4, h5, h6, div, span, li, td, th {
                    direction: ltr !important;
                    text-align: left !important;
                  }
                  h1, h2, h3, h4, h5, h6 {
                    font-weight: 600;
                    line-height: 1.25;
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                  }
                  p { margin: 1em 0; }
                  a { color: #2563eb; }
                  img { max-width: 100%; height: auto; }
                  blockquote {
                    border-left: 4px solid #e5e7eb;
                    margin: 1em 0;
                    padding-left: 1em;
                    font-style: italic;
                  }
                  code {
                    background: #f3f4f6;
                    padding: 0.2em 0.4em;
                    border-radius: 3px;
                    font-size: 0.9em;
                  }
                `,
                setup: (editor) => {
                  editor.on('init', () => {
                    editor.getContainer().style.transition = "border-color 0.2s ease-in-out";
                    
                    // Force LTR on initialization
                    const body = editor.getBody();
                    if (body) {
                      body.setAttribute('dir', 'ltr');
                      body.style.direction = 'ltr';
                      body.style.textAlign = 'left';
                    }
                  });
                  
                  // Continuously enforce LTR
                  editor.on('NodeChange', () => {
                    const body = editor.getBody();
                    if (body) {
                      body.setAttribute('dir', 'ltr');
                      body.style.direction = 'ltr';
                    }
                  });
                  
                  // Capture text selection for AI features
                  if (onSelectionChange) {
                    editor.on('NodeChange', () => {
                      const selectedText = editor.selection.getContent({ format: 'text' });
                      if (selectedText && selectedText.trim().length > 0) {
                        onSelectionChange(selectedText.trim());
                      }
                    });
                    
                    editor.on('SelectionChange', () => {
                      const selectedText = editor.selection.getContent({ format: 'text' });
                      if (selectedText && selectedText.trim().length > 0) {
                        onSelectionChange(selectedText.trim());
                      } else {
                        onSelectionChange('');
                      }
                    });
                  }
                },
                image_title: true,
                automatic_uploads: true,
                file_picker_types: 'image',
                paste_data_images: true,
                browser_spellcheck: true,
                contextmenu: false,
                link_context_toolbar: true,
                link_default_target: '_blank',
                link_assume_external_targets: true,
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}