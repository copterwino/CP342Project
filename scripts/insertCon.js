const insert_form = document.getElementById('insert-form');
insert_form.addEventListener('submit', insertCon);
async function insertCon(event) {
    event.preventDefault();
    const hallName = document.getElementById('hallName').value;
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
            hallName:hallName,
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
