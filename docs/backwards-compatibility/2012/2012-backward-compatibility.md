---
title: Kendo UI 2012 Breaking Changes
page_title: Kendo UI 2012 Breaking Changes | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2012."
slug: breakingchanges2012_kendoui
---

# Kendo UI 2012 Breaking Changes

## Kendo UI 2012 Q3 SP1

### Changes from 2012 Q3 (2011.3.1114)

#### Breaking Changes

* **Cascading ComboBoxes/DropDownLists:** The parameterMap of the child widget's dataSource is called before the change event of the parent widget.
Use [cascade](/api/javascript/ui/combobox#cascade) event instead of change event.

* Telerik UI for ASP.NET MVC: Remove Slide effect. Use SlideIn instead.

## Kendo UI 2012 Q3

### Changes from 2012 Q2 SP1 (2011.2.913)

#### Breaking Changes

* **Mobile:** the kendoMobileSwipe plugin is obsolete - replace its usage with the **touch** widget.

* **Mobile:** WebKit mask icons are now deprecated and font icons are used instead. If you have custom icons, they might break after the upgrade.
Add the following CSS rule to fix them /if you have data-icon="custom" on them, or use .km-icon to remove all non-custom icons/:

```
        .km-root .km-pane .km-view .km-custom {
            background-size: 100% 100%;
            -webkit-background-clip: border-box;
            background-color: currentcolor;
        }

        .km-root .km-pane .km-view .km-custom:after,
        .km-root .km-pane .km-view .km-custom:before
        {
            visibility: hidden;
        }
```

Additionally it should be noted that the mask icons used **background-color** for colorization, while the font ones use **color**
and custom colorization (but not on custom icons) **should be updated** after the upgrade. For example a rule like this:

```
        .km-ios .km-tabstrip .km-icon {
            background-color: rgb(20, 30, 40);
        }
```

should be changed to this:

```
        .km-ios .km-tabstrip .km-icon {
            color: rgb(20, 30, 40);
        }
```

* **DataViz:** Widgets now require theme-specific stylesheets. For example:

```
        <link href="styles/kendo.dataviz.min.css" rel="stylesheet" />
```

if using the Default skin, should be updated to:

```
        <link href="styles/kendo.dataviz.min.css" rel="stylesheet" />
        <link href="styles/kendo.dataviz.default.min.css" rel="stylesheet" />
```

* **DataViz:** missingValues defaults to "zero" for area, stacked area and stacked line series. The previous default was "gap" which can lead to incorrect results.

## Kendo UI 2012 Q2

### Changes from 2012 Q1 SP1 (2012.1.322)

#### Breaking Changes

*  **All Widgets:** All arrows have been renamed to better reflect their direction and size. For instance:

Old rendering:

```
	.k-arrow-up
	.k-arrow-next
	.k-arrow-down
	.k-arrow-prev
	.k-arrow-first
	.k-arrow-last
```

New rendering:

```
	.k-i-arrow-n
	.k-i-arrow-e
	.k-i-arrow-s
	.k-i-arrow-w
 	.k-i-seek-w
	.k-i-seek-e
```

For more information check the [Styling Icons demo](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

*  **Popup:** Popup based widgets nested in other Popup based widgets create their Popup container inside the Popup parent. This means that a DropDownList created inside an already initialized Menu will create its list inside the Menu item's parent Popup.

*  **TreeView:** The TreeView widget now depends on kendo.data.js

*  **TreeView:** Using the API methods will re-create the HTML of the nodes. In order to get the new reference to the nodes, use the return value of the methods.

Old rendering:

```
     var foo = treeviewObject.findByText("foo");
     treeviewObject.append(foo);
     // starting with 2012 Q2, foo will point to a DOM node that is removed from the document
     foo.text("bar: foo");
```

New rendering:

```
     var foo = treeviewObject.findByText("foo");
     foo = treeviewObject.append(foo);
      foo.text("bar: foo");
```

* **DataViz:** Refresh() no longer invokes Read() of the DataSource.

Old rendering:

```
    var chart = $("#chart").data("kendoChart");
    chart.refresh();
```

New rendering:

```
   var chart = $("#chart").data("kendoChart");
   chart.dataSource.read();
```

## Kendo UI 2012 Q1 (2012.1.322)

### Changes from 2011 Q3 SP1 (2011.3.1407)

#### Breaking Changes

> **Important**
>
> The combined JavaScript file `kendo.all.js` is available only in the Kendo Complete package. The corresponding file in Kendo Web is called `kendo.web.js`. Use it instead of `kendo.all.js`.

*  **Data:** `kendo.model.js` file has been removed. The content of kendo.model.js file has been consolidated with the kendo.data.js content.
*  **Data:** `Model.id` is no longer a function. It is a field.

Old rendering:

```
	var model = dataSource.get(42);
	var modelId = model.id(); //42
```

New rendering:

```
	var model = dataSource.get(42);
	var modelId = model.id; //42
```

*  **Data:** The `DataSource` contains ObservableObject instances instead of raw JavaScript objects.

*  **Grid:** The Grid widget is now using the `uid` field of the Model instead of the `id`. A new uid field is introduced to the DataSource's Model, which represents its unique id. The Grid row data attribute has been changed to use this field. Note that in order to retrieve Model instance by its uid, DataSource's `getByUid` method should be used.

Old rendering:

```
	<tr data-id="42"><!--...--></tr>
```

New rendering:

```
	<tr data-uid=”aaaaa-bbbbb-ddddd-gggg”><!--...--></tr>
```

*  **DataViz:** The kendo.chart(.min).js file is replaced by kendo.dataviz(.min).js

*  **DataViz:** The axis orientation property deprecated in favor of dedicated verticalLine and verticalArea chart types

*  **DataViz:** The suite now requires kendo.dataviz.css to be included

*  **DataViz:** The Chart widget is now in the kendo.dataviz.ui namespace. Previously it was part of kendo.ui

*  **Other:** `dataValueField` and `dataTextField` of DropDownList, ComboBox and AutoComplete, are set to empty string by default. In order to get your old code working, you will need to list the fields manually, like this:

Old rendering:

```
	$("#combobox").kendoComboBox([
		{text: "Item 1", value: "item1"},
		{text: "Item 2", value: "item2"}
	]);
```
New rendering:

```
	$("#combobox").kendoComboBox({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: [
			{text: "Item 1", value: "item1"},
			{text: "Item 2", value: "item2"}
		]
	});
```

## See Also

Other articles on Kendo UI breaking changes and backwards compatibility:

* [Kendo UI 2016 Breaking Changes]({% slug breakingchanges2016_kendoui %})
* [Kendo UI 2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [Kendo UI 2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [Kendo UI 2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
