import { useState } from 'react';

export default function DobotusPrototype() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState(null);
  const [tokenUsage, setTokenUsage] = useState(0);
  const [image, setImage] = useState(null);

  const handleAsk = async () => {
    setAnswer("回答を生成中...");
    setTimeout(() => {
      setAnswer("擁壁の根入れは水路底から0.3m以上が必要です。");
      setSource({ name: "設計要領2020", page: 12 });
      setTokenUsage(prev => prev + 18);
    }, 1000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow h-full">
        <h2 className="text-xl font-bold">ドボタス Q&A</h2>
        <textarea
          placeholder="設計要領に基づいた質問を入力してください..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded mt-2"
        />
        <button
          onClick={handleAsk}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          質問する
        </button>
        <div className="text-sm text-gray-500 mt-2">トークン使用量: {tokenUsage} tokens</div>
        <div className="mt-4">
          <label className="text-sm font-semibold">画像アップロード（有料プラン）</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" />
          {image && <p className="text-xs mt-1 text-green-600">画像を受信しました: {image.name}</p>}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow h-full">
        <h2 className="text-xl font-bold">AIの回答</h2>
        <div className="whitespace-pre-wrap text-gray-800 border p-3 rounded bg-gray-50 min-h-[100px] mt-2">
          {answer}
        </div>
        {source && (
          <div className="text-sm text-blue-600 mt-2">
            出典: {source.name}（p.{source.page}）
          </div>
        )}
      </div>
    </div>
  );
}
