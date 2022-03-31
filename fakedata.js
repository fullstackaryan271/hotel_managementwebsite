const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/hoteldata', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    // const p = new Product({
    //     id: 1,
    //     types: 'Deluxe',
    //     location: 'North Wing',
    //     charge: 2000,
    //     roomstatus: 'Available',
    //     paymentstatus: 'Paid'
    // })
    // p.save()
    //     .then(p => {
    //         console.log(p)
    //     })
    //     .catch(e => {
    //         console.log(e)
    //     })

    const roomDatas = [
        {
            id: 1,
            types: 'Deluxe',
            location: 'North Wing',
            charge: 2000,
            roomstatus: 'Available',
            paymentstatus: 'Paid'
        },
        {
            id: 2,
            types: 'Super Deluxe',
            location: 'East Wing',
            charge: 4000,
            roomstatus: 'Available',
            paymentstatus: 'Not Paid'
        },
        {
            id: 3,
            types: 'Ordinary',
            location: 'West Wing',
            charge: 1000,
            roomstatus: 'Not Available',
            paymentstatus: 'Not Paid'
        },
        
    ]
    
    Product.insertMany(roomDatas)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })