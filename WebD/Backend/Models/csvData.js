const mongoose = require("mongoose");

const CsvSchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    //   // unique: true,
    //   maxLength: 50,
    // },
    // code: {
    //   type: String,
    //   // required: true,
    //   // unique: true
    // },
    // status: {
    //   type: Boolean,
    //   default: true,
    // },
    frequency:{
        type :Number,
    },
    stack_id:{
        type:String,
    },
    duration:{
        type:Number,
    }
  },
  {
    timestamps: true,
  }
);
const CsvData = mongoose.model("csvData", CsvSchema);
module.exports = CsvData;
//number of people 
//stackId 
//time 