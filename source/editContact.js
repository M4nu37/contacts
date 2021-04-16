<!DOCTYPE html>
<html>
    <head>
        <title>Contacts - Edit contact</title>
        <!-- favicon -->
        <link rel="icon" href="./icon/CW.png" type="img/icon">
        
        <meta name="viewport" content="width=device-width, initial-scale=1">        

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        
        <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        
        <!-- Popper JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        
        <!-- Latest compiled JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script> 

        <!--My own css-->
        <link rel="stylesheet" href="css/my.css" type="text/css">
    </head>

    <body onload="display()">
        <script src="functions.js"></script>

        <h1>Edit a contact</h1>
        
        <div class="form">
            <label for="name">Name:</label>
            <input type="text" id="name" class="form-control"><br /><br />
            <label for="phone">Phone number:</label> 
            <input type="text" id="phone" class="form-control"><br /><br />
            <label for="email">Email:</label> 
            <input type="text" id="email" class="form-control"><br /><br />
            <button onclick="saveChanges()" class="btn btn-primary">SAVE CHANGES</button>
            <button onclick="redirectMain()" class="btn btn-primary">GO BACK</button>
        </div>
    </body>
</html>
