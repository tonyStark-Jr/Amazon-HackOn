'use client';

import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error('No file selected');
    }

    const file = inputFileRef.current.files[0];

    const newBlob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/upload',
      multipart: true,
      contentType: file.type,
    });
    setBlob(newBlob);
  };

  return (
    <>
      <h1>Upload File</h1>

      <form onSubmit={handleUpload}>
        <input name='file' ref={inputFileRef} type='file' required />
        <button type='submit'>Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
