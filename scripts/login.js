const form = document.getElementById('login');
if (form) {
    form.addEventListener('submit', login);
}else{
    console.log('null');
}

async function login(event) {
    event.preventDefault()
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json());
    if(result.status ==='ok'){
        localStorage.setItem('token', result.data);
        Swal.fire({
            title: 'Success!',
            text: 'Login Successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => window.location.href="/");
        console.log('Get the token: ',result.data);
    }else{
        Swal.fire({
            title: 'Oops!',
            text: result.error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}