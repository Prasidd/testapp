'use client'

import { useState } from "react";

export default function FetchPostPage(){
    const [status, setStatus] = useState<number | null>(null);
    const [result, setResult] = useState<any | null>(null)

    async function handleCreate(){
        const res = await fetch("https://jsonplaceholder.typicode.com/posts",{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({title : 'hello', body : 'test', uId : 1})
        })

        setStatus(res.status);

        const data = await res.json();
        setResult(data)
    }

    return (
        <div>
            <h1>Exercise 2 : Fetch Post </h1>
            <button onClick={handleCreate}>Create Post</button>
            {status && <p>Status : {status} {status === 201 && '(created!)'}</p>}
            {result && <p> New post id : {result.id}</p>}
        </div>
    )
}