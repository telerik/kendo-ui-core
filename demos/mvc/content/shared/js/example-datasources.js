var navDataSource = new kendo.data.DataSource({
    transport: {
        read: {
            url: NAV_JSON_URL,
            dataType: "json"
        }
    },
    schema: {
        model: {
            id: "name"
        }
    },
    filter: { field: "disableInMobile", operator: "neq", value: true },
    group: { field: "category" }
});

var detailNavDataSource = new kendo.data.DataSource({
    schema: {
        model: {
            id: "url"
        }
    }
});

var themes = [
    { text: "Default", value: "default", color: "#ef6f1c" },
    { text: "Blue Opal", value: "blueopal", color: "#076186" },
    { text: "Bootstrap", value: "bootstrap", color: "#3276b1" },
    { text: "Silver", value: "silver", color: "#298bc8" },
    { text: "Uniform", value: "uniform", color: "#666666" },
    { text: "Metro", value: "metro", color: "#8ebc00" },
    { text: "Black", value: "black", color: "#0167cc" },
    { text: "Metro Black", value: "metroblack", color: "#00aba9" },
    { text: "High Contrast", value: "highcontrast", color: "#b11e9c" },
    { text: "Moonlight", value: "moonlight", color: "#ee9f05" },
    { text: "Flat", value: "flat", color: "#363940" }
];

var searchDataSource = new kendo.data.DataSource();

function populateSearchDataSource() {
    navDataSource.fetch(function() {
        var items = [];
        var data = navDataSource.data();
        for (var i = 0; i < data.length; i ++) {
            items = items.concat(mobileExamples(data[i]));
        }

        searchDataSource.data(items);
    });
}

function searchExamplesFor(value) {
    if (value.length < 3) {
        searchDataSource.filter(null);
    } else {
        var filter = { logic: "and", filters: []};
        var words = value.split(" ");

        for (var i = 0; i < words.length; i ++) {
            var word = words[i];
            filter.filters.push({ logic: "or", filters: [ { field: "section", operator: "contains", value: word }, { field: "text", operator: "contains", value: word }, { field: "title", operator: "contains", value: word } ] });
        }

        searchDataSource.filter(filter);
    }
}
