var isAndroid = kendo.support.mobileOS.android;

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

function mobileExamples(section) {
    return $.grep(section.items, function(item) {
        item.section = section.text;

        if (item.disableInMobile) {
            return false;
        }

        if (!item.packages) {
            return true;
        }

        var invert = false, match = false;

        for (var i = 0; i < item.packages.length; i ++) {
            var packageName = item.packages[i];
            if (packageName[0] === "!") {
                invert = true;
            }

            if (packageName === "online") {
                match = true;
            }
        }

        return (!invert && match) || (invert && !match);
    });
}

function removeView(e) {
    e.view.purge();
}

function loadSection(e) {
    navDataSource.fetch(function() {
        var item = navDataSource.get(e.view.params["name"]);
        detailNavDataSource.data(mobileExamples(item));
        e.view.scroller.reset();

        var navBar = e.view.element.find("[data-role=navbar]").data("kendoMobileNavBar");
        if (navBar) {
            navBar.title(item.text);
        }
    });
}

function focusSearch(e) {
    var search = e.view.element.find("#demos-search");
    search.focus();
}

function blurSearch(e) {
    e.view.element.find("#demos-search").blur();
}

function initSearch(e) {
    navDataSource.fetch(function() {
        var items = [];
        var data = navDataSource.data();
        for (var i = 0; i < data.length; i ++) {
            items = items.concat(mobileExamples(data[i]));
        }

        searchDataSource.data(items);

        var searchBox = e.view.element.find("#demos-search");
        searchBox.on("input", function() {
            var value = searchBox.val();

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
        });
    });
}

function checkSearch(e) {
    if (!searchDataSource.filter()) {
        e.preventDefault();
        this.replace([]);
        $("#search-tooltip").show();
    } else {
        $("#search-tooltip").hide();
    }
}

function triggerIndexButton(e) {
    navDataSource.fetch(function() {
        var url = e.view.id,
            element = e.view.element;

        var section = navDataSource.get(url.split("/")[0]);
        detailNavDataSource.data(mobileExamples(section));

        var item = detailNavDataSource.get(url);
        var navBar = element.find("[data-role=navbar]").data("kendoMobileNavBar");

        if (navBar) {
            navBar.title(item.text);
        }

        element.find("[data-role=backbutton]").attr("href", "#section?name=" + section.name);
    });

    if (!isAndroid) {
        $("#androidLightChanger").hide();
    }
}

function selectTheme(e) {
    e.preventDefault();
    e.sender.element.find("li").removeClass("current");
    e.item.addClass("current");
    console.log(e);
}

window.app = new kendo.mobile.Application($(document.body), {
    layout: "examples",
    transition: "slide",
    skin: "flat",
    icon: {
        "" : '@Url.Content("~/content/mobile/AppIcon72x72.png")',
        "72x72" : '@Url.Content("~/content/mobile/AppIcon72x72.png")',
        "76x76" : '@Url.Content("~/content/mobile/AppIcon76x76.png")',
        "114x114" : '@Url.Content("~/content/mobile/AppIcon72x72@2x.png")',
        "120x120" : '@Url.Content("~/content/mobile/AppIcon76x76@2x.png")',
        "152x152" : '@Url.Content("~/content/mobile/AppIcon76x76@2x.png")'
    }
});

