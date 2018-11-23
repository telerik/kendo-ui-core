var API_CATEGORIES = ['configuration', 'fields', 'methods', 'events', 'class methods', 'properties', 'constructor parameters'];
var NESTED_ELEMENT_MARK = '.';
var COLUMNS_STYLE_CLASS_NAME = 'columns';
var API_SUBPAGE_TITLE = 'related-properties';
var MAX_NESTING_LEVEL = 10000;
var DEFAULT_COLUMN_COUNT = 3;
var MINIMUM_CHILDREN_COUNT = 6;
var COLUMN_HEIGHT_TOLLERANCE = 40;
var filterControl = null;
var previousSearch = "";

function getApiCategoryAndIndex(values) {
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

function findApiCategoryIndexFromPath(path) {
    var startIndex = -1;
    $.each(API_CATEGORIES, function (index, value) {
        startIndex = path.indexOf(value.toLowerCase());
        if (startIndex > -1) {
            return false;
        }
    });

    return startIndex;
}

function capitalizeSingle(value) {
    var newValue = '';
    $.each(value.split(/ |-/), function (index, item) {
        if (index > 0) {
            newValue += ' ';
        }
        newValue += item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    });
    return newValue;
}

function capitalize(values) {
    for (var i = 0; i < values.length; i++) {
        values[i] = capitalizeSingle(values[i]);
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
    var startIndex = getApiCategoryAndIndex(values).index;
    var breadcrumbs = values.slice(startIndex - 1, values.length - 1);
    capitalize(breadcrumbs);
    var pagePartsCount = separatePageParts(values, breadcrumbs);
    categoryInfo = getApiCategoryAndIndex(breadcrumbs);

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

            var list = tocContainer.children('ul:first-of-type');
            var windowHeight = $(window).outerHeight();
            var footerHeight = $("#feedback-section").outerHeight() + $("footer").outerHeight();
            var listTop = list.offset().top - $(window).scrollTop();
            list.css('max-height', windowHeight - listTop - footerHeight);
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
    var path = decodeURI($(location).attr('pathname')).split('/');
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

        href = href.replace(' ', '-');
        var linkText = i === 0 ? data.public_name : breadcrumb;
        links += '<a href="' + href.toLowerCase() + '">' + linkText + '</a>';
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
                href = lastHref + '#' + item.replace(' ', '-').toLowerCase();
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

function getPrefix(item, prefixes) {
    var result = '';
    var searchedItem = item.toLowerCase();
    $.each(prefixes, function (index, prefix) {
        if (searchedItem === prefix.toLowerCase()) {
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
        var category = API_CATEGORIES[i].replace(' ', '-');
        setupColumnsInternal(category, category, 0);
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
            var newPath = hash.replace('#', '/').replace('-', '/').toLowerCase();
            window.location.replace(window.location.origin + window.location.pathname.replace('.html', '') + newPath);
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

function filterControlKeydown(e) {
    var which = e.which;
    var target = $(e.target);

    if(which === 13){//Enter
        if(target.hasClass('focused-field')){
            target.attr('target', '_blank');

            setTimeout(function(){
                $(target).removeAttr('target');
            }, 1);
        } else {
            $('.focused-field').focus();
        }
    }else if(which === 40){//Arrow Down
        e.preventDefault();
        selectNextAnchor(true);
    }else if(which === 38){//Arrow Up
        e.preventDefault();
        selectNextAnchor(false);
    }
}

function selectFirstAnchor(ul) {
    var nextUl = ul;
    var parent = nextUl.find('li:not(.hide-api-link)').first();
    var anchor = parent.find('a');

    $('.focused-field').removeClass('focused-field');
    setTimeout(function(){
        anchor.addClass('focused-field');
        anchor.focus();
    });
}

function selectNextAnchor(dir) {
    var links = $("#page-article li:not('.hide-api-link') a");
    var index = links.index($(".focused-field"));

    if(dir){
        index++;
    }else{
        index--;
    }

    if(index >= 0 && index < links.length){
        $('.focused-field').removeClass('focused-field');
        $(links[index]).addClass('focused-field');
        $(links[index]).focus();
    }
}

function attachToApiPageEvents() {
    filterControl = $('#api-filter input.search');
    if (filterControl.length) {
        filterControl.on('keyup', function () { filter(); });
        $(window).on('keydown', function (e) { filterControlKeydown(e) });
        $('#page-article h2').on('click', function(e){
            var nextUl = $(e.target).parent().next('ul');

            selectFirstAnchor(nextUl);
        });

        if(location.href.indexOf('#')===-1){
            filterControl.focus();
        }
    }
    breadcrumbDropDown = $('.links-container > a');
    if (breadcrumbDropDown.length) {
        breadcrumbDropDown.mouseenter(function (e) {
            e.preventDefault();
            $('.links-container').children('ul').hide();

            var dropDownContent = $(this).next('ul');
            if (dropDownContent.length) {
                dropDownContent.css('left', dropDownContent.position().left + $(this).position().left);
                if (dropDownContent.is(':hidden')) {
                    dropDownContent.show();
                } else {
                    dropDownContent.hide();
                }
                dropDownContent.mouseleave(function () {
                    $(this).hide();
                });
            }
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
    var searchedApiReferenceControl = decodeURI(window.location.pathname).toLowerCase();
    var startIndex = searchedApiReferenceControl.indexOf('api/javascript');
    var endIndex = findApiCategoryIndexFromPath(searchedApiReferenceControl);
    searchedApiReferenceControl = searchedApiReferenceControl.substring(startIndex, endIndex - 1);
    $.each(data, function (index, dataItem) {
        if (searchedApiReferenceControl === dataItem.control) {
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
            if (!$('#markdown-toc').length) {
                buildApiBreadcrumbs(getDataForCurrentPage(data));
            }
            buildToc();
            attachToApiPageEvents();
        }
    });
});
