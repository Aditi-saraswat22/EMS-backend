const mongoose=require("mongoose");

const employeeSchema =mongoose.Schema({
    name:{
        type:String,
        required:true},
    department:{
        type:String,required:true},
    salary:{
        type:Number,required:true},
    bonus:{
        type:Number,
        default:0}
})

module.exports=mongoose.model("Employee",employeeSchema);