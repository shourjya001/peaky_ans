function populateSearchOptions(stype, resultData) {
    // IE5 doesn't support console.log, so we'll remove it
    // console.log("Entering populateSearchOptions function");
    
    var codriaCode = document.all["codria_code"];
    if (codriaCode) {
        codriaCode.value = '';
    }
    
    // Create select elements
    var selectdropdown = document.createElement("SELECT");
    selectdropdown.id = "select" + stype + "_code";
    selectdropdown.onchange = new Function("selectdropdown('" + stype + "', 'code')");
    
    var selectdropdown2 = document.createElement("SELECT");
    selectdropdown2.id = "select" + stype + "_name";
    selectdropdown2.onchange = new Function("selectdropdown('" + stype + "', 'name')");
    
    // Replace text inputs with select dropdowns
    var txtCode = document.all["txt" + stype + "_code"];
    var txtName = document.all["txt" + stype + "_name"];
    if (txtCode && txtName) {
        txtCode.parentElement.replaceChild(selectdropdown, txtCode);
        txtName.parentElement.replaceChild(selectdropdown2, txtName);
    }
    
    // Replace existing select elements if they exist
    var selectCode = document.all["select" + stype + "_code"];
    var selectName = document.all["select" + stype + "_name"];
    if (selectCode && selectName) {
        selectCode.parentElement.replaceChild(selectdropdown, selectCode);
        selectName.parentElement.replaceChild(selectdropdown2, selectName);
    }
    
    // Show reset elements
    var sgrResetElements = document.all.tags("*");
    for (var i = 0; i < sgrResetElements.length; i++) {
        if (sgrResetElements[i].className == "sgr_reset") {
            sgrResetElements[i].style.display = 'block';
        }
    }
    
    // Populate options
    for (var index = 0; index < resultData.length; index++) {
        var item = resultData[index];
        var option = document.createElement("OPTION");
        option.value = item.id;
        option.text = item.id;
        selectdropdown.options.add(option);
    }
    
    // Append to parent element
    var appendtotype;
    if (stype == 'sgr') {
        appendtotype = 'subgroupname_id';
    } else if (stype == 'le') {
        appendtotype = 'legroupname_id';
    }
    var appendToElement = document.all[appendtotype];
    if (appendToElement) {
        appendToElement.appendChild(selectdropdown);
        appendToElement.appendChild(selectdropdown2);
    }
}
