var navCategories = [
    "Data Management",
    "Editors",
    "Layout",
    "Data Visualization",
    "Diagramming",
    "Geo Visualization",
    "Scheduling",
    "Navigation",
    "Interactivity & UX",
    "Framework",
    "Mobile"
];

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
    change: function(e) {
        this.view().sort(function(a, b) {
            var indexA = $.inArray(a.value, navCategories);
            var indexB = $.inArray(b.value, navCategories);
            return indexA > indexB ? 1 : -1;
        });
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

var searchDataSource = new kendo.data.DataSource();

function onlineExamples(section, product, reject) {
    return $.grep(section.items, function (item) {
        item.section = section.text;

        if (reject(item)) {
            return false;
        }

        var packages = item.packages || section.packages;

        if (!packages) {
            return true;
        }

        var invert = false, match = false;

        for (var i = 0; i < packages.length; i++) {
            var packageName = packages[i];


            if (packageName === "!" + product) {
                return false;
            }

            if (packageName[0] === "!") {
                invert = true;
            }

            if (packageName === product) {
                match = true;
            }

            if (packageName === "offline") {
                return false;
            }
        }

        var result = (!invert && match) || (invert && !match);

        return result;
    });

}

function mobileExamples(section) {
    return onlineExamples(section, navProduct, function(item) {
        return item.disableInMobile;
    });
}

function desktopExamples(section) {
    return onlineExamples(section, navProduct, function(item) {
        return false;
    });
}

function populateSearchDataSource(filter) {
    navDataSource.fetch(function() {
        var items = [];
        var data = navDataSource.data();
        for (var i = 0; i < data.length; i ++) {
            items = items.concat(filter(data[i]));
        }

        searchDataSource.data(items);
    });
}

function searchExamplesFor(value, product) {
    function titleContains(value) {
        return function (title) {
            var text = "";

            if (title) {
                text = title[product] || title["kendo-ui"];
            }

            return text.indexOf(value) >= 0;
        };
    }

    if (value.length < 3) {
        searchDataSource.filter(null);
    } else {
        var filter = { logic: "and", filters: []};
        var words = value.split(" ");

        for (var i = 0; i < words.length; i ++) {
            var word = words[i];
            filter.filters.push({
                logic: "or",
                filters: [
                    { field: "section", operator: "contains", value: word },
                    { field: "text", operator: "contains", value: word },
                    { field: "title", operator: titleContains(word) }
                ]
            });
        }

        searchDataSource.filter(filter);
    }
}

kendo.ui.plugin(kendo.ui.AutoComplete.extend({
    init: function(element, options) {
        kendo.ui.AutoComplete.fn.init.call(this,
            element,
            $.extend(true, { dataSource: searchDataSource }, options)
        );

        this.wrapper.append('<span class="k-uniE600" />');
    },
    options: {
        name: "ExampleSearch"
    },
    _filterSource: function() {
       searchExamplesFor(this.value(), this.options.product);
    }
}));
