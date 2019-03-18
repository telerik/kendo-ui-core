---
title: Hidden Containers
page_title: jQuery Grid Documentation | Hidden Container | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to handle the most common scenarios when initializing it in a hidden container."
slug: hidden_containers_kendoui_grid_widget
position: 4
---

# Hidden Containers

If you initialize a scrollable Grid with a set height inside a hidden container, the Grid will not adjust its vertical layout correctly.

For example, when you apply scrolling, virtual scrolling, or locked columns and initialize the Grid in a hidden container, its vertical layout will not be correctly adjusted because the JavaScript size calculations do not work for elements with a `display:none` style. For more information on the supported scroll modes by the Grid, refer to the [section on scrolling]({% slug scrolling_kendoui_grid_widget %}).

You can identify that the Grid is initialized in a hidden state if any of the following symptoms occur:
* The Grid appears smaller than expected.
* The scrollable data area overflows the bottom border of the Grid.
* The vertical scrollbar is not visible even though [virtual scrolling]({% slug virtual_scrolling_kendoui_grid_widget %}) is enabled.
* Frozen columns are too narrow and non-frozen columns are not visible.

To handle the behavior that is related to the initialization of the Grid inside a hidden container, use any of the following approaches:
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

## See Also

* [Scroll Modes of the Grid]({% slug scrolling_kendoui_grid_widget %})
* [Initializing the Grid inside the PanelBar]({% slug initialize_thegrid_panelbar_widget %})
* [Initializing the Grid inside the TabStrib]({% slug initialize_thegrid_tabstrip_widget %})
* [Initializing the Grid inside the Window]({% slug initialize_thegrid_window_widget %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
