function commonsearch(searchType, searchString, searchParam, stype, check) {
    var xhr = new ActiveXObject("Microsoft.XMLHTTP"); // Use ActiveXObject for IE5
    xhr.open("POST", "dbe_cfl_user_accessTransferSave.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (xhr.status === 200) {
            alert("AJAX request successful");
            var resultData = JSON.parse(xhr.responseText);
            if (resultData) {
                alert("Result data received: " + JSON.stringify(resultData));
                if (check === 0) populateSearchOptions(stype, resultData);
                if (stype === 'sgr') {
                    commonsearch('fetchLEBasedonSGR', resultData[0]['id'], searchParam, 'le', 0);
                } else if (stype === 'le') {
                    if (document.getElementById("selectsgr_code").value !== '' && document.getElementById("selectle_code").value !== '') {
                        checkForCreditFiles(document.getElementById("selectsgr_code").value, document.getElementById("selectle_code").value);
                    } else if (document.getElementById("txtle_code").value !== '' || document.getElementById("txtle_name").value !== '') {
                        var sgrdata = { 'sgr': { 'id': resultData[0].sgr_code, 'name': resultData[0].sgr_name } };
                        populateSearchOptions('sgr', sgrdata);
                        var ledata = { 'le': { 'id': resultData[0].le_code, 'name': resultData[0].le_name } };
                        populateSearchOptions('le', ledata);
                        checkForCreditFiles(document.getElementById("selectsgr_code").value, document.getElementById("selectle_code").value);
                    } else {
                        if (check === 0) {
                            populateSearchOptions('sgr', resultData);
                            commonsearch('fetchLegalEntityBasedonID', resultData[0]['id'], searchParam, 'le', 1);
                        }
                    }
                }
                document.getElementById("loading_wrap").style.display = 'none';
            } else {
                if (check === 0) {
                    alert("No Matching Results Found...! or You are not authorized to see this SGR/LE, please contact the Banking Administrator.");
                }
                document.getElementById("loading_wrap").style.display = 'none';
                if (stype === 'le') {
                    if (check === 1) {
                        document.getElementById("codria_span").innerHTML = '';
                        alert("No references are available for this LE.");
                    } else {
                        emptydropdown(stype);
                    }
                } else if (stype === 'sgr') {
                    var rtype = 'le';
                    emptydropdown(stype);
                    emptydropdown(rtype);
                }
            }
        }
    };

    xhr.onerror = function() {
        alert("AJAX request failed");
    };

    xhr.send("searchType=" + encodeURIComponent(searchType) + "&searchString=" + encodeURIComponent(searchString));
}
