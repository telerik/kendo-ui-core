---
title: Hidden Containers
page_title: Hidden Containers
description: "Learn how to prevent layout issues when the Telerik UI Grid for {{ site.framework }} initializes inside hidden containers."
components: ["grid"]
slug: hidden_containers_aspnetcore_grid
position: 4
---

# Hidden Containers

If you initialize a Grid inside a hidden container, the Grid may not adjust its layout correctly.

## Understanding Why the Issue Occurs

When you apply scrolling, virtual scrolling, or locked columns and initialize the Grid in a hidden container, the vertical layout can break. The JavaScript size calculations do not work for elements that use `display:none`. For more information about Grid scrolling, see [available scroll modes of the Grid HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_grid_aspnetcore_scrolling %}).

## Identifying Symptoms

You can identify that the Grid is initialized in a hidden state if any of the following symptoms occur:
* The Grid appears smaller than expected.
* The scrollable data area overflows the bottom border of the Grid.
* The vertical scrollbar is not visible even though [virtual scrolling]({% slug virtual_scrolling_aspnetcore_grid %}) is enabled.
* Frozen columns are too narrow and non-frozen columns are not visible.
* The pager may not appear or may be the smallest responsive pager instead of the full one.

## Applying Recommended Approaches

To handle the behavior that is related to the initialization of the Grid inside a hidden container, use any of the following approaches:
* Delay the initialization of the Grid or change the order in which various Kendo UI widgets are initialized, so that the Grid is initialized after its element becomes visible.
* Execute the Kendo UI for jQuery [`resize()`](https://docs.telerik.com/kendo-ui/api/kendo/methods/resize) method after the Grid becomes visible.
* Instead of setting an overall height for the Grid in its configuration, define the height for the scrollable data area only. In this case, no height calculations are made.

  >note This approach applies only when frozen columns and virtual scrolling are not enabled.

    ```css
      #GridID .k-grid-content
      {
          height: 270px;
      }
    ```

* Fetch the data source instead of calling the `resize()` method.

  >note This approach applies when virtual scrolling is enabled and the Kendo UI version is earlier than 2014.3.1119.

    ```js
    $("#GridID").data("kendoGrid").dataSource.fetch();
    ```

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Initializing the Grid HtmlHelper for {{ site.framework }} in a TabStrip component]({% slug grid-initialize-in-tabstrip %})
* [Scrolling by the Grid HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/virtualization-remote-data)
* [Scroll Modes of the Grid HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_grid_aspnetcore_scrolling %})
* [Server-Side API](/api/grid)
