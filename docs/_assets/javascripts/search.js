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
        }
        else {
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

function search_loaded() {
    $("#page-search table.gsc-search-box > tbody > tr")
        .append($("<td id='refine-search-container'><div id='refine-search-button' class='unselectable'><span id='refine-search-label' data-bind='text: label'></span><span class='k-icon k-i-arrow-chevron-down'></span></div></td>"));

    var popup = $("#refine-search-popup").kendoPopup({
        anchor: $("#page-search table.gsc-search-box"),
        origin: "bottom right",
        position: "top right",
    }).data("kendoPopup");

    $("#page-search").on("click", "#refine-search-button", function () {
        popup.toggle();
    });

    var resources = {};

    viewModel.updateLabel();

    kendo.bind($("#page-search"), viewModel);
    kendo.bind($("#refine-search-popup"), viewModel);

    $(".custom-checkbox input[type='checkbox']").change(function () {
        viewModel.updateLabel();
    });

    attachToEvents();
    searchInternal();
}

function searchInternal() {
}

function onSearchInternal() {
}

function search() {
    var element = google.search.cse.element.getElement(GCSE_ELEMENT_NAME);
    if (element) {
        var q = element.getInputQuery();
        var filterExpression = viewModel.getFilter();
        sendInfo(filterExpression, q);
        filterExpression = filterExpression !== '' ? PAGE_FILTER + filterExpression : '';
        element.execute(q + filterExpression);

        $(".gsc-input-box .gsc-input").val("")
    }

    onSearchInternal();
}

function closePopup() {
    var popup = $("#refine-search-popup").data("kendoPopup");
    popup.close();
}

function attachToEvents() {
    $('.gsc-input').keydown(function (e) {
        if (e.keyCode == 13) { // Enter
            e.preventDefault();

            closePopup();
            search();
        }
    })

    $('.gsc-search-button').click(function (e) {
        closePopup();
        search();
    });
}

function sendInfo(filter, query) {
    dataLayer.push({
        'event': 'virtualEvent',
        'eventCategory': 'docs-search-terms',
        'eventAction': filter,
        'eventLabel': query,
    });
}

window.__gcse = {
    callback: search_loaded
};
