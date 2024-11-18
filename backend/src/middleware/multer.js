import multer, { memoryStorage } from 'multer';

const storage = multer.memoryStorage()
// { storage },
const upload = multer({
    dest:"uploads/"
});

export default upload;
