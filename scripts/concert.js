const concert_form = document.getElementById('concert-form');
const edit_form = document.getElementById('edit-form');
const delete_form = document.getElementById('delete-form');

concert_form.addEventListener('submit', insertCon);
// edit_form.addEventListener('submit', editCon);
delete_form.addEventListener('submit', deleteCon);
if(delete_form){
    console.log('ok');
}
async function insertCon(event) {
    event.preventDefault();
    const conName = document.getElementById('conName').value;
    const artistName = document.getElementById('artistName').value;
    const conDate = new Date(document.getElementById('conDate').value);
    const conStartTime = document.getElementById('conStartTime').value;
    const conEndTime = document.getElementById('conEndTime').value;
    const conDescription = document.getElementById('conDescription').value;
    const conPoster = document.getElementById('conPoster').value;

    console.log(conPoster);
    const result = await fetch('/api/insertConcert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            conName: conName,
            artistName:artistName,
            conDate:conDate,
            conTime:{startTime:conStartTime,endTime:conEndTime},
            conDescription:conDescription,
            conPoster:conPoster,
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: 'Insert Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href="/concert");
    } else {
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}

async function deleteCon(event) {
    event.preventDefault();
    const conID = document.getElementById('conID').value;
    console.log(conID);
    const result = await fetch('/api/deleteConcert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            conID: conID
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: 'Remove Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href="/concert");
    } else {
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}
