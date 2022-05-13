// Check if have value in input box
function isAddDataNull() {
    var addData = document.getElementById("addData").value;

    if (addData < 0) {
        alert("Please enter valid data");
        return false;
    } else if (addData != "") {
        alert("You have successfully saved the data");
    }

}

// Check if password and confirm password are the same
function clicktest(){
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var msg = document.getElementById("msg");
    var sub = document.getElementById("saveButton");
    if (password.length < 8) {
        msg.innerHTML = "* must be at least 8 characters long";
        msg.style.color = 'red';
        sub.disabled = 'true';
    } else {
        if (password == confirmPassword && password != "") {
            msg.innerHTML = "password match";
            msg.style.color = 'green';
            sub.disabled = "";
        } else {
            msg.innerHTML = "* password not match";
            msg.style.color = 'red';
            sub.disabled = 'true';
        }
    }
}

// Check if all fields are filled and correct
function isNewPatientNull(error) {
    var familyName = document.getElementById("familyName").value;
    var givenName = document.getElementById("givenName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var height = document.getElementById("height").value;
    var birth = document.getElementById("birth").value;
    var code = document.getElementById("code").value;
    var error;

    if (error =='') {
        if (familyName != "" && givenName != "" && email != "" && password != "" && confirmPassword != "" && height != "" && birth != "" && code != "" ) {
            if (password == confirmPassword) {
                alert("You have successfully saved the data");
            }
        }
    }
}
