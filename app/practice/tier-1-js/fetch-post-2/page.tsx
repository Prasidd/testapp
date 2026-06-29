"use client";

import { useState } from "react";

export default function FetchTwoPage() {
  const [status, setStatus] = useState<number | null>(null);
  const [result, setResult] = useState<any | null>(null);

  async function handlePost() {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: 1,
        name: "JOHN DOE",
        comment: "What a great pic my friend",
      }),
    });
    setStatus(res.status);
    const data = await res.json();

    setResult(data);
  }

  return (
    <div>
      <h1>POST 2</h1>
      <button onClick={handlePost}>
        {" "}
        Create Comment
        {status && (
          <p>
            Status : {status} {status === 201 && "(created!)"}
          </p>
        )}
        {result && (
          <div>
            <p>New comment id : {result.postId}</p>
            <p>New comment : {result.comment}</p>
            <p>Name : {result.name}</p>
          </div>
        )}
      </button>
    </div>
  );
}
