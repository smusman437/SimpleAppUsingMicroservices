// @ts-nocheck
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    return res.data;
  };

  const { status, error, data } = useQuery({
    queryKey: ["posts"],
    keepPreviousData: true,
    queryFn: fetchPosts,
  });

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;

  const renderedPosts = Object.values(data).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
