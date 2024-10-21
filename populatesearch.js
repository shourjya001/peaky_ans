function populateSearchOptions(stype, resultData) {
    console.log("Entering populateSearchOptions function");
    var codriaCode = document.getElementById("codria_code");
    if (codriaCode) {
        codriaCode.value = '';
    }

    var selectdropdown = document.createElement("select");
    selectdropdown.id = "select" + stype + "_code";
    selectdropdown.setAttribute("onchange", "selectdropdown('" + stype + "', 'code');");

    var selectdropdown2 = document.createElement("select");
    selectdropdown2.id = "select" + stype + "_name";
    selectdropdown2.setAttribute("onchange", "selectdropdown('" + stype + "', 'name');");

    var txtCode = document.getElementById("txt" + stype + "_code");
    var txtName = document.getElementById("txt" + stype + "_name");
    if (txtCode && txtName) {
        txtCode.parentNode.replaceChild(selectdropdown, txtCode);
        txtName.parentNode.replaceChild(selectdropdown2, txtName);
    }

    var selectCode = document.getElementById("select" + stype + "_code");
    var selectName = document.getElementById("select" + stype + "_name");
    if (selectCode && selectName) {
        selectCode.parentNode.replaceChild(selectdropdown, selectCode);
        selectName.parentNode.replaceChild(selectdropdown2, selectName);
    }

    var sgrResetElements = document.getElementsByClassName("sgr_reset");
    for (var i = 0; i < sgrResetElements.length; i++) {
        sgrResetElements[i].style.display = 'block';
    }

    for (var index = 0; index < resultData.length; index++) {
        var item = resultData[index];
        var option = document.createElement("option");
        option.value = item.id;
        option.text = item.id;
        selectdropdown.appendChild(option);
    }

    var appendtotype;
    if (stype === 'sgr') {
        appendtotype = 'subgroupname_id';
    } else if (stype === 'le') {
        appendtotype = 'legroupname_id';
    }

    var appendToElement = document.getElementById(appendtotype);
    if (appendToElement) {
        appendToElement.appendChild(selectdropdown);
        appendToElement.appendChild(selectdropdown2);
    }
}
