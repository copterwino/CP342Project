
var orderID;


function ticketPrice() {
    var order = document.getElementById("orderID").value;
    var orderObject = JSON.parse(order);
    orderID = orderObject.orderID;
    var conName = orderObject.conName;
    var zoneName = orderObject.zoneName;
    var amount = orderObject.amount;
    var total=orderObject.total;
    if (total) {
        document.getElementById("conName").innerHTML = conName;
        document.getElementById("zoneName").innerHTML = zoneName;
        document.getElementById("amount").innerHTML = amount;
        document.getElementById("price").innerHTML = total+" บาท";
    } 
}