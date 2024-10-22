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
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.id === 'None') {
                    var elements = document.getElementsByClassName("codria_class");
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].style.display = 'none';
                    }
                    alert("No credit files available..!");
                } else {
                    for (var i = 0; i < response.length; i++) {
                        var item = response[i];
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
                    }
                    var elements = document.getElementsByClassName("codria_class");
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].style.display = 'block';
                    }
                }
            } else {
                alert("AJAX request failed with status: " + xhr.status);
            }
        }
    };

    var url = "dbe_cf1_user_accessTransferSave.php?searchType=fetchCFdetails&codspm=" + encodeURIComponent(codspm) + "&codle=" + encodeURIComponent(codle) + "&nocache=" + new Date().getTime();
    alert("Requesting URL: " + url); // Debugging alert to display the URL
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}

function goToHomePage() {
    alert("te");
    location.reload(true);
}
