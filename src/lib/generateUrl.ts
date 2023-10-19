const generateURL = payload => {
    let url = '';
    // remove searchValue if its empty
    if (payload.searchValue === '') {
        delete payload.searchValue;
    }

    if (payload.startDate === null || payload.startDate == undefined) {
        delete payload.startDate;
    }
    if (payload.endDate === null || payload.endDate == undefined) {
        delete payload.endDate;
    }
    if (payload.sort === '') {
        delete payload.sort;
    }

    // remove null values if removeNull is true
    if (payload) {
        for (const [key, value] of Object.entries(payload)) {
            if (value === null || value == undefined || value == '') delete payload[key];
        }
    }

    for (const [key, value] of Object.entries(payload)) {
        url += `&${key}=${value}`;
    }
    return url;
};

export default generateURL