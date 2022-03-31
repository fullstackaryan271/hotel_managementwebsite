const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        min: 0
    },

    types: {
        type: String,
        lowercase: true,
        enum: ['deluxe', 'superdeluxe', 'ordinary', 'basic']
    },
    location: {
        type: String,
        required: true
    },
    charge:{
        type: Number,
        required: true,
        min: 0
    },
    roomstatus:{
        type: String,
        required: true
    },
    paymentstatus: {
        type: String,
        required: true 
    },
    
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;