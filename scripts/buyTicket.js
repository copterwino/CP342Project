
var total=0;
var zoneName;
var amount;
function ticketPrice() {
    var zone = document.getElementById("zonePrice").value;
    var zoneObject = JSON.parse(zone);
    amount = document.getElementById("amount").value;
    zoneName = zoneObject.zoneName;
    availableSeat = zoneObject.availableSeat;
    total=zoneObject.zonePrice*amount;
    if(availableSeat-amount<0){
        Swal.fire({
            title: 'Oops!',
            text: 'Seat is not enough!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
    if (zonePrice && amount) {
        document.getElementById("cal").innerHTML =  zoneObject.zonePrice+" x "+amount+" = ";
        document.getElementById("price").innerHTML =  total;
    } 
}

//Get user oreder
const insert_form = document.getElementById('insert-form');
insert_form.addEventListener('submit', insertCon);

async function insertCon(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const conName = document.getElementById('conName').value;
    const uploadDate = new Date();
    const status = 'waiting';
    const result = await fetch('/api/insertOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            conName,
            zoneName,
            amount,
            total,
            uploadDate,
            status
        })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        // everythign went fine
        Swal.fire({
            title: 'Success!',
            text: 'Placed order Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => 
            window.location.href="/review?orderID="+result.orderID+"&conName="+conName
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
function goToBuyPage(conNumber, hallName) {
    window.location.href = "/buyTicket?conNumber=" + conNumber + "&hallName=" + hallName+"&zoneName="+zoneName;
}