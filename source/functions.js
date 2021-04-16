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

function redirectAddContact() {
    window.location.href="addContact.html"
}

function clearSessionStorage() {
    sessionStorage.removeItem('user');
}

function reload() {
    window.location.reload();
}
// End of redirect functions



// Function to log in the user
function login() {
    
    // Define the name & password got from login.html
    let name = document.getElementById('user').value
    let password = document.getElementById('pass').value

    // Store the name in 'sessionStorage'
    sessionStorage.setItem('user', name);

    // fetch the API to log in the user
    fetch('http://192.168.1.24:8080/login/' + name + '/' + password, {
        method: 'GET'
    })      

    .then(res => res.json())

    .then(data => {
        let message = data.message;

        // If he was accepted then redirect him to main
        if (message === 'Accepted') {
            redirectMain();
        }

        // If he was denied, reload the page
        else {
            alert(data.message);
            alert('Wrong credentials')
            reload();
        }        
    });    
}
// End of log in function



// Function to register the user
function register() {
    
    // Define the name & password got from login.html
    let name = document.getElementById('user').value
    let password = document.getElementById('pass').value
    let password2 = document.getElementById('pass2').value

    // Store the user name in 'sessionStorage'
    sessionStorage.setItem('user', name);

    // If the passwords match the correct lenght and both are the same, then fetch the API and register the user
    if (password === password2 && password.length >= 5) {
        fetch('http://192.168.1.24:8080/register/' + name + '/' + password, {
            method: 'POST'
        })      
    
        .then(res => res.json())
        
        .then(data => { console.log(data);

            if (data.message === 'User was created') {
                redirectMain();
            }

            //If the user already exists, reload the page
            if (data.message === 'The user already exists') {                
                alert('User already exists');
                reload();
            }
        });
    }

    // If the passwords do not acomplish the requirements, reload the page
    else {
        alert('The passwords do not match or are too short (min 5 characters)');
        reload();
    }        
}
// End of register function



// Function to display the contacts in main
function showContacts() {

    // Get the user name from 'sessionStorage'
    let name = sessionStorage.getItem('user');

    // Make sure the name is not empty
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
            document.getElementById('contacts').innerHTML = '<div class="contact"><label> No contacts yet... </label></div>';
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
                    <div class="contact"> 
                        <label><strong > Name: </strong> <span id="name`+x+`">`+ contactName +'</span></label>'+
                        '<label><strong> Number: </strong> <span id="phone'+x+'">'+ contactNumber +'</span></label>'+
                        '<label><strong> Email: </strong> <span id="email'+x+'">'+ contactEmail + '</span></label>' +
                        `<br />
                        <button onclick="deleteContact(`+x+`)" class="btn btn-primary delete"> DELETE </button>
                        <button onclick="sendInfo(`+x+`)" class="btn btn-primary" id="`+x+`"> EDIT </button><br />
                        <hr>
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

    // Fetch the API to insert the info in the DB
    fetch('http://192.168.1.24:8080/addContact/' + name + '/' + contactName + '/' + contactNumber + '/' + contactEmail, {
        method: 'POST'
    })

    .then(res => res.json())

    .then(data => { console.log(data); 

        if (data.message === "Contact added succesfuly") {
            redirectMain();
        }
        else {
            reload();
        }
    })
}
// End of add contact function



// Function to delete a contact
function deleteContact(n) {
    let contactName = document.getElementById('name' + n).innerHTML.replace(/"/g,"");
    let contactNumber = document.getElementById('phone' + n).innerHTML.replace(/"/g,"");
    let contactEmail = document.getElementById('email' + n).innerHTML.replace(/"/g,"");
    let name = sessionStorage.getItem('user');

    // Fetch the API to erease the contact with the matching info of the DB
    fetch('http://192.168.1.24:8080/deleteContact/' + name + '/' + contactName + '/' + contactNumber + '/' + contactEmail, {
        method: 'DELETE'
    })

    .then(res => res.json())

    .then(data => { console.log(data); 

        if (data.message === "Contact deleted succesfuly") {
            reload();
        }
        else {
            reload();
        }
    })
}
// End of delete contact function



// Functions to edit a contact
function sendInfo(n) {
    // Set to the session storage the info of the contact whose going to be edited
    sessionStorage.setItem('name', document.getElementById('name' + n).innerHTML.replace(/"/g,""));
    sessionStorage.setItem('phone', document.getElementById('phone' + n).innerHTML.replace(/"/g,""));
    sessionStorage.setItem('email', document.getElementById('email' + n).innerHTML.replace(/"/g,""));  
    sessionStorage.setItem('position', document.getElementById(n).id);   
    
    window.location.href = "editContact.html";
}

function display() {
    // Display in the <input> boxes the information to be modified
    let contactName = sessionStorage.getItem('name');
    let contactNumber = sessionStorage.getItem('phone');
    let contactEmail = sessionStorage.getItem('email');
    
    document.getElementById('name').value = contactName;
    document.getElementById('phone').value = contactNumber;
    document.getElementById('email').value = contactEmail;
}

function saveChanges() {
    // Once the 'saveChanges()' function is triggered, search for the user in the DB and edit his details
    let contactName = document.getElementById('name').value
    let contactNumber = document.getElementById('phone').value
    let contactEmail = document.getElementById('email').value
    let name = sessionStorage.getItem('user');
    let position = sessionStorage.getItem('position');

    // Fetch the API to edit the contact
    fetch('http://192.168.1.24:8080/editContact/' + name + '/' + contactName + '/' + contactNumber + '/' + contactEmail + '/' + position, {
        method: 'POST'
    })

    .then(res => res.json())

    .then(data => { console.log(data); 
        
        if (data.message === 'Contact updated succesfuly') {
            redirectMain();
        }
        else {
            reload();
        }
    })

}
// End of edit contact functions
