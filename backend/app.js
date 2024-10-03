import express from "express"
import mysql from "mysql"
import cors from "cors"
import multer from "multer";
import path from "path";

// Configure multer to use book titles as file names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const bookTitle = req.body.title.replace(/\s+/g, '-').toLowerCase(); // Clear the book title from spaces
    const ext = path.extname(file.originalname); // Get the original file extension
    cb(null, `${bookTitle}${ext}`); // Save the file name using the book title
  }
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); 

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "K0645499b%",
  database: "test"
});


app.post("/books", upload.single("cover"), (req, res) => {
  const query = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.file.filename,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully");
  });
});

app.get("/books", (req,res)=> {
    const query = "SELECT * FROM books";
    db.query(query, (err, data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
});


app.delete("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id= ?";
    db.query(query, [bookId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully.")
    })
});

app.listen(3000, () => {
    console.log("Connected to backend!")
});