function checkForCreditFiles(codspm, codle) {
    if (codspm === undefined) codspm = '';
    if (codle === undefined) codle = '';

    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.id === 'None') {
                document.querySelectorAll(".codria_class").forEach(function(element) {
                    element.style.display = 'none';
                });
                alert("No credit files available..!");
            } else if (response.id !== 'None') {
                response.forEach(function(item) {
                    var input = document.createElement('input');
                    input.type = 'radio';
                    input.name = 'codria';
                    input.style.display = 'inline';
                    input.style.paddingRight = '5px';
                    input.style.width = '20%';
                    input.id = 'codria' + item.codri;
                    input.value = item.codria;

                    var label = document.createElement('label');
                    label.htmlFor = input.id;
                    label.innerText = item.codria;

                    document.getElementById('codria_span').appendChild(input);
                    document.getElementById('codria_span').appendChild(label);
                });
                document.querySelectorAll(".codria_class").forEach(function(element) {
                    element.style.display = 'block';
                });
            }
        }
    };

    var url = "dbe_cf1_user_accessTransferSave.php?searchType=fetchCFdetails&codspm=" + encodeURIComponent(codspm) + "&codle=" + encodeURIComponent(codle) + "&nocache=" + new Date().getTime();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}

function goToHomePage() {
    alert("te");
    location.reload(true);
}
