import { useState } from 'react';

export default function PDFUploader() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');

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

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('pdfs', file); // ← バックエンドと一致させる
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
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        アップロードする
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
