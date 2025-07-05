const {Router} =require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Blog= require('../model/blog');
const Comment= require('../model/comment');


const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(`./public/uploads/${req.user._id}`);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`
    cb(null,filename);
  }
})

const upload = multer({ storage: storage })

router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user:req.user,
    });
});

router.get('/:id',async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate('createdBy');
  const comments = await Comment.find({blogId: req.params.id}).populate("createdBy");
  console.log(comments);
  return res.render('blog',{
    user: req.user,
    blog,
    comments,
  })
});

router.post('/comment/:blogId',async (req,res)=>{
  try {
    const comment = await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (error) {
    console.error('Comment creation error:', error);
    return res.status(500).send('Error creating comment: ' + error.message);
  }
});

router.post('/',upload.single('coverImage'),async (req,res)=>{
    try {
        console.log('Request body:', req.body);
        console.log('Uploaded file:', req.file);
        
        const { title, body } = req.body;
        
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        
        const blog = await Blog.create({
            title,
            body,
            createdBy: req.user._id,
            coverImageURL: `/uploads/${req.user._id}/${req.file.filename}`
        });
        
        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        console.error('Blog creation error:', error);
        return res.status(500).send('Error creating blog: ' + error.message);
    }
});

module.exports =router;