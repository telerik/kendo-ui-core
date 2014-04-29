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
    }
});

var detailNavDataSource = new kendo.data.DataSource({
    schema: {
        model: {
            id: "url"
        }
    }
});

var searchDataSource = new kendo.data.DataSource();

function onlineExamples(section) {
    return $.grep(section.items, function(item) {
        item.section = section.text;

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
        detailNavDataSource.data(onlineExamples(item));
        e.view.element.find("[data-role=navbar]").data("kendoMobileNavBar").title(item.text);
    });
}

function focusSearch(e) {
    e.view.element.find("#demos-search").focus();
}

function initSearch(e) {
    navDataSource.fetch(function() {
        var items = [];
        var data = navDataSource.data();
        for (var i = 0; i < data.length; i ++) {
            items = items.concat(onlineExamples(data[i]));
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
                    filter.filters.push({ logic: "or", filters: [ { field: "text", operator: "contains", value: word }, { field: "title", operator: "contains", value: word } ] });
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
    }
}

function triggerIndexButton(e) {
    navDataSource.fetch(function() {
        var url = e.view.id,
            element = e.view.element;

        var section = navDataSource.get(url.split("/")[0]);
        detailNavDataSource.data(onlineExamples(section));

        var item = detailNavDataSource.get(url);
        element.find("[data-role=navbar]").data("kendoMobileNavBar").title(item.text);
        element.find("[data-role=backbutton]").attr("href", "#section?name=" + section.name);
    });

    if (!isAndroid) {
        $("#androidLightChanger").hide();
    }
}

function changeSkin(e) {
    var nextSkin = e.sender.element.text() == "Flat" ? "flat" : "";

    window.app.skin(nextSkin.toLowerCase());
    e.sender.element.find(".km-text").text(nextSkin ? "Native" : "Flat");

    if (isAndroid) {
        $("#androidLightChanger")[nextSkin ? "hide" : "show"]();
    }
}

function changeAndroidSkin(e) {
    var nextSkin = e.sender.element.text() == "Light" ? "android-light" : "android-dark";

    window.app.skin(nextSkin.toLowerCase());
    e.sender.element.find(".km-text").text(nextSkin == "android-light" ? "Dark" : "Light");
}

window.app = new kendo.mobile.Application($(document.body), {
    layout: "examples",
    transition: "slide",
    icon: {
        "" : '@Url.Content("~/content/mobile/AppIcon72x72.png")',
        "72x72" : '@Url.Content("~/content/mobile/AppIcon72x72.png")',
        "76x76" : '@Url.Content("~/content/mobile/AppIcon76x76.png")',
        "114x114" : '@Url.Content("~/content/mobile/AppIcon72x72@2x.png")',
        "120x120" : '@Url.Content("~/content/mobile/AppIcon76x76@2x.png")',
        "152x152" : '@Url.Content("~/content/mobile/AppIcon76x76@2x.png")'
    }
});

