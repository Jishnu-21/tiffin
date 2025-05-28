'use client';

import React, { ReactNode } from 'react';
import Cart from './components/Cart';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Cart />
    </>
  );
}
