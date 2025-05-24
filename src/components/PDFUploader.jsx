import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function PDFUploader() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setMessage('');
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setMessage("ファイルが選択されていません");
      return;
    }

    setIsUploading(true); // アップロード開始

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('pdfs', file);
    });

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      setMessage(result.message || 'アップロード完了');
    } catch (err) {
      console.error(err);
      setMessage("アップロードに失敗しました");
    }

    setIsUploading(false); // アップロード完了
  };

  return (
    <div className="p-6 border rounded max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">📄 PDF アップロード</h2>

      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="mb-2"
      />

      {selectedFiles.length > 0 && (
        <ul className="mb-2 list-disc pl-5 text-sm text-gray-700">
          {selectedFiles.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        アップロードする
      </button>

      {isUploading && (
  <div className="flex items-center mt-1">
    <svg className="animate-spin h-4 w-4 mr-2 text-blue-400" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8v8z" />
    </svg>
    <span className="text-sm text-gray-600">アップロード中...</span>
  </div>
)}

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
