function inputfieldsearch(param) {
    document.getElementById("loading_wrap").style.display = 'block';
    var searchString = '', searchType = '', searchParam = '', stype = '';

    if (param === 'txtsgr_code' || param === 'txtsgr_name') {
        stype = 'sgr';
        if (param === 'txtsgr_code') {
            searchType = 'fetchSubGroupBasedonID';
            searchString = document.getElementById("txtsgr_code").value;
        } else if (param === 'txtsgr_name') {
            searchType = 'fetchSubGroupBasedonName';
            searchString = document.getElementById("txtsgr_name").value;
        }
    } else if (param === 'txtle_code' || param === 'txtle_name') {
        stype = 'le';
        if (param === 'txtle_code') {
            searchType = 'fetchLegalEntityBasedonID';
            searchString = document.getElementById("txtle_code").value;
        } else if (param === 'txtle_name') {
            searchType = 'fetchLegalEntityBasedonName';
            searchString = document.getElementById("txtle_name").value;
        }
    }

    if (searchType !== '' && searchString !== '') {
        commonsearch(searchType, searchString, searchParam, stype, 0);
    } else {
        document.getElementById("loading_wrap").style.display = 'none';
    }
}
