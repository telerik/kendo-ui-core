---
title: 2012 Releases  
page_title: 2012 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2012."
previous_url: /backwards-compatibility/2012/2012-backward-compatibility
slug: breakingchanges2012_kendoui
position: 6
---

# 2012 Releases

## Kendo UI 2012 Q3 SP1

### Changes from 2012 Q3 (2011.3.1114)

#### Breaking Changes

**Cascading ComboBoxes/DropDownLists**

The `parameterMap` of the child widget dataSource is called before the `change` event of the parent widget. Use the [`cascade`](/api/javascript/ui/combobox#cascade) event instead of the `change` event.

**Telerik UI for ASP.NET MVC**

Removed the Slide effect. Use SlideIn instead.

## Kendo UI 2012 Q3

### Changes from 2012 Q2 SP1 (2011.2.913)

#### Breaking Changes

**Mobile**

* The `kendoMobileSwipe` plugin is obsolete. Replace its usage with the **touch** widget.

* The WebKit mask icons are now deprecated and font icons are used instead. If you have custom icons, they might break after the upgrade. If you have `data-icon="custom"` on them or use `.km-icon` to remove all non-custom icons, add the following CSS rule to fix them:

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

    Additionally, the mask icons have to use **background-color** for colorization, while the font ones use **color**  and custom colorization (but not on custom icons) **have to be updated** after the upgrade. For example, a rule like this:

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

**DataViz**

* Widgets now require theme-specific stylesheets.

    ```
        <link href="styles/kendo.dataviz.min.css" rel="stylesheet" />
    ```

    If using the Default skin, the above snippet should be updated to:

    ```
        <link href="styles/kendo.dataviz.min.css" rel="stylesheet" />
        <link href="styles/kendo.dataviz.default.min.css" rel="stylesheet" />
    ```

* The `missingValues` defaults to `"zero"` for Area, Stacked Area and Stacked Line series. The previous default was `"gap"` which can lead to incorrect results.

## Kendo UI 2012 Q2

### Changes from 2012 Q1 SP1 (2012.1.322)

#### Breaking Changes

**All Widgets**

All arrows have been renamed to better reflect their direction and size. For example:

```tab-Old
	.k-arrow-up
	.k-arrow-next
	.k-arrow-down
	.k-arrow-prev
	.k-arrow-first
	.k-arrow-last
```
```tab-New
	.k-i-arrow-n
	.k-i-arrow-e
	.k-i-arrow-s
	.k-i-arrow-w
 	.k-i-seek-w
	.k-i-seek-e
```

For more information, refer to the [demo on styling icons](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

**Popup**

Popup-based widgets nested in other Popup-based widgets create their Popup container inside the Popup parent. This means that a DropDownList created inside an already initialized Menu will create its list inside the parent Popup of the Menu item.

**TreeView**

* The TreeView widget now depends on `kendo.data.js`.

* Using the API methods will re-create the HTML of the nodes. To get the new reference to the nodes, use the `return` value of the methods.

    ```tab-Old
         var foo = treeviewObject.findByText("foo");
         treeviewObject.append(foo);
         // starting with 2012 Q2, foo will point to a DOM node that is removed from the document
         foo.text("bar: foo");
    ```
    ```tab-New
         var foo = treeviewObject.findByText("foo");
         foo = treeviewObject.append(foo);
          foo.text("bar: foo");
    ```

**DataViz**

`Refresh()` no longer invokes `Read()` of the DataSource.

    ```tab-Old
        var chart = $("#chart").data("kendoChart");
        chart.refresh();
    ```
    ```tab-New
       var chart = $("#chart").data("kendoChart");
       chart.dataSource.read();
    ```

## Kendo UI 2012 Q1 (2012.1.322)

### Changes from 2011 Q3 SP1 (2011.3.1407)

#### Breaking Changes

> **Important**
>
> The combined `kendo.all.js` JavaScript file is available only in the Kendo UI Complete package. The corresponding file in Kendo UI Web is called `kendo.web.js`. Use it instead of `kendo.all.js`.

**Data**

* The `kendo.model.js` file has been removed. The content of the `kendo.model.js` file has been consolidated with the `kendo.data.js` content.
* `Model.id` is no longer a function. It is a field.

    ```tab-Old
    	var model = dataSource.get(42);
    	var modelId = model.id(); //42
    ```
    ```tab-New
    	var model = dataSource.get(42);
    	var modelId = model.id; //42
    ```

*  The `DataSource` contains `ObservableObject` instances instead of raw JavaScript objects.

**Grid**

The Grid widget is now using the `uid` field of the Model instead of the `id`. A new `uid` field is introduced to the DataSource Model, which represents its unique id. The Grid row data attribute has been changed to use this field. To retrieve a Model instance by its `uid`, the `getByUid` method of the DataSource should be used.

```tab-Old
	<tr data-id="42"><!--...--></tr>
```
```tab-New
	<tr data-uid=”aaaaa-bbbbb-ddddd-gggg”><!--...--></tr>
```

**DataViz**

* The `kendo.chart(.min).js` file is replaced by `kendo.dataviz(.min).js`.

* The axis orientation property is now deprecated in favor of the dedicated `verticalLine` and `verticalArea` Chart types.

* The suite now requires `kendo.dataviz.css` to be included.

* The Chart widget is now in the `kendo.dataviz.ui` namespace. Previously, it was part of `kendo.ui`.

**Other**

The `dataValueField` and `dataTextField` configurations of the DropDownList, ComboBox, and AutoComplete are set to empty string by default. To revert to the previous behavior, list the fields manually:

```tab-Old
	$("#combobox").kendoComboBox([
		{text: "Item 1", value: "item1"},
		{text: "Item 2", value: "item2"}
	]);
```
```tab-New
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

* [2017 Breaking Changes]({% slug breakingchanges2017_kendoui %})
* [2016 Breaking Changes]({% slug breakingchanges2016_kendoui %})
* [2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
