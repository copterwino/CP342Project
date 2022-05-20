const insert_form = document.getElementById('insert-form');
var conNumber = '';
try {
    for (var j = 0; j <= i; j++) {
        var formDeleteID = 'delete-form' + j;
        const delete_form = document.getElementById(formDeleteID);
        delete_form.addEventListener('submit', deleteZone);
    }
} catch (err) {
    console.log('No zone available.');
}
insert_form.addEventListener('submit', insertZone);
async function insertZone(event) {
    event.preventDefault();
    const hallName = document.getElementById('hallName').value;
    const zoneName = document.getElementById('zoneName').value;
    const zoneNumberOfSeat = document.getElementById('numOfSeat').value;
    const zonePrice = document.getElementById('zonePrice').value;


    const result = await fetch('/api/insertZone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            hallName:hallName,
            zoneName: zoneName,
            zoneNumberOfSeat:zoneNumberOfSeat,
            zonePrice:zonePrice
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: 'Insert Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href = "/zone");
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
async function deleteZone(event) {
    event.preventDefault();
    const zoneIDValue = document.getElementById('zoneID' + zoneNumber).value;
    const result = await fetch('/api/deleteZone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            zoneID: zoneIDValue
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: 'Remove Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href = "/zone");
    } else {
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}