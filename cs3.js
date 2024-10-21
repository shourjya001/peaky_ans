if (!window.JSON) {
    window.JSON = {
        parse: function (sJSON) { return eval('(' + sJSON + ')'); },
        stringify: function (vContent) {
            if (vContent instanceof Object) {
                var sOutput = '';
                if (vContent.constructor === Array) {
                    for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ',', nId++);
                    return '[' + sOutput.substr(0, sOutput.length - 1) + ']';
                }
                if (vContent.toString !== Object.prototype.toString) {
                    return '"' + vContent.toString().replace(/"/g, '\\$&') + '"';
                }
                for (var sProp in vContent) {
                    sOutput += '"' + sProp.replace(/"/g, '\\$&') + '":' + this.stringify(vContent[sProp]) + ',';
                }
                return '{' + sOutput.substr(0, sOutput.length - 1) + '}';
            }
            return typeof vContent === 'string' ? '"' + vContent.replace(/"/g, '\\$&') + '"' : String(vContent);
        }
    };
}
function commonsearch(searchType, searchString, searchParam, stype, check) {
    // var xhr = new ActiveXObject("Microsoft.XMLHTTP"); // Use ActiveXObject for IE5
    var xhr=new XMLHttpRequest();
    xhr.open("POST", "dbe_cfl_user_accessTransferSave.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
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
            } else {
                alert("AJAX request failed with status: " + xhr.status);
            }
        }
    };

    xhr.send("searchType=" + encodeURIComponent(searchType) + "&searchString=" + encodeURIComponent(searchString));
}
