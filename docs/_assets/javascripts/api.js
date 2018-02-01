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
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        values[i] = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    return values;
}

function separatePageParts(values, breadcrumbs) {
    var currentPageParts = values[values.length - 1].split('.');
    var previousLink = "";
    $.each(currentPageParts, function (index, pagePart) {
        previousLink += previousLink !== "" ? "." + pagePart : pagePart;
        breadcrumbs.push(previousLink);
    });

    return currentPageParts.length;
}

function getBreadcrumbsInfo(values) {
    var startIndex = findApiCategoryIndex(values).index;
    var breadcrumbs = values.slice(startIndex - 1, values.length - 1);
    capitalize(breadcrumbs);
    var pagePartsCount = separatePageParts(values, breadcrumbs);
    categoryInfo = findApiCategoryIndex(breadcrumbs);

    return {
        categoryIndex: categoryInfo.index,
        category: categoryInfo.category,
        breadcrumbs: breadcrumbs,
        nestingLevel: pagePartsCount
    };
}

function buildToc() {
    var tocContainer = $('.api-toc-container');
    if (tocContainer.length > 0) {
        var listItems = "";
        var headersCount = 0;
        $('h3').each(function () {
            headersCount++;
            var text = this.id === 'related-properties' ? 'Related Properties' : this.id;
            listItems += '<li class="api-toc-item"><a href="#' + this.id + '">' + text + '</a></li>';
        });

        if (headersCount > 1) {
            tocContainer.append('<div class="api-toc-title">In this article</div><ul>' + listItems + '</ul>');
        }
    }
}

function repeat(string, count) {
    var result = "";
    for (var i = 0; i < count; i++) {
        result += string;
    }

    return result;
}

function buildApiBreadcrumbs(data) {
    if ($('#markdown-toc').length > 0) {
        return;
    }

    var path = $(location).attr('pathname').split('/');
    var breadcrumbsInfo = getBreadcrumbsInfo(path);
    var breadcrumbs = breadcrumbsInfo.breadcrumbs;
    breadcrumbs = breadcrumbs.slice(0, breadcrumbs.length);

    var href = '';
    var lastHref = '';
    var links = '';
    var breadcrumbsContainer = $('.api-breadcrumbs-container');
    for (var i = 0; i < breadcrumbs.length; i++) {
        var backStepsCount = breadcrumbsInfo.categoryIndex - i + 1;
        var relativePathBackPath = backStepsCount >= 0 ? repeat("../", backStepsCount) : "";
        var breadcrumb = breadcrumbs[i];
        href = breadcrumb === breadcrumbsInfo.category ?
            lastHref + '#' + breadcrumb :
            relativePathBackPath + breadcrumb;

        links += '<a href="' + href.toLowerCase() + '">' + breadcrumb + '</a>';
        if (i > 0) {
            links += getBreadcrumbDropDownContent(data, breadcrumbsInfo, i - 1, lastHref);
        }
        lastHref = href;
    }

    breadcrumbsContainer.append('<div class="links-container">' + links + '</div>');
}

function getBreadcrumbDropDownContent(data, breadcrumbsInfo, nestingLevel, lastHref) {
    var dropDownContent = '<ul>';
    var items = [];
    var isApiCategory = nestingLevel === 0;
    if (isApiCategory) {
        var keys = API_CATEGORIES;
        $.each(capitalize(keys), function (index, key) {
            if (data.categories[key]) {
                items.push(key);
            }
        });
    } else {
        items = data.categories[breadcrumbsInfo.category];
    }

    var breadcrumbs = breadcrumbsInfo.breadcrumbs;
    var scopeFilter = breadcrumbs[nestingLevel] != breadcrumbsInfo.category ? breadcrumbs[nestingLevel] : false;
    for (var j = 0; j < items.length; j++) {
        var item = items[j];
        if (shouldAppendItemToDropDown(item, scopeFilter, nestingLevel, breadcrumbsInfo.nestingLevel)) {
            var href;
            if (isApiCategory) {
                href = lastHref + '#' + item.toLowerCase();
            } else {
                href = getPrefix(item, data.group_parents) + item;
            }
            var selectedDropDownClassName = breadcrumbs[nestingLevel + 1].toLowerCase() === item.toLowerCase() ? 'selected-dropdown-breadcrumb' : '';
            dropDownContent += '<li>' + '<a href="' + href.toLowerCase() + '" class="' + selectedDropDownClassName + '">' + item + '</li>';
        }
    }
    dropDownContent += '</ul>';
    return dropDownContent;
}

