function populateSearchOptions(stype, resultData) {
    document.getElementById("codria_code").value = '';

    var selectdropdown = document.createElement("select");
    selectdropdown.id = "select" + stype + "_code";
    selectdropdown.setAttribute("onchange", "selectdropdown('" + stype + "', 'code');");

    var selectdropdown2 = document.createElement("select");
    selectdropdown2.id = "select" + stype + "_name";
    selectdropdown2.setAttribute("onchange", "selectdropdown('" + stype + "', 'name');");

    if (document.getElementById("txt" + stype + "_code")) {
        document.getElementById("txt" + stype + "_code").parentNode.replaceChild(selectdropdown, document.getElementById("txt" + stype + "_code"));
        document.getElementById("txt" + stype + "_name").parentNode.replaceChild(selectdropdown2, document.getElementById("txt" + stype + "_name"));
    }

    if (document.getElementById("select" + stype + "_code")) {
        document.getElementById("select" + stype + "_code").parentNode.replaceChild(selectdropdown, document.getElementById("select" + stype + "_code"));
        document.getElementById("select" + stype + "_name").parentNode.replaceChild(selectdropdown2, document.getElementById("select" + stype + "_name"));
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

    document.getElementById(appendtotype).appendChild(selectdropdown);
    document.getElementById(appendtotype).appendChild(selectdropdown2);
}
