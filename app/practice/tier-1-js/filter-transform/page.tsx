'use client';
import { useState } from 'react';

export default function FilterTransformPage() {
  const [names, setNames] = useState<string[]>([]);

  async function handleRun() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    const filtered = users.filter((u: any) => u.address.city.includes('ville'));
    const mapped = filtered.map((u: any) => u.name);

    setNames(mapped);
  }

  return (
    <div>
      <h1>Exercise 3: Filter + transform</h1>
      <button onClick={handleRun}>Run</button>
      <ul>{names.map(n => <li key={n}>{n}</li>)}</ul>
    </div>
  );
}