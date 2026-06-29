'use client';
import { useState } from 'react';

export default function Base64DemoPage() {
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  function handleEncode() {
    const obj = { name: 'prasidd', role: 'admin' };
    const jsonString = JSON.stringify(obj);
    const result = btoa(jsonString);
    setEncoded(result);
  }

  function handleDecode() {
    const jsonString = atob(encoded);
    const obj = JSON.parse(jsonString);
    setDecoded(JSON.stringify(obj));
  }

  return (
    <div>
      <h1>Exercise 5: Base64 demo</h1>
      <button onClick={handleEncode}>Encode</button>
      <p style={{ wordBreak: 'break-all' }}>Encoded: {encoded}</p>
      <button onClick={handleDecode}>Decode</button>
      <p>Decoded: {decoded}</p>
    </div>
  );
}