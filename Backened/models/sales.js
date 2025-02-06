const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    email : {type: String, required: true , unique : true , trim : true , index : true} ,
    totalSales : {
        type : Number,
        default : 0
    } ,
    totalRevenue : {
        type : Number,
        default : 0
    } ,
    totalStocks : {
        type : Number  ,
        default : 0
    }
})  

const sale = mongoose.model('Sale' , saleSchema)

module.exports = sale ;