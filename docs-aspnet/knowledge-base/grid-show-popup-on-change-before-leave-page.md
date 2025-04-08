---
title: Show Confirmation Popup When User Leaves the Page with Unsaved Grid Changes
description: Learn how to detect changes in an InLine editable Telerik UI for {{ site.framework }} Grid and prompt the user before leaving unsaved changes.
type: how-to
page_title: Show Confirmation Popup When User Leaves the Page with Unsaved Grid Changes
slug: grid-show-popup-on-change-before-leave-page
tags: grid, inline, editing, detect, unsaved, change, popup, dialog, prompt, user, confirmation, core, mvc, telerik
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>2024.4.1112</td>
 </tr>
</table>

## Description

How can I detect changes in an InLine editable Grid when the user tries to leave the page and prompt the user with a warning message about the unsaved changes?

## Solution

To detect the changes in the Grid when the user attempts to navigate away from the page with the Grid, you can check whether there has been a change in the Grid's DataSource. If at least one change occurs, show the prompt.

1. Handle the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event" target="_blank">`beforeunload` event</a> of the current window.
1. Get a reference to the Grid and access its DataSource.
1. Check the `dirty` flag of the data items, which indicates that the data item has been changed.
1. Show the popup if at least one change occurs.

```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .Editable(editable => editable.Mode(GridEditMode.InLine))
       ...//  Additional configuration.
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <kendo-grid name="grid">
        <editable mode="inline"/>
        <!-- Additional configuration-->
    </kendo-grid>
```
{% endif %}
```JS script
    $(document).ready(function () {
        $(window).bind("beforeunload", function (event) {
            var gridDS = $('#grid').getKendoGrid().dataSource; // Access the Grid's DataSource.
            if (dataSourceHasChanges(gridDS)) {
                return "You have unsaved changes. Are you sure you want to leave this page?"; // Show the popup.
            }
        });
    });

    function dataSourceHasChanges(ds) { // Check the Grid's DataSource for changes.
        var dirty = false;
        $.each(ds.data(), function () {
            if (this.dirty == true) {
                dirty = true;
            }
        });
        return dirty;
    }
```

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
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/aspnet-core/api/taghelpers/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
