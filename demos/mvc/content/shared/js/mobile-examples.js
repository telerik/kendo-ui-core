var isAndroid = kendo.support.mobileOS.android;


var currentExample,
    currentSection;

function nullCurrentExample(e) {
    currentExample = null;
}

function removeView(e) {
    if (!e.view.element.data("persist")) {
        e.view.purge();
    }
}

function loadSection(e) {
    currentExample = null;
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
    populateSearchDataSource(mobileExamples);

    var searchBox = e.view.element.find("#demos-search");
    searchBox.on("input", function() {
        searchExamplesFor(searchBox.val(), product);
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
    var view = e.sender.dataSource.view();
    for (var i = 0; i < view.length; i++) {
        if (view[i].value === window.kendoTheme) {
            e.sender.items()
                .filter("[data-uid='" + view[i].uid + "']")
                .addClass("current");

            break;
        }
    }
}

function showDemoLayout(e) {
    currentExample = null;
    currentSection = null;
    navDataSource.fetch(function() {
        var url = e.view.id,
            element = e.view.element;

        currentSection = navDataSource.get(url.split("/")[0]);

        if (currentSection) {
            detailNavDataSource.data(mobileExamples(currentSection));

            currentExample = detailNavDataSource.get(url);
            var navBar = element.find("[data-role=navbar]").data("kendoMobileNavBar");

            if (navBar) {
                navBar.title(currentExample.text);
            }

            e.view.header.find("#themechooser-button").toggle(!currentSection.mobile);
            e.view.footer.find("#desktop-footer").toggle(!currentSection.mobile);
            e.view.footer.find("#desktop-link").attr("href", "../" + url);

            element.find("[data-role=backbutton]").attr("href", "#section?name=" + currentSection.name);
        }
    });
}

function checkThemeChooser(e) {
    if (!currentExample || (currentSection && currentSection.mobile)) {
        e.preventDefault();
    }
}

function selectTheme(e) {
    e.preventDefault();
    if (!e.item.hasClass("current")) {
        e.sender.element.find("li").removeClass("current");
        e.item.addClass("current");
        kendo.mobile.application.showLoading();
        window.kendoThemeChooser.changeTheme(e.dataItem.value, true, function() {
            kendo.mobile.application.hideLoading();
            $("#themechooser").data("kendoMobileDrawer").hide();
        });
    }
}
