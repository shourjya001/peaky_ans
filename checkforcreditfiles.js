function checkForCreditFiles(codspm, codle) {
    if (codspm === undefined) codspm = '';
    if (codle === undefined) codle = '';

    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.open("POST", "dbe_cf1_user_accessTransferSave.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log("XHR Status: " + xhr.status); // Debugging log to display the status
            if (xhr.status === 200) {
                alert("AJAX request successful");
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
                console.error("AJAX request failed with status: " + xhr.status);
                alert("AJAX request failed with status: " + xhr.status);
            }
        }
    };

    xhr.send("codspm=" + encodeURIComponent(codspm) + "&codle=" + encodeURIComponent(codle) + "&nocache=" + new Date().getTime());
}

function goToHomePage() {
    alert("te");
    location.reload(true);
}
