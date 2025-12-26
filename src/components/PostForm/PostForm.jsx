import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TagsInput from "../TagsInput";
import AITagGenerator from "../AITagGenerator";
import AIWritingAssistant from "../AIWritingAssistant";
import { useAutoSave } from "../../hooks/useAutoSave";
import { 
  FileText, 
  Link2, 
  ImagePlus, 
  Settings, 
  Tag, 
  Send, 
  Save,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  
  // State for tags
  const [tags, setTags] = useState(post?.tags || []);
  
  // State for AI writing assistant
  const [selectedText, setSelectedText] = useState('');
  
  // Watch content for AI features
  const contentValue = watch("content");
  
  // Auto-save functionality
  const { clear: clearAutoSave } = useAutoSave(
    {
      title: watch("title"),
      content: contentValue,
      tags: tags,
    },
    post?.$id || 'new-post',
    {
      delay: 3000,
      enabled: true,
      onSave: (data) => {
        console.log('Draft auto-saved:', new Date().toLocaleTimeString());
      }
    }
  );

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.featuredimages?.[0]
          ? await appwriteService.uploadFile(data.featuredimages[0])
          : null;
        
        if (file) {
          await appwriteService.deleteFile(post.featuredimages);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredimages: file ? file.$id : undefined,
          tags: tags, // Include tags
        });

        if (dbPost) {
          clearAutoSave(); // Clear auto-saved draft
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.featuredimages[0]);

        if (file && userData) {
          const fileId = file.$id;
          data.featuredimages = fileId;
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
            tags: tags, // Include tags
          });

          if (dbPost) {
            clearAutoSave(); // Clear auto-saved draft
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Error creating post: ' + (error.message || 'Please check console'));
    }
  };
  
  // Handle text replacement from AI Assistant
  const handleReplaceText = (newText) => {
    const currentContent = getValues("content");
    if (selectedText && currentContent.includes(selectedText)) {
      const updatedContent = currentContent.replace(selectedText, newText);
      setValue("content", updatedContent);
      setSelectedText('');
    }
  };
  
  // Handle text insertion from AI Assistant
  const handleInsertText = (newText) => {
    const currentContent = getValues("content");
    setValue("content", currentContent + '\n\n' + newText);
    setSelectedText('');
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      let slug = value
        .trim()
        .toLowerCase()
        // Replace spaces with hyphens
        .replace(/\s+/g, "-")
        // Remove all characters except a-z, 0-9, period, hyphen, underscore
        .replace(/[^a-z0-9._-]/g, "")
        // Remove consecutive hyphens/periods/underscores
        .replace(/[-_.]{2,}/g, "-")
        // Remove leading special characters (must start with alphanumeric)
        .replace(/^[^a-z0-9]+/, "")
        // Remove trailing special characters
        .replace(/[^a-z0-9]+$/, "")
        // Limit to 36 characters (Appwrite's max)
        .substring(0, 36)
        // Remove trailing special character if truncation created one
        .replace(/[^a-z0-9]+$/, "");
      
      // If slug is empty after transformation, generate a default
      return slug || `post-${Date.now().toString(36)}`.substring(0, 36);
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8" dir="ltr">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title & Slug Section */}
          <div className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-sm rounded-2xl shadow-sm border-2 border-gray-100 dark:border-gray-700/50 p-8 hover:shadow-md dark:hover:shadow-purple-900/20 transition-all dark:hover:border-purple-700/50">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700/50">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 dark:ring-1 dark:ring-purple-700/50">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Post Information
              </h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <Input
                  label="Title"
                  placeholder="Enter an engaging title..."
                  className="text-xl font-semibold"
                  error={errors.title?.message}
                  {...register("title", { 
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters"
                    }
                  })}
                />
                {errors.title && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.title.message}</span>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Link2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    URL Slug
                  </label>
                </div>
                <Input
                  placeholder="post-url-slug"
                  className="font-mono text-sm"
                  error={errors.slug?.message}
                  {...register("slug", { 
                    required: "Slug is required",
                    maxLength: {
                      value: 36,
                      message: "Slug must be 36 characters or less"
                    },
                    pattern: {
                      value: /^[a-z0-9][a-z0-9._-]*[a-z0-9]$|^[a-z0-9]$/,
                      message: "Slug must start and end with letter/number, and contain only a-z, 0-9, period, hyphen, underscore"
                    }
                  })}
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {
                      shouldValidate: true,
                    });
                  }}
                />
                {!errors.slug && watch("slug") && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>URL: /post/{watch("slug")} ({watch("slug").length}/36)</span>
                  </div>
                )}
                {errors.slug && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.slug.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Editor Section */}
          <div className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-sm rounded-2xl shadow-sm border-2 border-gray-100 dark:border-gray-700/50 p-8 hover:shadow-md dark:hover:shadow-blue-900/20 transition-all dark:hover:border-blue-700/50">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700/50">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 dark:ring-1 dark:ring-blue-700/50">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Content Editor
              </h2>
            </div>
            
            <RTE
              label=""
              name="content"
              control={control}
              defaultValue={getValues("content")}
              onSelectionChange={setSelectedText}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Writing Assistant */}
          <AIWritingAssistant
            selectedText={selectedText}
            onReplace={handleReplaceText}
            onInsert={handleInsertText}
          />

          {/* Post Settings */}
          <div className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-sm rounded-2xl shadow-sm border-2 border-gray-100 dark:border-gray-700/50 p-6 hover:shadow-md dark:hover:shadow-green-900/20 transition-all dark:hover:border-green-700/50">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700/50">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50 dark:ring-1 dark:ring-green-700/50">
                <Settings className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Settings
              </h3>
            </div>
            
            <div className="space-y-5">
              {/* Featured Image */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ImagePlus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Featured Image
                  </label>
                </div>
                <Input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  error={errors.featuredimages?.message}
                  className="text-sm"
                  {...register("featuredimages", { required: !post })}
                />
                {errors.featuredimages && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.featuredimages.message}
                  </p>
                )}
              </div>

              {post?.featuredimages && (
                <div className="rounded-xl overflow-hidden border-2 border-gray-100 dark:border-gray-700/50 ring-1 ring-gray-900/5 dark:ring-gray-700/50">
                  <img
                    src={appwriteService.getFilePreview(post.featuredimages)}
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Status */}
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 block">
                  Publication Status
                </label>
                <Select
                  options={["active", "inactive"]}
                  {...register("status", { required: true })}
                  className="capitalize"
                />
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-sm rounded-2xl shadow-sm border-2 border-gray-100 dark:border-gray-700/50 p-6 hover:shadow-md dark:hover:shadow-purple-900/20 transition-all dark:hover:border-purple-700/50">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700/50">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 dark:ring-1 dark:ring-purple-700/50">
                <Tag className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Tags
              </h3>
            </div>
            
            <div className="space-y-4">
              {/* Manual Tag Input */}
              <TagsInput
                value={tags}
                onChange={setTags}
                placeholder="Type and press Enter..."
              />
              
              {/* AI Tag Generator */}
              <AITagGenerator
                content={contentValue}
                currentTags={tags}
                onAddTags={setTags}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 dark:backdrop-blur-sm rounded-2xl shadow-sm border-2 border-purple-200 dark:border-purple-700/50 dark:ring-1 dark:ring-purple-700/30 p-6 sticky top-24">
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 shadow-lg hover:shadow-xl dark:shadow-purple-900/50 dark:hover:shadow-purple-900/70 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{post ? "Updating..." : "Publishing..."}</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {post ? <Save className="h-5 w-5" /> : <Send className="h-5 w-5" />}
                  {post ? "Update Post" : "Publish Post"}
                </span>
              )}
            </Button>
            
            {/* Auto-save indicator */}
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-purple-600 dark:text-purple-300">
              <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse shadow-sm dark:shadow-green-400/50"></div>
              <span className="font-medium">Auto-saving drafts</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}