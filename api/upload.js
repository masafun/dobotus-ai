import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable({ multiples: true, uploadDir: '/tmp', keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'アップロード失敗' });
    }

    const uploaded = Array.isArray(files.pdfs) ? files.pdfs : [files.pdfs];
    uploaded.forEach(file => console.log("アップロード:", file.originalFilename));

    res.status(200).json({ message: `${uploaded.length}件のPDFアップロード成功` });
  });
}
