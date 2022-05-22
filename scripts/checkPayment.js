var conNumber = '';
try {
    for (var j = 0; j <= i; j++) {
        var formEditID = 'edit-form' + j;
        const edit_form = document.getElementById(formEditID);
        edit_form.addEventListener('submit', editPayment);
    }
} catch (err) {
    console.log('No concert available at this time.');
}

//Edit finction
async function editPayment(event) {
    event.preventDefault();
    const paymentID = document.getElementById('paymentID' + conNumber).value;
    const status = document.getElementById('status' + conNumber).value;
    const result = await fetch('/api/editPayment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            paymentID: paymentID,
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
        }).then(() => window.location.href = "/checkPayment");
    } else {
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}


