function selectdropdown(s1, s2) {
    var s3 = (s2 === 'code') ? 'name' : 'code';

    // Show loading
    var loadingWrap = document.all["loading_wrap"];
    if (loadingWrap) {
        loadingWrap.style.display = 'block';
    }

    // Get selected value and update both dropdowns
    var selectElement = document.all["select" + s1 + "_" + s2];
    var otherDropdown = document.all["select" + s1 + "_" + s3];
    
    if (selectElement && otherDropdown) {
        var selectedValue = selectElement.options[selectElement.selectedIndex].value;
        selectElement.value = selectedValue;
        otherDropdown.value = selectedValue;
    }

    var grpid = selectedValue;

    // Perform actions based on s1
    if (s1 === 'sgr') {
        commonsearch('fetchLEBasedonSGR', grpid, searchParam, 'le', 0);
    } else if (s1 === 'le') {
        inputfieldsearch("select" + s1 + "_" + s3); // updating other dropdown
        commonsearch('fetchLegalEntityBasedonID', grpid, searchParam, 'le', 1);

        // Hide loading with a delay (simulating fadeOut)
        setTimeout(function() {
            if (loadingWrap) {
                loadingWrap.style.display = 'none';
            }
        }, 1000); // 1 second delay
    }
}
