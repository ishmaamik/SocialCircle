import multer from "multer";

const storage= multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, './uploads');    //null means no error handling and destination upload to ./uploads
    },

    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);    //returns the unique filename which has appended to date time
    }
})

export const upload= multer({storage: storage});