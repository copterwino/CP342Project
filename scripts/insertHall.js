const insert_form = document.getElementById('insert-form');
var conNumber = '';
try {
    for (var j = 0; j < i; j++) {
        var formDeleteID = 'delete-form' + j;
        const delete_form = document.getElementById(formDeleteID);
        delete_form.addEventListener('submit', deleteHall);
    }
} catch (err) {
    console.log('No hall available.');
}
insert_form.addEventListener('submit', insertHall);
async function insertHall(event) {
    event.preventDefault();
    const hallName = document.getElementById('hallName').value;
    const hallImage = document.getElementById('hallImage').value;

    const result = await fetch('/api/insertHall', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            hallName: hallName,
            hallImage: hallImage
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: 'Insert Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href = "/hall");
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
async function deleteHall(event) {
    event.preventDefault();
    const hallIDValue = document.getElementById('hallID' + hallNumber).value;
    const result = await fetch('/api/deleteHall', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            hallID: hallIDValue
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: 'Remove Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href = "/hall");
    } else {
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}