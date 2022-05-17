// Check if have value in input box
function isAddDataNull() {
    var addData = document.getElementById("addData").value;
    var addComment = document.getElementById("addComment").value.length;

    if (addData < 0) {
        alert("Please enter valid data");
        return false;
    } else if (addComment > 140) {
        alert("No more than 140 letters");
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
function isNewPatientNull() {
    var familyName = document.getElementById("familyName").value;
    var givenName = document.getElementById("givenName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var height = document.getElementById("height").value;
    var birth = document.getElementById("birth").value;

    if (familyName != "" && givenName != "" && email != "" && password != "" && confirmPassword != "" && height != "" && birth != "" && birth >= 1922 && birth <= 2022) {
            alert("You have successfully submitted");
    }
}


function submitDateForm(){
    var form = document.getElementById("dateForm");
    form.submit();
}

function isChangePass() { 
    var oldPassword = document.getElementById("oldPassword").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    if (oldPassword != '' && password != '' && confirmPassword != '') {
        alert("You have successfully submitted");
    } 
}

function isForgetPass() { 
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    if (email != '' && password != '' && confirmPassword != '') {
        alert("You have successfully submitted");
    } 
}

function setDarkmode (darkmode) {
    if (darkmode == true) {
        var checkbox = document.getElementById('chk');
        checkbox.checked = true;
        document.body.classList.toggle('dark');
    }
    const chk = document.getElementById('chk');

    chk.addEventListener('change', () => {
        document.body.classList.toggle('dark');
        var form = document.getElementById("modeForm");
        form.submit();
    });

}

function submitMode(){
    var mode = document.getElementById("mode");
    mode.submit();
}

function isDarkmode (darkmode) {
    if (darkmode==true) {
        document.body.classList.toggle('dark');
    }
}

function tryalert() {
    alert("Testing....");
}

function showChart(recent7){
    alert("进来了");
    var glucoseData = [];
    var weigthData = [];
    var exerciseData = [];
    var insulinData = [];
    for (i in recent7){
        glucoseData.push(recent7[i].record.record_id.glucose.value);
        weigthData.push(recent7[i].record.record_id.weight.value);
        insulinData.push(recent7[i].record.record_id.insulin.value);
        exerciseData.push(recent7[i].record.record_id.exercise.value);
    }
    
Highcharts.chart('container', {

    title: {
      text: 'Recent 7 dayss Record statistics'
    },
  
  
    yAxis: {
      title: {
        text: 'number'
      }
    },
  
    xAxis: {
      accessibility: {
        rangeDescription: 'Range: last 7 days'
      }
    },
  
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
  
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: recent7[6].date
      }
    },
  
    series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  
  });
}
