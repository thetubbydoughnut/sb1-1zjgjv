"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Post {
  id: number;
  content: string;
  user: {
    username: string;
    profile_picture: string;
  };
  created_at: string;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setError('Failed to fetch posts. Please try again later.');
      toast.error("An error occurred while fetching posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: newPost }),
      });

      if (response.ok) {
        setNewPost('');
        fetchPosts();
        toast.success("Post created successfully!");
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      toast.error("An error occurred while creating the post");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl mt-10">
      <form onSubmit={handleSubmit} className="mb-8">
        <Input
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className="mb-2"
        />
        <Button type="submit">Post</Button>
      </form>

      {posts.length === 0 ? (
        <div className="text-center mt-8">No posts yet. Be the first to post!</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.user.profile_picture} />
                  <AvatarFallback>{post.user.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.user.username}</p>
                  <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost">Like</Button>
                <Button variant="ghost">Comment</Button>
                <Button variant="ghost">Share</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}