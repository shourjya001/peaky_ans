function populateSearchOptions(stype, resultData) {
    console.log("Entering populateSearchOptions function");
    var codriaCode = document.getElementById("codria_code");
    if (codriaCode) {
        codriaCode.value = '';
    }

    // Create select dropdowns
    var selectdropdown = document.createElement("select");
    selectdropdown.id = "select" + stype + "_code";
    selectdropdown.setAttribute("onchange", "selectdropdown('" + stype + "', 'code');");

    var selectdropdown2 = document.createElement("select");
    selectdropdown2.id = "select" + stype + "_name";
    selectdropdown2.setAttribute("onchange", "selectdropdown('" + stype + "', 'name');");

    // Replace text inputs with dropdowns
    var txtCode = document.getElementById("txt" + stype + "_code");
    var txtName = document.getElementById("txt" + stype + "_name");
    if (txtCode && txtName) {
        txtCode.parentNode.replaceChild(selectdropdown, txtCode);
        txtName.parentNode.replaceChild(selectdropdown2, txtName);
    }

    // Append options to select dropdowns
    for (var index = 0; index < resultData.length; index++) {
        var item = resultData[index];
        var option = document.createElement("option");
        option.value = item.id; // Ensure 'id' exists in resultData
        option.text = item.name || item.id; // Use 'name' if available, else fallback to 'id'
        selectdropdown.appendChild(option);
    }

    // Determine where to append the dropdowns
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

    // Reset elements visibility
    var sgrResetElements = document.getElementsByClassName("sgr_reset");
    for (var i = 0; i < sgrResetElements.length; i++) {
        sgrResetElements[i].style.display = 'block';
    }
}
