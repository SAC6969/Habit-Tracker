const Habit = require('../model/habit');
let firstTime = true;
let view = "Daily";
//home 
module.exports.home = async function(req,res){
    let allHabits = await Habit.find({});
    if(firstTime){
        for(let habit of allHabits){
            let currentDate = new Date();
            if(habit.records[habit.records.length-1].date.getDate() != currentDate){
                habit.records.push({
                    date: currentDate,
                    status: "None"
                })
                habit.save();
            }
            firstTime = false;
        }
    }
    return res.render('home',{
        allHabits: allHabits,
        view: view
    })
}

// adding habit in db
module.exports.addHabit = async function(req,res){
    try{
        const habit = await Habit.create({
            name: req.body.habit,
            records: []
        });

        for(let i=0; i<7; i++){
            let currentDate = new Date();
            habit.records.unshift(getPreviousDates(currentDate,i));
        }

        habit.save();
        return res.redirect("/");

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//changing view of home
module.exports.changeView = async function(req,res){
    view = view === "Daily" ? "Weekly" : "Daily";
    res.redirect("/");
}

//changing the status of habit
module.exports.updateHabitStatus = async function(req,res){
    try{
        const habit = await Habit.findById(req.query.habitId);
        console.log("query,habit",habit);
        habit.records[habit.records.length-1].status = req.query.status;
        habit.save();
        return res.status(200).json({
            message: "status updated",
            habit: habit
        });
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//update status weekly
module.exports.updateHabitStatusWeekly = async function(req, res){
    try{
        const habit = await Habit.findById(req.query.habitId);
        for(let i = habit.records.length - 1; i >= habit.records.length - 6; i--){
            if(habit.records[i].date.toISOString() === req.query.date){
                habit.records[i].status = req.query.status;
                habit.save();
                break;
            }
        }

        return res.status(200).json({
            message: "status update on specific date is successfull"
        });

    }catch(err){
        console.log(err);
        return res.redirect("back");
    }
}

// deleting habit 
module.exports.deleteHabit = async function(req,res){
    try{
        const habit = await Habit.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Habit deleted Successfully"
        })
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}


function getPreviousDates(currentDate, i){
    const record = {};
    record.date = currentDate.setDate(currentDate.getDate() - i);
    record.status = "None";

    return record;
}