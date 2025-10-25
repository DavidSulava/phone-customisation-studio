'use client';
import { EditorProvider } from '@/contexts/EditorContext';
import { Editor } from './Editor';
import { Header } from './Header';
import { EditorDrawer } from './components/EditorDrawer';
import { Suspense } from 'react';

export const EditorPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditorProvider>
        <Header />
        <div>
          <Editor />

          <EditorDrawer />
        </div>
      </EditorProvider>
    </Suspense>
  );
};
