// Functions to redirect to the right page once 'Log In' or 'Register' buttons are pressed
function redirectRegister() {
    window.location.href="register.html";
}
function redirectLogIn() {
    window.location.href="login.html";
}

function redirectMain() {
    window.location.href="main.html";
}

function clearSessionStorage() {
    sessionStorage.removeItem('user');
}

function reload() {
    window.location.reload();
}

// Function to log in the user
function login() {
    
    // Define the name & password got from login.html
    let name = document.getElementById('user').value
    let password = document.getElementById('pass').value

    sessionStorage.setItem('user', name);

    fetch('http://192.168.1.24:8080/login/' + name + '/' + password, {
        method: 'GET'
    })      

    .then(res => res.json())

    .then(data => {
        let message = data.message;

        if (message === 'Accepted') {
            window.location.href = '/main.html'
        }
        else {
            alert(data.message);
            reload();
        }        
    });    
}


// Function to register the user
function register() {
    
    // Define the name & password got from login.html
    let name = document.getElementById('user').value
    let password = document.getElementById('pass').value
    let password2 = document.getElementById('pass2').value

    sessionStorage.setItem('user', name);

    if (password === password2 && password.length >= 5) {
        fetch('http://192.168.1.24:8080/register/' + name + '/' + password, {
            method: 'POST'
        })      
    
        .then(res => res.json())
        
        .then(data => { console.log(data);
            if (data.message === 'User was created') {
                redirectMain();
            }
            if (data.message === 'The user already exists') {                
                reload();
                console.log(data.message);
            }
        });
    }

    else {
        reload();
    }        
}
// End of register function


// Function to display the contacts in main
function showContacts() {

    let name = sessionStorage.getItem('user');

    if (name === '' || name === null || name === undefined) {
        redirectLogIn();
    }

    // Fetch the API to get the user contact list
    fetch('http://192.168.1.24:8080/main/' + name, {
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
            let contactName = '';
            let contactNumber = '';
            let contactEmail = '';
            
            // Use the for loop to display every single contact in your DB
            for (let x = 0; x < data.message[0].contacts.length; x++) {

                // Update the variables with the contacts info
                contactName = JSON.stringify(data.message[0].contacts[x].contactInfo.name);
                contactNumber = JSON.stringify(data.message[0].contacts[x].contactInfo.number);
                contactEmail = JSON.stringify(data.message[0].contacts[x].contactInfo.email);

                // Display the info in 'main.html'
               document.getElementById('contacts').innerHTML += `
                    <div> 
                        <strong > Name: </strong> <span id="name`+x+`">`+ contactName +'</span>'+
                        '<strong> Number: </strong> <span id="phone'+x+'">'+ contactNumber +'</span>'+
                        '<strong> Email: </strong> <span id="email'+x+'">'+ contactEmail + '</span>' +
                        `<br />
                        <button onclick="deleteContact(`+x+`)" value="`+x+`"> DELETE </button>
                    </div><br />
                `; 
            }            
        }
    });
}
// End of display function


// Function to add a contact
function addContact() {
    let contactName = document.getElementById('name').value;
    let contactNumber = document.getElementById('phone').value;
    let contactEmail = document.getElementById('email').value;
    let name = sessionStorage.getItem('user');

    

    // Fetch the API to show 
    fetch('http://192.168.1.24:8080/addContact/' + name + '/' + contactName + '/' + contactNumber + '/' + contactEmail, {
        method: 'POST'
    })

    .then(res => res.json())

    .then(data => { console.log(data); 

        if (data.message === "Contact added succesfuly") {
            redirectMain();
        }
        else {
            alert(data.message)
            reload();
        }
    })
}


// Function to delete a contact
function deleteContact(n) {
    let contactName = document.getElementById('name' + n).innerHTML.replace(/"/g,"");
    let contactNumber = document.getElementById('phone' + n).innerHTML.replace(/"/g,"");
    let contactEmail = document.getElementById('email' + n).innerHTML.replace(/"/g,"");
    let name = sessionStorage.getItem('user');

    fetch('http://192.168.1.24:8080/deleteContact/' + name + '/' + contactName + '/' + contactNumber + '/' + contactEmail, {
        method: 'DELETE'
    })

    .then(res => res.json())

    .then(data => { console.log(data); 

        if (data.message === "Contact deleted succesfuly") {
            reload();
        }
        else {
            alert(data.message)
            reload();
        }
    })
}
// End of delete contact function


//Edit contact
let contactPosition = documentGetElementById(id).value;
sessionStorage.setItem('position', contactPosition);
