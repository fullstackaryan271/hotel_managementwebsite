const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/hoteldata', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


const type = ['deluxe', 'superdeluxe', 'ordinary', 'basic'];

app.get('/', (req, res) =>{
res.render('products/home')
})

app.get('/admindata', async (req, res) => {
    const product = await Product.find({})
    res.render('products/adminlogin', { product })
})


app.post('/admindata', async (req, res) => {
    const newProducts = new Product(req.body);
    await newProducts.save();
    res.redirect(`/admindata`)
    
})
app.get('/admindata/new', async (req, res) => {
    // const product = await Product.find({})
    res.render('products/insert')
})

app.get('/admindata/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

app.get('/admindata/:id/edit', async(req, res) =>{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product})
})

app.put('/admindata/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/admindata`);
})

app.delete('/admindata/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/admindata');
})

app.get('/studentdata', async (req, res) =>{
    const product = await Product.find({})
    res.render('products/studentlogin', { product })
  
})

app.get('/studentdata/checkin', async (req, res) => {
    const product = await Product.find({})
    res.render('products/checkin', { product })
})





// app.get('/admindata', (req, res) =>{
//     res.render('products/adminlogin')
// })


// app.get('/newdata', (req, res) =>{
//     res.render('products/insert')
// })

app.listen(3000, () =>{
    console.log('listening to port 3000')
})