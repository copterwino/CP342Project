//Get user oreder
const insert_form = document.getElementById('insert-form');
insert_form.addEventListener('submit', insertCon);

async function insertCon(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const refID = document.getElementById('refID').value;
    const payDate = document.getElementById('payDate').value;
    const payTime = document.getElementById('payTime').value;
    const uploadDate = new Date();
    const status = 'waiting';
    console.log(username);
    console.log(refID);
    console.log(payTime);
    console.log(orderID);
    const result = await fetch('/api/insertPayment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderID,
            username,
            refID,
            payDate,
            payTime,
            uploadDate,
            status
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: "Sending Form Successfully!",
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => 
            window.location.href="/"
        );
    } else {
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}