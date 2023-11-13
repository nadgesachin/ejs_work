const mongoose=require('mongoose')

const url='mongodb://localhost:27017/akshay'
const Connection=async()=>{
const response =await mongoose.connect(url)
.then(()=>{
    console.log("Connection success");
})
.catch((error)=>{
    console.log("Error ",error)
})
}
module.exports= Connection;