---
title: 2014 Releases
page_title: 2014 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2014."
previous_url: /backwards-compatibility/2014/2014-backward-compatibility
slug: breakingchanges2014_kendoui
position: 4
---

# 2014 Releases

## Kendo UI 2014 Q3 SP1

### Changes from 2014 Q3 (2014.3.1119)

#### Breaking Changes

**Kendo UI Mobile Material Skins**

To sync with the other mobile themes, the Material themes are renamed to **material-light** and **material-dark**.

## Kendo UI 2014 Q3

### Changes from 2014 Q2 SP2 (2014.2.1008)

#### Breaking Changes

**DataSource**

The DataSource wraps the data items as `kendo.data.ObservableObject` on demand when paging is enabled (`pageSize` is set). In previous versions, all data items were wrapped initially. This change will affect people using the private `_data` field of the data source as they will now get items that are not instances of `kendo.data.ObservableObject`. In such cases, use the `data()` method instead.

**Mobile ListView**

All configuration options for text customization are nested in a `messages` object.

```tab-Old
    $("#listview").kendoMobileListView({
        dataSource: dataSource,
        template: kendo.template($("#tmp").html()),
        loadMore: true,
        pullToRefresh: true,
        loadMoreText: "Press to load more",
        pullTemplate: "Pull to refresh",
        releaseTemplate: "Release to refresh",
        refreshTemplate: "Refreshing"
    });
```
```tab-New
    $("#listview").kendoMobileListView({
        dataSource: dataSource,
        template: kendo.template($("#tmp").html()),
        loadMore: true,
        pullToRefresh: true,
        messages: {
            loadMoreText: "Press to load more",
            pullTemplate: "Pull to refresh",
            releaseTemplate: "Release to refresh",
            refreshTemplate: "Refreshing"
        }
    });
```

**Mobile Scroller**

All configuration options for text customization are nested in a `messages` object.

```tab-Old
    $("#scroller").kendoMobileScroller({
        pullToRefresh: true,
        pullTemplate: "Pull to refresh",
        releaseTemplate: "Release to refresh",
        refreshTemplate: "Refreshing"
    });
```
```tab-New
    $("#scroller").kendoMobileScroller({
        pullToRefresh: true,
        messages: {
            pullTemplate: "Pull to refresh",
            releaseTemplate: "Release to refresh",
            refreshTemplate: "Refreshing"
        }
    });
```

**Editor**

Because of security precautions, scripts are no longer posted to the server by default. To allow scripts to be posted to the server, set the [`serialization.scripts` configuration option](/api/javascript/ui/editor#configuration-serialization.scripts) to `true`. Note that for true protection from cross-site scripting, you still need server-side sanitization, as noted in the [preventing cross-site scripting](/web/editor/preventing-xss) help topic.

```tab-Old
	$("#editor").kendoEditor();
```
```tab-New
  // if you need scripts to be posted to the server
	$("#editor").kendoEditor({
		serialization: {
			scripts: true
		}
	});
```

**PivotDataSource**

The measure aggregator of the [client pivot cube](/api/javascript/data/pivotdatasource#configuration-schema.cube) uses **objects** instead of numbers for the `state` argument. The field you should set to accumulate the value is called `accumulator`.

```tab-Old
	aggregate: function(value, state) { return value + state; }
```
```tab-New
  // if you need scripts to be posted to the server
	aggregate: function(value, state) {
		state.accumulator = state.accumulator || 0;
		return state.accumulator + value;
	}
```

## Kendo UI 2014 Q2

### Changes from 2014 Q1 SP2 (2014.1.528)

#### Breaking Changes

**TabStrip**

* The Kendo UI Q2 2014 release introduces an additional TabStrip wrapper `div` which verifies that the changes in the height of the TabStrip will not affect the page scrolling position.

* The `activate` event of the TabStrip has been renamed to [`show`](/api/javascript/ui/tabstrip#events-show) and fires at the beginning of the open animation. A new [`activate`](/api/javascript/ui/tabstrip#events-activate) event has been introduced and is fired at the end of the open animation. This is done for consistency with the rest of the widgets.

* The TabStrip automatically calls [`kendo.resize`](/api/javascript/kendo#methods-resize) to its contents in both [`show`](/api/javascript/ui/tabstrip#events-show) and [`activate`](/api/javascript/ui/tabstrip#events-activate) events.

**TreeView**

The deprecated `checkboxTemplate` configuration option has been removed. If you do not need a highly specific checkbox template, consider using the default one (using `checkboxes: true`). For custom checkbox rendering, use the `checkboxes.template` option:

```tab-Old
    $("#tree").kendoTreeView({
        checkboxTemplate: "..."
    });
```
```tab-New
    $("#tree").kendoTreeView({
        checkboxes: {
            template: "..."
        }
    });
```

**Editor**

The deprecated `formatBlock` and `style` tools have been removed. See the 2013 Q2 release notes below on how to migrate to the `formatting` tool.

**Editor for ASP.NET MVC**

The ImageBrowser controller now works with the `FileBrowserEntry` and `FileBrowserEntryType` types instead of the `ImageBrowserEntry` and `ImageBrowserEntryType` ones. This change is related to the introduction of the new FileBrowser tool.

## Kendo UI 2014 Q1 SP2 (2014.1.528)

### Changes from 2014 Q1 SP1 (2014.1.416)

#### Breaking Changes

**Grid**

Clicking on an input, link, or button no longer triggers the selection.

**ListView**

Clicking on an input, link, or button no longer triggers the selection.

## Kendo UI 2014 Q1

### Changes from 2013 Q3 SP2 (2013.3.1324)

#### Breaking Changes

**Flat Theme**

The button background is now grey. To revert to the previous behavior, use the `.k-primary` class.

**Kendo UI Web mobile skins**

The new skins for the mobile widgets in Kendo UI Web are **not compatible** with the Kendo UI Mobile platform themes and shouldn't be used together. However, you can style your app with them if you do not include any of the Kendo UI Mobile styling (even the common CSS)&mdash;`kendo.[skin-name].mobile.min.css` includes everything needed.

## See Also

Other articles on Kendo UI breaking changes and backwards compatibility:

* [2017 Breaking Changes]({% slug breakingchanges2017_kendoui %})
* [2016 Breaking Changes]({% slug breakingchanges2016_kendoui %})
* [2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
* [2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})
