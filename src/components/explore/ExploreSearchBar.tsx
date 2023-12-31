
'use client'
// Ensure you have the appropriate type definitions for your dependencies

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input'; // Update the path based on your project structure
import { useRouter } from 'next/navigation';
import { GlobalHotKeys } from 'react-hotkeys';

const ExploreSearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    router.replace(`/explore?query=${query}`);
  };

  const handlers= {
    'ctrl+m': (event:any) => {
      event.preventDefault();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  };

  return (
    <div className='mr-4'>
      <form onSubmit={submit}>
        <GlobalHotKeys keyMap={{ 'ctrl+m': 'ctrl+m' }} handlers={handlers}>
          <Input
            ref={inputRef}  
            placeholder={`Search users by their name or username                                                                            ⌘+M`}
            className='bg-muted w-full rounded-2xl h-14 m-2 p-3 outline-none'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </GlobalHotKeys>
      </form>
    </div>
  );
};

export default ExploreSearchBar;
