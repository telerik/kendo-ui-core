---
title: Height
page_title: jQuery Grid Documentation | Height | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to apply different heights to the widget."
slug: height_kendoui_grid_widget
position: 1
---

# Height

By default, the Grid has no set height and expands to fit all table rows.

## Setting the Height

> Set the height to the Grid only when its scrolling is enabled. For more information on the supported scroll modes by the Grid, refer to the [section on scrolling]({% slug scrolling_kendoui_grid_widget %}).  

To set the height of the Grid, use any of the following approaches:
* Apply an inline height style to the `<div>` from which the Grid is initialized.
* Use the `height` property of the widget which will apply an inline style to the Grid wrapper&mdash;the same as the previous option.
* Use external CSS. For example, use the ID or the `.k-grid` CSS class to apply a height style.

When the height of the Grid is set, it calculates the appropriate height of its scrollable data area, so that the sum of the header rows, filter row, data, footer, and pager is equal to the expected height of the widget. That is why if you change the height of the Grid through JavaScript after you create the widget, you have to call the [`resize` method]({% slug responsivewebdesign_integration_kendoui %}) afterwards. In this way the Grid recalculates the height of its data area.

In specific scenarios you can set a height style to the scrollable data area either by using JavaScript or external CSS which is a `div.k-grid-content` element. In such cases avoid setting a height to the Grid.

**Figure 1: A Grid with a fixed height and scrolling functionality enabled**

![Kendo UI Grid for jQuery with Fixed Height and Scrolling](../grid3_1.png)

## Setting a Minimum Height

> Not applicable when virtual scrolling is enabled. For more information on the supported scroll modes by the Grid, refer to the [section on scrolling]({% slug scrolling_kendoui_grid_widget %}).

You can make the Grid expand and shrink vertically according to the number of its rows and yet within certain limits. To achieve this, apply a minimum and/or maximum height style to the scrollable data area and do not set any height of the Grid. If you use the MVC wrapper of the Grid, [remove the default data area height](http://docs.telerik.com/aspnet-mvc/helpers/grid/configuration#scrolling). Instead of the `GridID`, you can also use the `.k-grid` class to target all widget instances.

###### Example

    #GridID .k-grid-content
    {
        min-height: 100px;
        max-height: 400px;
    }

## Enabling Auto-Resizing

> Applicable to scrollable Grids only. For more information on the supported scroll modes by the Grid, refer to the [section on scrolling]({% slug scrolling_kendoui_grid_widget %}).

1. To allow the Grid resize together with its parent, apply a 100% height style to the [`<div class="k-grid">` wrapper of the widget]({% slug widgetwrapperandelement_references_gettingstarted %}). According to the web standards, elements which have their height set in percentage require that the height of their parent is also explicitly set. This requirement applies recursively until either an element with a pixel height or the `html` element is reached. Elements that are 100% high cannot have margins, paddings, borders, or sibling elements. That is why you have to remove the default border of the Grid as well.
1. Make sure that the inner layout of the Grid adapts to changes in the height of the `<div>` wrapper. If these changes are triggered by the resizing of the browser window, subscribe to the window `resize` event of the browser and execute the [`resize`]({% slug responsivewebdesign_integration_kendoui %}) method of the Grid. The `resize` method measures the height of the Grid `<div>` and adjusts the height of the scrollable data area.
  * If the Grid is placed inside a Kendo UI Splitter or Kendo UI Window, you do not need to call the `resize` method because these widgets will execute it automatically. Also, it is not necessary to apply the method if you use locked columns.
  * If the vertical space that is available for the Grid depends on a custom resizing of the layout, which is controlled by the user, use a suitable event or method related to the layout changes to execute the `resize` method of the Grid. In this case, call the `resize` method even if you use locked columns.

The `resize` method works for the Kendo UI versions after the Kendo UI Q3 2013 release. For earlier versions, instead of `resize`, use the following approach which practically functions in the same way. For more information, refer to the article on [how to resize the Grid when the window is resized]({% slug howto_resize_whenthe_windowis_resized_grid %}).

###### Example

    $(window).resize(function() {
        var gridElement = $("#GridID"),
            newHeight = gridElement.innerHeight(),
            otherElements = gridElement.children().not(".k-grid-content"),
            otherElementsHeight = 0;

        otherElements.each(function(){
            otherElementsHeight += $(this).outerHeight();
        });

        gridElement.children(".k-grid-content").height(newHeight - otherElementsHeight);
    });


## Configuring the Loading Indicator

Internally, the Grid uses the [`kendo.ui.progress`](/api/javascript/ui/ui/methods/progress) method to display a loading overlay during remote `read` requests. If scrolling is disabled, the overlay is displayed over the whole Grid. If scrolling is enabled, the overlay is displayed over the scrollable data area. If scrolling is enabled and the Grid has no set height, the data area will initially have a zero height, which will make the loading overlay invisible during the first remote request. To visualize the loading overlay, use either of the following approaches:
* Set the height of the Grid, or
* Apply the `min-height` style to the `div.k-grid-content` element.

For more information, refer to the [the example of setting the height within certain limits](#setting-limits-to-the-height). For more information on the supported scroll modes by the Grid, refer to the [section on scrolling]({% slug scrolling_kendoui_grid_widget %}).

## See Also

* [Scroll Modes of the Grid]({% slug scrolling_kendoui_grid_widget %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
