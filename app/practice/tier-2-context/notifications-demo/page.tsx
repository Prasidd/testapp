'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: number;
  text: string;
  read: boolean;
}
interface NotificationState {
  notifications: Notification[];
  addNotification: (text: string) => void;
  markAsRead: (id: number) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationState | undefined>(undefined);

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  function addNotification(text: string) {
    setNotifications(prev => [...prev, { id: Date.now(), text, read: false }]);
  }
  function markAsRead(id: number) {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  }
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used inside NotificationProvider');
  return ctx;
}

function AddNotificationButton() {
  const { addNotification } = useNotifications();
  return <button onClick={() => addNotification('New appointment booked')}>Add notification</button>;
}

function UnreadBadge() {
  const { unreadCount } = useNotifications();
  return <span>🔔 {unreadCount}</span>;
}

function NotificationList() {
  const { notifications, markAsRead } = useNotifications();
  return (
    <ul>
      {notifications.map(n => (
        <li key={n.id} style={{ opacity: n.read ? 0.5 : 1 }}>
          {n.text}{' '}
          {n.read ? '(read)' : <button onClick={() => markAsRead(n.id)}>Mark read</button>}
        </li>
      ))}
    </ul>
  );
}

export default function NotificationsDemoPage() {
  return (
    <NotificationProvider>
      <div>
        <h1>Exercise 9b: Notifications context</h1>
        <AddNotificationButton />
        <UnreadBadge />
        <NotificationList />
      </div>
    </NotificationProvider>
  );
}