const express = require('express'); 
const path = require('path');
const app = express();

let password = 801; // Set the password to 800

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const blogs = [
        {
            id: 1,
            author : "Ashish",
            comment : "level sbke niklenge"
        },
        {
            id: 2,
            author : "John",
            comment : "This is a comment"
        },
        {
            id: 3,
            author : "Alice",
            comment : "This is another comment"
        },
        {
            id: 4,
            author : "Bob",
            comment : "This is yet another comment"
        },
        {
            id: 5,
            author : "Charlie",
            comment : "This is a different comment"
        }
];

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use('/home',(req,res,next)=>{
    
    if(password == 800){
        next();
    } else {
        res.status(403).send('Forbidden');
    }
})
app.get('/home/bye', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/blogs', (req, res) => {
  res.render('blogs', { title: 'Blogs', blogs });
});

app.get('/blogs/new', (req, res) => {
  res.render('blogs/new', { title: 'Add a New Blog' });
});

app.post('/blogs', (req, res) => {
    const {author,comment} = req.body;
    blogs.push({ id: blogs.length + 1, author, comment });
    // res.send("Blog added successfully");
    res.redirect('/blogs');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
