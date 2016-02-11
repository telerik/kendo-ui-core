---
title: Kendo UI 2014 Breaking Changes
page_title: Kendo UI 2014 Breaking Changes | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2014."
slug: breakingchanges2014_kendoui
---

# Kendo UI 2014 Breaking Changes

## Kendo UI 2014 Q3 SP1

### Changes from 2014 Q3 (2014.3.1119)

#### Breaking Changes

* **Kendo UI Mobile Material skins**: The Material themes are renamed to **material-light** and **material-dark** in order to sync with the other mobile themes.

## Kendo UI 2014 Q3

### Changes from 2014 Q2 SP2 (2014.2.1008)

#### Breaking Changes

**DataSource**

The DataSource wraps the data items as `kendo.data.ObservableObject` on demand when paging is enabled (`pageSize` is set). In previous versions all data items were wrapped initially.
This change will affect people using the private `_data` field of the data source as they will now get items that are not instances of `kendo.data.ObservableObject`. In such cases the `data()` method should be used instead.

**Mobile ListView**

* All text customization configuration options are nested in a `messages` object

Old rendering:

```
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
New rendering:

```
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

* All text customization configuration options are nested in a `messages` object

Old rendering:

```
    $("#scroller").kendoMobileScroller({
        pullToRefresh: true,
        pullTemplate: "Pull to refresh",
        releaseTemplate: "Release to refresh",
        refreshTemplate: "Refreshing"
    });
```

New rendering:

```
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

* Due to security precautions, scripts are no longer posted to the server by default. If you need to allow scripts to be posted to the server, set the [serialization.scripts configuration option]() to `true`. Note that for true protection from cross-site scripting, you still need server-side sanitization, as noted in the [preventing cross-site scripting](/web/editor/preventing-xss) help topic.

Old rendering:

```
	$("#editor").kendoEditor();
```

New rendering (if you need scripts to be posted to the server):

```
	$("#editor").kendoEditor({
		serialization: {
			scripts: true
		}
	});
```

**PivotDataSource**

* The measure aggregator of the [client pivot cube](/api/javascript/data/pivotdatasource#configuration-schema.cube) uses **object** instead of number for the `state` argument. The field that should be set to accumulate the value is called `accumulator`.

Old rendering:

```
	aggregate: function(value, state) { return value + state; }
```

New rendering (if you need scripts to be posted to the server):

```
	aggregate: function(value, state) {
		state.accumulator = state.accumulator || 0;
		return state.accumulator + value;
	}
```

#### Breaking Changes

## Kendo UI 2014 Q2

### Changes from 2014 Q1 SP2 (2014.1.528)

#### Breaking Changes

**TabStrip**:

* Q2 2014 introduces an additional TabStrip wrapper div which makes sure that the TabStrip changes in height won't affect the page scrolling position.

* TabStrip's **activate** event has been renamed to [**show**](/api/javascript/ui/tabstrip#events-show) event - which fires at the beginning of the open animation. A new [**activate**](/api/javascript/ui/tabstrip#events-activate) event has been introduced, which is fired at the end of the open animation. This is done for consistency with the rest of the widgets.

* TabStrip automatically calls [**kendo.resize**](/api/javascript/kendo#methods-resize) to its contents in both [**show**](/api/javascript/ui/tabstrip#events-show) and [**activate**](/api/javascript/ui/tabstrip#events-activate) events.

**TreeView**: The deprecated `checkboxTemplate` configuration option has been removed. If you don't need a highly specific checkbox template, consider using the default one (using checkboxes: true).

If you need any custom checkbox rendering, use the checkboxes.template option:

Old rendering:

```
    $("#tree").kendoTreeView({
        checkboxTemplate: "..."
    });
```

New rendering:

```
    $("#tree").kendoTreeView({
        checkboxes: {
            template: "..."
        }
    });
```

**Editor**: The deprecated **formatBlock** and **style** tools have been removed. See the 2013 Q2 release notes below on how to migrate to the **formatting** tool.

**Editor for ASP.NET MVC**: The ImageBrowser controller now works with `FileBrowserEntry` and `FileBrowserEntryType` types, instead of `ImageBrowserEntry` and `ImageBrowserEntryType`.
This change is related to the introduction of the new FileBrowser tool.

## Kendo UI 2014 Q1 SP2 (2014.1.528)

### Changes from 2014 Q1 SP1 (2014.1.416)

#### Breaking Changes

* **Grid**: Clicking on an input, link or button no longer triggers the selection.

* **ListView**: Clicking on an input, link or button no longer triggers the selection.

## Kendo UI 2014 Q1

### Changes from 2013 Q3 SP2 (2013.3.1324)

#### Breaking Changes

* **Flat Theme**: Button background is now gray. The previous outcome can be achieved using **.k-primary** class.

* **Kendo UI Web mobile skins**: The new skins for the mobile widgets in Kendo UI Web are **not compatible** with the Kendo UI Mobile platform themes and shouldn't be used together. However,
you can style your app with them if you don't include any of the Kendo UI Mobile styling (even the common CSS) - **kendo.[skin-name].mobile.min.css** includes everything needed.

## See Also

Other articles on Kendo UI breaking changes and backwards compatibility:

* [Kendo UI 2016 Breaking Changes]({% slug breakingchanges2016_kendoui %})
* [Kendo UI 2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [Kendo UI 2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
* [Kendo UI 2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})
