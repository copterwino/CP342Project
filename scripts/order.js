var conNumber = '';
try {
    for (var j = 0; j <= i; j++) {
        var formEditID = 'edit-form'+j;
        var formDeleteID = 'delete-form'+j;
        const edit_form = document.getElementById(formEditID);
        const delete_form = document.getElementById(formDeleteID);
        edit_form.addEventListener('submit',editOrder);
        delete_form.addEventListener('submit', deleteOrder);
    }
} catch (err) {
    console.log('No concert available at this time.');
}
//Edit finction
async function editOrder(event) {
    event.preventDefault();
    const orderID = document.getElementById('orderID' + conNumber).value;
    const status = document.getElementById('status' + conNumber).value;
    const result = await fetch('/api/editOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderID: orderID,
            status: status
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: 'Edit Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href = "/order");
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
async function deleteOrder(event) {
    event.preventDefault();
    const orderIDValue = document.getElementById('orderID'+conNumber).value;
    const result = await fetch('/api/deleteOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderIDValue: orderIDValue
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: 'Remove Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href = "/order");
    } else {
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}
