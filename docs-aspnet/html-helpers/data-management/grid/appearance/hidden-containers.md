---
title: Hidden Containers
page_title: Hidden Containers
description: "Get started with the Telerik UI Grid HtmlHelper for {{ site.framework }} and learn how to handle the most common scenarios when initializing it in a hidden container."
slug: hidden_containers_aspnetcore_grid
position: 4
---

# Hidden Containers

If you initialize a Grid inside a hidden container, the Grid may not adjust its layout correctly.

For example, when you apply scrolling, virtual scrolling, or locked columns and initialize the Grid in a hidden container, its vertical layout will not be correctly adjusted because the JavaScript size calculations do not work for elements with a `display:none` style. For more information on the supported scroll modes by the Grid, refer to the article on the [available scroll modes of the Grid HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_grid_aspnetcore_scrolling %}).

You can identify that the Grid is initialized in a hidden state if any of the following symptoms occur:
* The Grid appears smaller than expected.
* The scrollable data area overflows the bottom border of the Grid.
* The vertical scrollbar is not visible even though [virtual scrolling]({% slug virtual_scrolling_aspnetcore_grid %}) is enabled.
* Frozen columns are too narrow and non-frozen columns are not visible.
* The pager may not appear or may be the smallest responsive pager instead of the full one.

To handle the behavior that is related to the initialization of the Grid inside a hidden container, use any of the following approaches:
* Delay the initialization of the Grid or change the order in which various Kendo UI widgets are initialized, so that the Grid is initialized after its element becomes visible.
* Execute the Kendo UI for jQuery [`resize()`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/resize) method after the Grid becomes visible.
* Instead of setting an overall height for the Grid in its configuration, define the height for the scrollable data area only. In this case, no height calculations are made.

  > This approach is applicable only if frozen columns and virtual scrolling are not used.

    ```
      #GridID .k-grid-content
      {
          height: 270px;
      }
    ```

* Fetch the data source instead of calling the `resize()` method.

  > This approach is applicable if virtual scrolling is enabled and the Kendo UI version is older than 2014.3.1119.

    ```
    $("#GridID").data("kendoGrid").dataSource.fetch();
    ```

## See Also

* [Scrolling by the Grid HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/virtualization-remote-data)
* [Scroll Modes of the Grid HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_grid_aspnetcore_scrolling %})
* [Server-Side API](/api/grid)
