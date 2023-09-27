---
title: Prevent Grid Popup Editor from Closing on Update and Create
page_title: Prevent Grid Popup Editor from Closing on Update and Create
description: Learn how to keep the Telerik UI for {{ site.framework }} Grid popup editor open after an update is finished.
slug: grid-prevent-popup-close-on-edit
tags: grid, edit, popup, prevent, cancel, stop, close, edit, insert, create, modal, reopen, keep, open
res_type: kb
component: grid
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.829 version</td>
 </tr>
</table>

## Description

How can I keep the popup editor of the {{ site.product }} Grid open after I update or insert a record?

## Solution

To achieve the desired scenario:

1. Handle the [`Edit`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#editsystemstring) event of the Grid and attach an event handler for the [`close`](/api/javascript/ui/window/events/close) event of the Popup window.
1. In the `close` handler, the [`e.preventDefault()`](https://api.jquery.com/event.preventdefault/) method will be called to prevent the popup from closing.
1. To allow the user to close the editor, set a `preventCloseOnSave` flag when the **Cancel** and **Close** buttons are clicked.
1. Contrary to the previous step, subscribe to the [`Save`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#savesystemstring) event of the Grid and reset the flag.

```Index.cshtml
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModelGridPopUp>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName);
        columns.Bound(p => p.UnitPrice).Width(100);
        columns.Bound(p => p.UnitsInStock).Width(100);
        columns.Bound(p => p.Discontinued).Width(100);
        columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
    })
    .ToolBar(toolbar => toolbar.Create())
    .Editable(editable => editable.Mode(GridEditMode.PopUp))
    .Pageable()
    .Sortable()
    .Scrollable()
    .Events(ev => {
        ev.Edit("onEdit");
        ev.Save("onSave");
    })
    .HtmlAttributes(new { style = "height:430px;" })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Model(model => model.Id(p => p.ProductID))
        .Create(update => update.Action("EditingPopup_Create", "Grid"))
        .Read(read => read.Action("EditingPopup_Read", "Grid"))
        .Update(update => update.Action("EditingPopup_Update", "Grid"))
        .Destroy(update => update.Action("EditingPopup_Destroy", "Grid"))
    )
)
```
```Script.js
    <script type="text/javascript">
        var preventCloseOnSave = false;

        function onSave(e) {
            preventCloseOnSave = true;
        }
        var onWindowEditClose = function (e) {
            if (preventCloseOnSave) {
                e.preventDefault();
                preventCloseOnSave = false;
            }
        };

        function onEdit(e) {
             var editWindow = e.container.data("kendoWindow");
             editWindow.unbind("close");
             editWindow.bind("close", onWindowEditClose);

            $(".k-grid-cancel").on("mousedown", function (e) {

                preventCloseOnSave = false;
                editWindow.close();
            });
        }
    </script>
```

## More {{ site.framework }} Grid Resources
* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)
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
* [Telerik REPL: Prevent Grid Popup Editor from Closing on Update and Create](https://netcorerepl.telerik.com/QxYXQKbI285l2ekv51)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)