import multer from 'multer';
const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+"_"+file.originalname)
    }
})

const uploadStorage=multer({storage:storage});
export default uploadStorage;