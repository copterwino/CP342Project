const insert_form = document.getElementById('insert-form');
var conNumber = '';
try {
    for (var j = 0; j < i; j++) {
        var formDeleteID = 'delete-form' + j;
        const delete_form = document.getElementById(formDeleteID);
        delete_form.addEventListener('submit', deleteSlide);
    }
} catch (err) {
    console.log('No slide available.');
}
insert_form.addEventListener('submit', insertSlide);
async function insertSlide(event) {
    event.preventDefault();
    const slideUploadDate = new Date();
    const slideEXPDate = document.getElementById('slideEXPDate').value;
    const slideImage = document.getElementById('slideImage').value;

    const result = await fetch('/api/insertSlide', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            slideUploadDate: slideUploadDate,
            slideEXPDate: slideEXPDate,
            slideImage:slideImage
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: 'Insert Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href = "/slide");
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
async function deleteSlide(event) {
    event.preventDefault();
    const slideIDValue = document.getElementById('slideID' + slideNumber).value;
    const result = await fetch('/api/deleteSlide', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            slideID: slideIDValue
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everything went fine
        Swal.fire({
            title: 'Success!',
            text: 'Remove Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href = "/slide");
    } else {
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}