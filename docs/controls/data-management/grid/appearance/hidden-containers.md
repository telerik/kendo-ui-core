---
title: Hidden Containers
page_title: jQuery Grid Documentation | Hidden Container | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to handle the most common scenarios when initializing it in a hidden container."
slug: hidden_containers_kendoui_grid_widget
position: 5
---

# Hidden Containers

If you initialize a scrollable Grid with a set height inside a hidden container, the Grid is not able to adjust its vertical layout correctly.

For example, when you apply scrolling, virtual scrolling, or frozen columns and initialize the Grid in a hidden container, its vertical layout will not be correctly adjusted because the JavaScript size calculations do not work for elements with a `display:none` style.

## Erroneous Behavior

You can identify that the Grid is initialized in a hidden state if any of the following symptoms occur:

* The Grid appears smaller than expected.
* The scrollable data area overflows the bottom border of the Grid.
* The vertical scrollbar is not visible even though [virtual scrolling]({% slug walkthrough_kendoui_grid_widget%}#virtual-scrolling) is enabled.
* Frozen columns are too narrow and non-frozen columns are not visible.

## Solution

To handle the erroneous behavior of the Grid that is related to its initialization inside a hidden container, use any of the following approaches:

* Delay the initialization of the Grid or change the order in which various Kendo UI widgets are initialized, so that the Grid is initialized after its element becomes visible.
* Execute the [`resize`]({% slug responsivewebdesign_integration_kendoui %}#individual-widget-resizing) method of the Grid after the widget becomes visible.
* Instead of setting an overall height for the Grid in its configuration, define the height for the scrollable data area only. In this case, no height calculations are made. This approach is applicable only if frozen columns and virtual scrolling are _not_ used.

    ###### Example

    ```
      #GridID .k-grid-content
      {
          height: 270px;
      }
    ```

* Fetch the data source instead of calling the `resize()` method. This approach is applicable if virtual scrolling is enabled and the Kendo UI version is older than 2014.3.1119.

    ###### Example

    ```
    $("#GridID").data("kendoGrid").dataSource.fetch();
    ```

For more information on how to initialize the Grid inside other Kendo UI widgets which act as hidden containers, refer to the following articles:

* [Initialize the Grid inside the PanelBar]({% slug initialize_thegrid_panelbar_widget %})
* [Initialize the Grid inside the TabStrib]({% slug initialize_thegrid_tabstrip_widget %})
* [Initialize the Grid inside the Window]({% slug initialize_thegrid_window_widget %})

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
