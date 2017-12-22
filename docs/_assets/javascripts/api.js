var API_CATEGORIES = ['configuration', 'fields', 'methods', 'events'];
var NESTED_ELEMENT_MARK = '.';
var COLUMNS_STYLE_CLASS_NAME = 'columns';
var API_SUBPAGE_TITLE = 'related-properties';
var MAX_NESTING_LEVEL = 10000;
var DEFAULT_COLUMN_COUNT = 3;
var MINIMUM_CHILDREN_COUNT = 6;
var COLUMN_HEIGHT_TOLLERANCE = 40;
var filterControl = null;
var previousSearch = "";

function findApiCategoryIndex(values) {
    var startIndex = -1;
    var category = "";
    $.each(values, function (index, value) {
        if (API_CATEGORIES.indexOf(value.toLowerCase()) > -1) {
            startIndex = index;
            category = value;
            return false;
        }
    });

    return {
        index: startIndex,
        category: category
    };
}

function capitalize(values) {
    for (var i = 0; i < 2; i++) {
        var value = values[i];
        values[i] = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
}

function separatePageParts(values, breadcrumbs) {
    var currentPageParts = values[values.length - 1].split('.');
    var previousLink = "";
    $.each(currentPageParts, function (index, pagePart) {
        previousLink += previousLink !== "" ? "." + pagePart : pagePart;
        breadcrumbs.push(previousLink);
    });
}

function getBreadcrumbsInfo(values) {
    var startIndex = findApiCategoryIndex(values).index;
    var breadcrumbs = values.slice(startIndex - 1, values.length - 1);
    capitalize(breadcrumbs);
    separatePageParts(values, breadcrumbs);
    categoryInfo = findApiCategoryIndex(breadcrumbs);

    return {
        categoryIndex: categoryInfo.index,
        category: categoryInfo.category,
        breadcrumbs: breadcrumbs
    };
}

function shouldBuildBreadCrumbs() {
    return $('#markdown-toc').length === 0;
}

function repeat(string, count) {
    var result = "";
    for (var i = 0; i < count; i++) {
        result += string;
    }

    return result;
}

function buildApiBreadcrumbs() {
    var path = $(location).attr('pathname').split('/');
    var breadcrumbsInfo = getBreadcrumbsInfo(path);
    var breadcrumbs = breadcrumbsInfo.breadcrumbs;
    breadcrumbs = breadcrumbs.slice(0, breadcrumbs.length); // Skip the last element

    var href = '';
    var lastHref = '';
    for (var i = 0; i < breadcrumbs.length - 1; i++) {
        var backStepsCount = breadcrumbsInfo.categoryIndex - i + 1;
        var relativePathBackPath = backStepsCount >= 0 ? repeat("../", backStepsCount) : "";
        var breadcrumb = breadcrumbs[i];
        href = breadcrumb === breadcrumbsInfo.category ?
            lastHref + '#' + breadcrumb :
            relativePathBackPath + breadcrumb;

        $('.api-breadcrumbs-container').append('<a href="' + href.toLowerCase() + '">' + breadcrumb + '</a>');
        if (i < breadcrumbs.length - 2) {
            $('.api-breadcrumbs-container').append(' / ');
        }
        lastHref = href;
    }
}

function getMinNestingLevel() {
    var minNestingLevel = MAX_NESTING_LEVEL;
    var linksSection = $('#' + API_SUBPAGE_TITLE);
    if (linksSection.length > 0) {
        var list = $(linksSection).next('ul');
        list.children().each(function () {
            minNestingLevel = Math.min(minNestingLevel, $(this).text().split(NESTED_ELEMENT_MARK).length - 1);
        });
    }

    return minNestingLevel;
}

function styleItems(listItems, category, mainNestingLevel) {
    listItems.each(function () {
        var itemText = $(this).text();
        var styleClassToAdd = itemText.split(NESTED_ELEMENT_MARK).length - 1 === mainNestingLevel ? 'api-icon ' + category : 'nested-list-item';
        $(this).addClass(styleClassToAdd);
    });

}

function getVisibleChildrenCount(list) {
    return list.children().not('li.hide-api-link').length;
}

function getTotalParentHeight(list) {
    var totalHeight = 0;
    list.children().each(function () {
        totalHeight += $(this).outerHeight(true);
    });

    return totalHeight;
}

function arrangeColumns(list, columnsCount) {
    columnsCount = columnsCount ? columnsCount : DEFAULT_COLUMN_COUNT;
    var listItemsCount = getVisibleChildrenCount(list);
    list.removeClass(COLUMNS_STYLE_CLASS_NAME);

    if (listItemsCount > MINIMUM_CHILDREN_COUNT) {
        var averageItemHeight = list.data('item-height');
        if (!averageItemHeight) {
            averageItemHeight = getTotalParentHeight(list) / listItemsCount;
        }
        var desiredItemsCount = listItemsCount / columnsCount;
        list.addClass(COLUMNS_STYLE_CLASS_NAME);
        list.height(averageItemHeight * desiredItemsCount + COLUMN_HEIGHT_TOLLERANCE);
        list.data('item-height', averageItemHeight);
    } else {
        list.css('height', '');
    }
}

function setupColumnsInternal(category, subCategory, mainNestingLevel) {
    var headerSelector = $('#' + category);
    if (headerSelector.length > 0) {
        var list = $(headerSelector).next('ul');
        var listItems = list.children();

        styleItems(listItems, subCategory, mainNestingLevel);
        arrangeColumns(list);
    }
}

function setupColumns() {
    for (var i = 0; i < API_CATEGORIES.length; i++) {
        setupColumnsInternal(API_CATEGORIES[i], API_CATEGORIES[i], 0);
    }

    var subCategory = $('#page-article article:first-child').attr('class');
    if (subCategory) {
        var mainNestingLevel = getMinNestingLevel();
        setupColumnsInternal(API_SUBPAGE_TITLE, subCategory.toLowerCase(), mainNestingLevel);
    }
}

function enumerateCategories() {
    var lists = [];
    for (var i = 0; i < API_CATEGORIES.length; i++) {
        var headerSelector = $('#' + API_CATEGORIES[i]);
        if (headerSelector.length > 0) {
            var list = $(headerSelector).next('ul');
            var listItems = list.children();
            lists.push(list);
        }
    }

    return lists;
}

function filter() {
    var text = filterControl.val().toLowerCase();
    if (text === previousSearch) {
        return;
    }

    $.each(enumerateCategories(), function (index, list) {
        list.removeClass('hide-api-container');
        list.prev('h2').removeClass('hide-api-container');

        list.children().each(function () {
            $(this).removeClass('hide-api-link');

            if ($(this).text().toLowerCase().indexOf(text) === -1) {
                $(this).addClass('hide-api-link');
            }
        });

        var listItemsCount = getVisibleChildrenCount(list);
        if (listItemsCount === 0) {
            list.addClass('hide-api-container');
            list.prev('h2').addClass('hide-api-container');
        } else {
            arrangeColumns(list, DEFAULT_COLUMN_COUNT);
        }
    });

    previousSearch = text;
}

function ensureCorrectNavigation() {
    var hash = window.location.hash;

    if (hash !== "") {
        var hashIndex = hash.indexOf('#');
        var dashIndex = hash.indexOf('-');
        if (hashIndex > -1 && hashIndex < dashIndex) {
            var newPath = hash.replace('#', '/').replace('-', '/').toLowerCase();
            window.location.replace(window.location.origin + window.location.pathname + newPath);
            return true;
        }
    }
    return false;
}

$(document).ready(function () {
    if (!ensureCorrectNavigation()) {
        setupColumns();

        if (shouldBuildBreadCrumbs()) {
            buildApiBreadcrumbs();
        }

        filterControl = $('#api-filter input.search');
        if (filterControl.length > 0) {
            filterControl.on('keyup', function () { filter(); });
        }
    }
});