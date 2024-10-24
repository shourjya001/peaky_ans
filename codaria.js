document.getElementById("codria_code").onchange = function() {
    document.getElementById("codria_span").innerHTML = '';
    var cval = document.getElementById("codria_code").value;
    if (cval !== '' && cval !== undefined && cval !== null) {
        // Fetch details based on codria
        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open("POST", "dbe_cfl_user_accessTransferSave.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                document.getElementById('loading_wrap').style.display = 'none';
                if (xhr.status == 200) {
                    try {
                        var res = JSON.parse(xhr.responseText);
                        if (res.id === 'None') {
                            var elements = document.getElementsByClassName("codria_class");
                            for (var i = 0; i < elements.length; i++) {
                                elements[i].style.display = 'none';
                            }
                            alert("Invalid reference number.");
                        } else {
                            // SGR dropdown
                            var sgrdata = {};
                            sgrdata['sgr'] = [{ 'id': res[0].sgr_code, 'name': res[0].sgr_name }];
                            populateSearchOptions('sgr', sgrdata);

                            // LE dropdown
                            var ledata = {};
                            ledata['le'] = { 'id': res[0].le_code, 'name': res[0].le_name };
                            populateSearchOptions('le', ledata);

                            // Codria checkboxes
                            var codriaSpan = document.getElementById('codria_span');
                            var input = document.createElement('input');
                            input.type = 'radio';
                            input.name = 'codria';
                            input.style.display = 'inline';
                            input.style.paddingRight = '5px';
                            input.style.width = '20%';
                            input.id = 'codria' + res[0].CODRIA;
                            input.value = res[0].CODRIA;
                            input.checked = true;

                            var label = document.createElement('label');
                            label.htmlFor = input.id;
                            label.innerText = res[0].CODRIA;

                            codriaSpan.appendChild(input);
                            codriaSpan.appendChild(label);

                            var elements = document.getElementsByClassName("codria_class");
                            for (var i = 0; i < elements.length; i++) {
                                elements[i].style.display = 'block';
                            }

                            // Limits details
                            fetchUserDropdownDetails('codris', '10');
                        }
                    } catch (e) {
                        console.error("Error parsing JSON response: " + e.message);
                        alert("Error parsing JSON response: " + e.message);
                    }
                } else {
                    console.error("AJAX request failed with status: " + xhr.status);
                    alert("AJAX request failed with status: " + xhr.status);
                }
            }
        };

        xhr.send("searchType=fetchCodriaBasedDetails&codria=" + encodeURIComponent(cval) + "&nocache=" + new Date().getTime());
    } else {
        document.getElementById('loading_wrap').style.display = 'none';
        alert("Please enter a valid reference number.");
    }
};

document.getElementById("sgrspan").onclick = function() {
    var sgrtable = document.getElementById("sgrtable");
    if (sgrtable.style.display === 'none' || sgrtable.style.display === '') {
        sgrtable.style.display = 'block';
    } else {
        sgrtable.style.display = 'none';
    }
};
