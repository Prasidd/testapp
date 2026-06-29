import Link from 'next/link';

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 24, padding: 20 }}>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
        <strong>Tier 1 — JS</strong>
        <Link href="/practice/tier-1-js/fetch-get">1. Fetch GET</Link>
        <Link href="/practice/tier-1-js/fetch-get-2">1b. Fetch GET (yours)</Link>
        <Link href="/practice/tier-1-js/fetch-post">2. Fetch POST</Link>
         <Link href="/practice/tier-1-js/fetch-post-2">2b. Fetch POST</Link>
        <Link href="/practice/tier-1-js/filter-transform">3. Filter + transform</Link>
                <Link href="/practice/tier-1-js/filter-transform-2">3b. Filter + transform</Link>
        <Link href="/practice/tier-1-js/fake-login">4. Fake login</Link>
        <Link href="/practice/tier-1-js/base-demo">5. Base64</Link>
        <Link href="/practice/tier-1-js/expiry-check">7. Expiry check</Link>
        <strong>Tier 2 — Context</strong>
        <Link href="/practice/tier-2-context/theme-demo">8. Theme</Link>
         <Link href="/practice/tier-2-context/language-demo">8a. Theme</Link>
        <Link href="/practice/tier-2-context/cart-demo">9. Cart</Link>
        <Link href="/practice/tier-2-context/auth-demo">10. Auth demo</Link>
      </nav>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}