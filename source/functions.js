// Functions to redirect to the right page once 'Log In' or 'Register' buttons are pressed
function redirectRegister() {
    window.location.href="register.html";
}
function redirectLogIn() {
    window.location.href="login.html";
}

function clearSessionStorage() {
    sessionStorage.removeItem('user');
}

// Function to log in the user
function login() {
    
    // Define the name, password and role got from login.html
    let name = document.getElementById('user').value
    let password = document.getElementById('pass').value

    sessionStorage.setItem('user', name);

    fetch('http://192.168.1.10:8080/login/' + name + '/' + password, {
        method: 'GET'
    })      

    .then(res => res.json())

    .then(data => {
        let message = data.message;

        if (message === 'Accepted') {
            window.location.href = '/main.html'
        }
        else {
            window.location.reload();
        }        
    });    
}


// Function to register the user
function register() {
    
    // Define the name, password and role got from login.html
    let name = document.getElementById('user').value
    let password = document.getElementById('pass').value
    let password2 = document.getElementById('pass2').value

    sessionStorage.setItem('user', name);

    if (password === password2 && password.length >= 5) {
        fetch('http://192.168.1.10:8080/register/' + name + '/' + password, {
            method: 'POST'
        })      
    
        .then(res => res.json())
        
        .then(data => { console.log(data);
            if (data.message === 'User was created') {
                window.location.href = '/main.html';
            }
            if (data.message === 'The user already exists') {                
                window.location.reload();
                console.log(data.message);
            }
        });
    }

    else {
        window.location.reload();
    }        
}


// Function to display the contacts in main
function showContacts() {

    let name = sessionStorage.getItem('user');

    if (name === '' || name === null || name === undefined) {
        redirectLogIn();
    }

    // Fetch the API to get the user contact list
    fetch('http://192.168.1.10:8080/main/' + name, {
        method: 'GET'
    })      

    .then(res => res.json())
    
    .then(data => { console.log(data);

        // If there is no contacts, display a message in 'main.html' instead
        if (data.message[0].contacts.length === 0) {
            document.getElementById('contacts').innerHTML = '<p> No contacts yet... </p>';
            console.log('No contacts yet')
        }

        // If there are contacts, display them in 'main.html'
        else {
            let contacts = [];

            for (let x = 1; x <= data.message[0].contacts.length; x ++) {
                contacts.push(data.message[0].contacts[x]);
            }
            document.getElementById('classes').innerHTML = contacts;
            console.log(contacts);
        }
    });
}


// Function to add a contact
function addContact() {
    let contactName = document.getElementById('className').value;
    let contactNumber = document.getElementById('className').value;
    let name = sessionStorage.getItem('user');
    let role = sessionStorage.getItem('role');

    // Fetch the API to show 
    fetch('http://192.168.1.10:8080/main/' + name + '/' + role + '/' + contactName + '/' + contactNumber, {
        method: 'POST'
    })

    .then(res => res.json())

    .then(data => { console.log(data); })
}