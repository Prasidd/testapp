'use client';
import { useState } from 'react';

export default function FetchGetPage() {
  const [data, setData] = useState<any[] | null>(null);

  async function handleFetch() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    setData(users);
  }

  return (
    <div>
      <h1>Exercise 1: Fetch GET</h1>
      <button onClick={handleFetch}>Fetch users</button>
      {data && (
        <div>
          <p>Total users: {data.length}</p>
          <p>3rd user's city: {data[2].address.city}</p>
        </div>
      )}
    </div>
  );
}