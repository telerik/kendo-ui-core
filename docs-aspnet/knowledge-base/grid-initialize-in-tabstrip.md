---
title: Initialize the Grid in a TabStrip
description: An example on how to integrate the Telerik UI for {{ site.framework }} Grid in a TabStrip component.
type: how-to
page_title: Initialize the Grid in a TabStrip
slug: grid-initialize-in-tabstrip
tags: grid, initialize, tabstrip
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid and {{ site.product }} TabStrip</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2024.2.514 version</td>
 </tr>
</table>

## Description

How can I display the Grid component in a specified tab of a TabStrip?

By design, when the Grid is initialized inside a hidden container, its layout may not be resized correctly. For example, when the Grid is integrated into the TabStrip component, the Grid initializes when the respective tab activates. For more information, refer to the [Grid in hidden containers article]({% slug hidden_containers_aspnetcore_grid %}).

## Solution

> You can apply the same approach when integrating the Grid into a PanelBar or Window components, which also act as hidden containers for the Grid.

1. Handle the `Activate` event of the TabStrip.
1. Get a reference to the Grid and call the [`resize()`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/resize) method when the Grid becomes visible.

    ```HtmlHelper
        @(Html.Kendo().TabStrip()
            .Name("tabStrip")
            .Events(e => e.Activate("onActivate"))
            ... // Other configuration.
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-tabstrip name="tabstrip" on-activate="onActivate">
            <!-- Other configuration -->
        </kendo-tabstrip>
    ```
    {% endif %}
    ```JS scripts
    <script type="text/javascript">
        function onActivate(e) {
            let activatedTab = $(e.item).attr("id"); // Get the "id" of the activated tab.
            if (activatedTab == "tabStrip-tab-2") { // For example, if the Grid is defined in the second tab, check if the tab is activated.
                $("#grid").getKendoGrid().resize(true); // Resize the Grid to fit the tab's container.
            }
        }
    </script>
    ```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Grid and TabStrip HtmlHelpers](https://netcorerepl.telerik.com/GIEhQebf12x2kz7200)
* [Sample code with the Grid and TabStrip TagHelpers](https://netcorerepl.telerik.com/moEhGyFJ16ICSoac38)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on displaying a Grid in a TabStrip component](https://netcorerepl.telerik.com/GIEhQebf12x2kz7200).
{% endif %}

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
