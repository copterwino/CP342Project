var conNumber = '';
try {
    for (var j = 0; j <= i; j++) {
        var formEditID = 'edit-form'+j;
        var formDeleteID = 'delete-form'+j;
        const edit_form = document.getElementById(formEditID);
        const delete_form = document.getElementById(formDeleteID);
        edit_form.addEventListener('submit',editCon);
        delete_form.addEventListener('submit', deleteCon);
    }
} catch (err) {
    console.log('No concert available at this time.');
}

//Edit finction
async function editCon(event) {
    event.preventDefault();
    console.log(conNumber);
    const conIDValue = document.getElementById('conID'+conNumber).value;
    const conName = document.getElementById('conName'+conNumber).value;
    const artistName = document.getElementById('artistName'+conNumber).value;
    const conDate = new Date(document.getElementById('conDate'+conNumber).value);
    const conStartTime = document.getElementById('conStartTime'+conNumber).value;
    const conEndTime = document.getElementById('conEndTime'+conNumber).value;
    const conDescription = document.getElementById('conDescription'+conNumber).value;
    const conPoster = document.getElementById('conPoster'+conNumber).value;
    const result = await fetch('/api/editConcert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            conID: conIDValue,
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
            text: 'Edit Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href = "/concert");
    } else {
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}

//Delete function
async function deleteCon(event) {
    event.preventDefault();
    const conIDValue = document.getElementById('conID'+conNumber).value;
    const result = await fetch('/api/deleteConcert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            conID: conIDValue
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: 'Remove Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href = "/concert");
    } else {
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}
