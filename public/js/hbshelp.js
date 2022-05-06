// Check if have value in input box
function isNull() {
    var addData = document.getElementById("addData").value;

    if (addData != "") {
        alert("You have successfully saved the data");
    }

}

function isNewPatientNull() {
    var familyName = document.getElementById("familyName").value;
    var givenName = document.getElementById("givenName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var height = document.getElementById("height").value;
    var birth = document.getElementById("birth").value;

    if (familyName != "" && givenName != "" && email != "" && password != "" && confirmPassword != "" && height != "" && birth != "") {
        if (password == confirmPassword) {
            alert("You have successfully saved the data");
        } else {
            alert("Your password not match with the confirmed password");
            return true;
        }
    }
}