function getPrefix(item, prefixes){
    var result = '';
    $.each(prefixes, function (index, prefix) {
        if (item.indexOf(prefix) > -1) {
            result = prefix + '#';
            return false;
        }
    });

    return result;
}

function shouldAppendItemToDropDown(item, scopeFilteringItem, nestingLevel, maxNestingLevel) {
    var matchNestingLevel = item.split(NESTED_ELEMENT_MARK).length === nestingLevel;
    var isInContextScope = item.toLowerCase().indexOf(scopeFilteringItem) === 0;

    return nestingLevel === 0 ||
        (maxNestingLevel > nestingLevel && isInContextScope && matchNestingLevel) ||
        matchNestingLevel && (!scopeFilteringItem || (scopeFilteringItem && isInContextScope));
}

function getMinNestingLevel() {
    var minNestingLevel = MAX_NESTING_LEVEL;
    var linksSection = $('#' + API_SUBPAGE_TITLE);
    if (linksSection.length) {
        var list = $(linksSection[linksSection.length - 1]).next('ul');
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

    var subCategory = $('#page-article > article').attr('class');
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

function getApiSectionIndex(hash) {
    hash = hash.toLowerCase();
    var sectionIndex = -1;
    $.each(API_CATEGORIES, function (index, element) {
        sectionIndex = hash.indexOf("#" + element);
        if (sectionIndex > -1) {
            return false;
        }
    });

    return sectionIndex;
}

function ensureCorrectNavigation() {
    var hash = window.location.hash;
    var dashIndex = hash.indexOf('-');
    if (hash !== "" && dashIndex > -1) {
        var hashIndex = getApiSectionIndex(hash);
        if (hashIndex > -1 && hashIndex < dashIndex) {
            var newPath = hash.replace('#', '/').replace('-', '/');
            window.location.replace(window.location.origin + window.location.pathname + newPath);
            return true;
        }
    }

    return false;
}

function updateActiveTocItem(headings) {
    var fixedHeaderHeight = $("#page-header").height();
    var scrollOffset = $(document).scrollTop() + fixedHeaderHeight;
    var heading = headings.filter(function () {
        return $(this).offset().top + this.offsetHeight - scrollOffset > 0;
    }).first();

    if (heading.length) {
        $('a').removeClass('active-toc-item');
        $('[href="#' + heading.attr('id') + '"]').addClass('active-toc-item');
    }
}

function attachToApiPageEvents() {
    filterControl = $('#api-filter input.search');
    if (filterControl.length) {
        filterControl.on('keyup', function () { filter(); });
    }

    breadcrumbDropDown = $('.links-container > a');
    if (breadcrumbDropDown.length && breadcrumbDropDown.next('ul').length) {
        breadcrumbDropDown.mouseenter(function (e) {
            e.preventDefault();
            $('.links-container').children('ul').hide();

            var dropDownContent = $(this).next('ul');
            dropDownContent.css('left', dropDownContent.position().left + $(this).position().left);
            if (dropDownContent.is(':hidden')) {
                dropDownContent.show();
            } else {
                dropDownContent.hide();
            }

            dropDownContent.mouseleave(function () {
                $(this).hide();
            });
        });
    }

    var headingAnchors = $('h3');
    var apiContainer = $('.api-toc-container');
    if (apiContainer.length) {
        updateActiveTocItem(headingAnchors);
        $(window).scroll(function () {
            updateActiveTocItem(headingAnchors);
        });
    }
}

function getDataForCurrentPage(data) {
    var dataItemForPage;
    $.each(data, function (index, dataItem) {
        if (window.location.pathname.indexOf(dataItem.control)) {
            dataItemForPage = dataItem;
            return false;
        }
    });

    return dataItemForPage;
}

$(document).ready(function () {
    $.get("/kendo-ui/api.json", function (data) {
        if (!ensureCorrectNavigation()) {
            setupColumns();
            buildApiBreadcrumbs(getDataForCurrentPage(data));
            buildToc();
            attachToApiPageEvents();
        }
    });
});