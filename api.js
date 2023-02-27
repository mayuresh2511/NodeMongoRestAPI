const express = require('express');
require('./src/db/mongoose');
const userRouter =  require('./src/routers/user');
const taskRouter = require('./src/routers/task');
const multer = require('multer');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const upload = multer({
    dest:'files',
    // limit:{
    //     fileSize:'1000000'
    // },
    filefilter(req, file, cb){
        if(!file.originalname.endsWith('.jpg')){
            return cb(new Error('Upload a .jpg file'));
        }

        cb(undefined, true);
    }
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send('File uploaded')
})

app.listen(3000, () => console.log('Server is running on port 3000'));


