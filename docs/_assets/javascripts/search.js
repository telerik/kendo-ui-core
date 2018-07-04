var PAGE_FILTER = " more:pagemap:metatags-restype:";
var GCSE_ELEMENT_NAME = "google-search";

var viewModel = kendo.observable({
    kb: false,
    docs: false,
    api: false,
    label: "",
    filterValues: [],
    getFilter: function () {
        var filterExpression = '';
        for (var i = 0; i < this.filterValues.length; i++) {
            if (filterExpression !== '') {
                filterExpression += ',';
            }

            filterExpression += this.filterValues[i];
        }

        return filterExpression;
    },
    updateLabel: function () {
        var label = "";
        this.filterValues = [];

        if ((this.kb && this.docs && this.api) || (!this.kb && !this.docs && !this.api)) {
            label = "Search all";
        } else {
            if (this.docs) {
                label += "DOCS";
                this.filterValues.push('documentation');
            }

            if (this.kb) {
                label += (label ? " / " : "") + "KB";
                this.filterValues.push('kb');
            }

            if (this.api) {
                label += (label ? " / " : "") + "API";
                this.filterValues.push('api');
            }

            label = "Search in " + label;
        }

        this.set("label", label)
    }
});

var searchTerms = "";

function search_loaded() {
    $("#page-search table.gsc-search-box > tbody > tr")
        .append($("<td id='refine-search-container'><div id='refine-search-button' class='unselectable'><span id='refine-search-label' data-bind='text: label'></span><span class='k-icon k-i-arrow-chevron-down'></span></div></td>"));

    var popup = $("#refine-search-popup").kendoPopup({
        anchor: $("#page-search table.gsc-search-box"),
        origin: "bottom right",
        position: "top right",
    }).data("kendoPopup");

    $("#page-search #refine-search-button").on("click", function () {
        popup.toggle();
    });

    viewModel.updateLabel();

    kendo.bind($("#page-search"), viewModel);
    kendo.bind($("#refine-search-popup"), viewModel);

    $(".custom-checkbox input[type='checkbox']").change(function () {
        viewModel.updateLabel();
    });

    prepareSearch();
    searchInternal();
}

function searchInternal() {}

function onSearchInternal() {}

function search() {
    var element = google.search.cse.element.getElement(GCSE_ELEMENT_NAME);
    if (element) {
        searchTerms = $(".gsc-input-box .gsc-input").val();
        var filterExpression = viewModel.getFilter();
        trackSearchQuery(filterExpression, searchTerms);
        filterExpression = filterExpression !== '' ? PAGE_FILTER + filterExpression : '';
        element.execute(searchTerms + filterExpression);

        $(".gsc-input-box .gsc-input").val(searchTerms);
    }

    onSearchInternal();
}

function closePopup() {
    var popup = $("#refine-search-popup").data("kendoPopup");
    popup.close();
}

function prepareSearch() {
    var oldInput = $('.gsc-input input[type="text"]');
    oldInput.off('keydown');
    oldInput.off('blur');
    oldInput.off('focus');
    var newInput = oldInput.clone();
    oldInput.replaceWith(newInput);
    newInput.on('keydown', function (e) {
        if (e.keyCode == 13) { // Enter
            closePopup();
            search();

            return false;
        }
    })
    .on('blur', function() {
        $this = $(this);
        if(!$this.val().length) {
            $this.removeClass('input-focused');
        }
    }).on('focus', function() {
        $(this).addClass('input-focused');
    });

    var oldSearchButton = $('.gsc-search-button button.gsc-search-button.gsc-search-button-v2');
    oldSearchButton.off('click');
    var newSearchButton = oldSearchButton.clone();
    oldSearchButton.replaceWith(newSearchButton);
    newSearchButton.on('click', function () {
        closePopup();
        search();

        return false;
    });

    $("#page-search").on("click", "a.gs-title", function (e) {
        trackSearchResult($(e.target).data("ctorig"));
    })
}

function trackSearchQuery(filter, query) {
    trackItem("docs-search-terms", filter, query);
}

function trackSearchResult(link) {
    trackItem("docs-search-results", searchTerms, link);
}

function trackItem(category, action, label) {
    dataLayer.push({
        'event': 'virtualEvent',
        'eventCategory': category,
        'eventAction': action,
        'eventLabel': label,
    });
}

window.__gcse = {
    callback: search_loaded
};
