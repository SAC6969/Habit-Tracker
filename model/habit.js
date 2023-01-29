const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    records: [
        {
            date:{
                type: Date,
                require: true
            },
            status: {
                type: String,
                enum: ["Done","NotDone","None"],
                require: true
            }
        }
    ]
},{
    timestamps: true
});

const Habit = mongoose.model("Habit",habitSchema);
module.exports = Habit;