{
    // changing the status of habit in dom and database;
    function changeStatusDom(button,id){  
        if(button.children[0].classList[2] == "green"){
            button.removeChild(button.children[0]);
            button.innerHTML = '<i class="far fa-times-circle red"></i>'
            changeStatusDb(`/update-status/?status=NotDone&habitId=${id}`);
        }else if(button.children[0].classList[2] == "red"){
            button.removeChild(button.children[0]);
            button.innerHTML = ' <i class="far fa-minus-circle yellow"></i>';
            changeStatusDb(`/update-status/?status=None&habitId=${id}`);
        }else{
            button.removeChild(button.children[0]);
            button.innerHTML = '<i class="far fa-check-circle green"></i>';
            changeStatusDb(`/update-status/?status=Done&habitId=${id}`);
        }
    }

    // changing status of db;
    function changeStatusDb(link){
        // console.log(link);
        fetch(link)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
    }

    // change the status of habit from weekly view
    function changeStatusFromWeekly(button, habitId, date){
        if (button.children[0].classList[2] === "green") {
            // make not done
            button.removeChild(button.children[0]);
            button.innerHTML = '<i class="far fa-times-circle red"></i>';
            changeStatusDb(`/update-status-weekly/?status=NotDone&habitId=${habitId}&date=${date}`);
        } else if (button.children[0].classList[2] === "red") {
            // make unmarked
            button.removeChild(button.children[0]);
            button.innerHTML = ' <i class="far fa-minus-circle yellow"></i>';
            changeStatusDb(`/update-status-weekly/?status=None&habitId=${habitId}&date=${date}`);
        } else {
            // make done
            button.removeChild(button.children[0]);
            button.innerHTML = '<i class="far fa-check-circle green"></i>';
            changeStatusDb(`/update-status-weekly/?status=Done&habitId=${habitId}&date=${date}`);
        }
    }

    function deleteHabit(id){
        document.getElementById(id).remove();
        const link = `/delete-habit/${id}`;
        fetch(link,{
            method: "delete"
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err=> console.log(err))
    }
}