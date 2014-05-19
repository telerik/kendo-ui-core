var isAndroid = kendo.support.mobileOS.android;

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
    populateSearchDataSource();

    var searchBox = e.view.element.find("#demos-search");
    searchBox.on("input", function() {
        searchExamplesFor(searchBox.val());
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

function pickInitialTheme(e) {
    e.sender.items().filter(":contains(Silver)").addClass("current");
}

function showDemoLayout(e) {
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

        e.view.footer.find("#desktop-footer").toggle(!section.mobile);
        e.view.footer.find("#desktop-link").attr("href", "../" + url);

        element.find("[data-role=backbutton]").attr("href", "#section?name=" + section.name);
    });
}

function selectTheme(e) {
    e.preventDefault();
    if (!e.item.hasClass("current")) {
        e.sender.element.find("li").removeClass("current");
        e.item.addClass("current");
        kendo.mobile.application.showLoading();
        window.kendoThemeChooser.changeTheme(e.dataItem.value, true, function() {
            kendo.mobile.application.hideLoading();
        });
    }
}
