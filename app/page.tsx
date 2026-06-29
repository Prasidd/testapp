import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Practice exercises</h1>
      <p>Pick up where you left off:</p>
      <Link href="/practice/tier-1-js/fetch-get">Start at Tier 1 →</Link>
    </div>
  );
}