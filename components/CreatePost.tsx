'use client';

import { useState, useEffect } from 'react';
import PostForm from '@/components/PostForm';

export default function CreatePost() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        marginBottom: '1.5rem',
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '100px'
      }} />
    );
  }

  return (
    <main style={{
      flex: 1,
      paddingTop: '8px', // Réduit de 16px à 8px
      margin: '0 auto',
      width: '100%',
      maxWidth: '550px',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        padding: '1rem',
        boxSizing: 'border-box',
        width: '100%',
      }}>
        <PostForm />
      </div>
    </main>
  );
}