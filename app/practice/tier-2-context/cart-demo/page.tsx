'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
}
interface CartState {
  items: CartItem[];
  addItem: (name: string) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartState | undefined>(undefined);

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(name: string) {
    setItems(prev => [...prev, { id: Date.now(), name }]);
  }
  function removeItem(id: number) {
    setItems(prev => prev.filter(item => item.id !== id));
  }
  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

function AddItemButton() {
  const { addItem } = useCart();
  return <button onClick={() => addItem('Toothbrush')}>Add Toothbrush</button>;
}

function CartBadge() {
  const { items } = useCart();
  return <span>🛒 {items.length}</span>;
}

function CartList() {
  const { items, removeItem } = useCart();
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name} <button onClick={() => removeItem(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

function ClearCartButton() {
  const { clearCart } = useCart();
  return <button onClick={clearCart}>Clear cart</button>;
}

export default function CartDemoPage() {
  return (
    <CartProvider>
      <div>
        <h1>Exercise 9a: Cart context</h1>
        <AddItemButton />
        <CartBadge />
        <CartList />
        <ClearCartButton />
      </div>
    </CartProvider>
  );
}