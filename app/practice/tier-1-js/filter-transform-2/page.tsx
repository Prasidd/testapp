"use client";

import { useState } from "react";

export default function FilterTransformPractice2Page() {
  const [results, setResults] = useState<string[]>([]);

  async function handleRun() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    const filtered = data.filter((u: any) => u.id % 2 === 0);
    const mapped = filtered.map((u: any) => `${u.name}- ${u.address.city}`);

    setResults(mapped);

 
  }
     return (
      <div>
        <h1>Exercise 3b: Filter + transform (yours)</h1>
        <button onClick={handleRun}>Run</button>
        <ul>
          {results.map((r) => (
            <li key={r}>{r}</li>
            
          ))}
        </ul>
      </div>
    );
}
