//
const reg_form = document.getElementById('reg-form');
if (reg_form) {
    reg_form.addEventListener('submit', registerUser);
}else{
    console.log('null');
}

async function registerUser(event) {
    event.preventDefault()
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password_re = document.getElementById('password_re').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            password_re,
            email,
            address,
            phone
        })
    }).then((res) => res.json())
    if(result.status ==='ok'){
        Swal.fire({
            title: 'Success!',
            text: 'Registration Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => 
        window.location.href="/login"
    );;
    }else{
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}