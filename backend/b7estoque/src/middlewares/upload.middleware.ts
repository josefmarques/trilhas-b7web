import multer from "multer";
import { Request} from "express";

const storage = multer.memoryStorage();

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
) => {
    const allwoedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allwoedTypes.includes(file.mimetype)) {
        callback(null, true);    
    } else {
        callback(new Error('Arquivo incompatível!'));
    }

}

export const uploadAvatar = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB        
    }
}).single('avatar');

 