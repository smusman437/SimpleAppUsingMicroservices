// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default ({ postId }) => {
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  const createComment = async () => {
    return await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
  };

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (response) => {
      queryClient.setQueryData(["posts"], (posts) => {
        let selectedPost = posts[postId];
        selectedPost = { ...selectedPost, comments: response.data };
        return { ...posts, [postId]: selectedPost };
      });
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    createCommentMutation.mutate();

    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
