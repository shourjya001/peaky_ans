function populateSearchOptions(stype, resultData) {
    var selectCode = document.createElement("SELECT");
    selectCode.id = "select" + stype + "_code";
    selectCode.onchange = new Function("selectdropdown('" + stype + "', 'code')");
    
    var selectName = document.createElement("SELECT");
    selectName.id = "select" + stype + "_name";
    selectName.onchange = new Function("selectdropdown('" + stype + "', 'name')");
    
    // Replace existing elements
    var txtCode = document.all["txt" + stype + "_code"];
    var txtName = document.all["txt" + stype + "_name"];
    if (txtCode && txtName) {
        txtCode.parentElement.replaceChild(selectCode, txtCode);
        txtName.parentElement.replaceChild(selectName, txtName);
    }
    
    // Populate options
    for (var index = 0; index < resultData.length; index++) {
        var item = resultData[index];
        var optionCode = document.createElement("OPTION");
        var optionName = document.createElement("OPTION");
        
        optionCode.value = item.id;
        optionCode.text = item.id;
        optionName.value = item.id;
        optionName.text = item.name || item.id; // Use name if available, otherwise use id
        
        selectCode.options.add(optionCode);
        selectName.options.add(optionName);
    }
    
    // Append to parent element
    var appendtotype = (stype === 'sgr') ? 'subgroupname_id' : 'legroupname_id';
    var appendToElement = document.all[appendtotype];
    if (appendToElement) {
        appendToElement.appendChild(selectCode);
        appendToElement.appendChild(selectName);
    }
}
