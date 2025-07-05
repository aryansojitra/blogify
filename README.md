# blogify

A server-rendered blog application built with Node.js, Express, EJS, and MongoDB. Blogify supports full CRUD operations along with image uploads.

## 🧱 Tech Stack

- **Node.js** & **Express** – backend REST API  
- **MongoDB** via **Mongoose** – schema-based data modeling  
- **EJS** – server-side templating for views  
- **Multer** – middleware for handling image uploads  
- **dotenv** – secure management of environment variables

## 🚀 Features

- **Create** blog posts with title, body, and optional cover image  
- **Read** view all posts or individual post pages  
- **Update** modify post content or replace images  
- **Delete** remove unwanted posts and associated images  
- **Image upload** support via form; stored locally in `public/uploads/`

## 🔧 Project Structure

blogify/
├── index.js  
├── models/  
│ └── Post.js  
├── routes/  
├── middlewares/  
├── service/  
├── public/  
│ └── uploads/  
└── views/  
├── posts/  
└── includes/   

##🧩 Usage
Navigate to Add New Post to create posts.
Click on a post title to read, edit, or delete it.
Upload cover images via the form; they’ll save to /public/uploads.

##📦 Dependencies
Major packages:

express
mongoose
multer
dotenv
ejs

##📄 License
MIT License © Aryan Sojitra
