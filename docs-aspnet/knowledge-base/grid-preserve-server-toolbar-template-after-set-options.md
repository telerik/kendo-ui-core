---
title: Preserve Server Toolbar Template when Persisting Grid Options
page_title: Preserve Server Toolbar Template when Persisting Grid Options
description: "Preserve the server toolbar template of the {{ site.product }} Grid after calling the setOptions() method."
previous_url: /helpers/data-management/grid/how-to/state/grid-preserve-server-toolbar-template-after-set-options, /html-helpers/data-management/grid/how-to/state/grid-preserve-server-toolbar-template-after-set-options
slug: howto_preserveservertemplateaftersetoptions_gridaspnetmv
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I preserve the server toolbar template of the Grid when using the [`setOptions()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method to persist the current Grid settings?

## Solution

You have to preserve the server toolbar template of the Grid because of the existing limitations of the [`setOptions()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method.

1. Define the Grid and the template:

    ```HtmlHelper
    @using Kendo.Mvc.UI
    @using Telerik.Examples.Mvc.Areas.GridPreserveServerToolbarTemplateAfterSetOptions.Models

    @helper ToolbarTemplate()
    {
        <a class="k-button k-grid-add" href="/Home/Read?grid-mode=insert"><span class="k-icon k-font-icon k-i-add"></span>Add</a>
        <button class="k-button k-grid-excel"><span class="k-icon k-font-icon k-i-excel"></span>Export to Excel</button>
        <button class="k-button k-grid-pdf"><span class="k-icon k-font-icon k-i-pdf"></span>Export to PDF</button>
        <a class="k-button savesetting" href="/"><span></span>Save Settings</a>
        <a class="k-button loadsetting" href="/"><span></span>Load Settings</a>
        @(Html.Kendo().DropDownList()
            .Name("ExampleEditor")
            .OptionLabel("- ExampleEditor -")
            .DataTextField("Text")
            .DataTextField("Value")
            .BindTo(new List<dynamic>() {
                new {Text = "Item 1", Value= "1"},
                new {Text = "Item 2", Value= "2"}
            })
        )
    }

    @helper HeaderTemplate()
    {
        <span>My Template</span>
    }

    <script type="text/x-kendo-template" id="toolbarTemplate">
    @Html.Raw(@ToolbarTemplate().ToHtmlString().Replace("#", "\\#").Replace("</scr", "<\\/scr"))
    </script>

    <script type="text/x-kendo-template" id="headerTemplate">
    @Html.Raw(@HeaderTemplate().ToHtmlString().Replace("#", "\\#").Replace("</scr", "<\\/scr"))
    </script>

    @(Html.Kendo().Grid<Order>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.OrderID).HeaderTemplate(@<text>@HeaderTemplate()</text>);
            columns.Bound(p => p.OrderDescription);
            columns.Bound(p => p.OrderDate).Format("{0:d}");
            columns.Bound(p => p.OrderTotal).Format("{0:c}");
            columns.Bound(p => p.IsCompleted);
            columns.Command(c =>
            {
                c.Edit();
                c.Destroy();
            });
        })
        .ToolBar(toolbar =>
        {
            toolbar.Template(@<text>@ToolbarTemplate()</text>);
        })
        .HtmlAttributes(new { style="height: 500px;" })
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .Pageable()
        .Sortable()
        .Scrollable()
        .Filterable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model =>
            {
                model.Id(p => p.OrderID);
                model.Field(p => p.OrderID).Editable(false);
            })
            .Create(create => create.Action("Create", "Home"))
            .Destroy(destroy => destroy.Action("Delete", "Home"))
            .Read(read => read.Action("Read", "Home"))
            .Update(update => update.Action("Update", "Home"))
        )
    )
    ```

1. Handle the `click` events of the toolbar buttons to persist the current Grid settins:

    ```JS
        $("#grid").on("click", ".savesetting", function (e) {
            var grid = $(this).closest("[data-role=grid]").data("kendoGrid");
            e.preventDefault();
            localStorage["settings"] = kendo.stringify(grid.getOptions());
        });

        $("#grid").on("click", ".loadsetting", function (e) {
            var grid = $(this).closest("[data-role=grid]").data("kendoGrid");
            e.preventDefault();
            var options = localStorage["settings"];
            if (options) {
                var parsedOptions = JSON.parse(options);
                parsedOptions.toolbar = [
                    { template: $("#toolbarTemplate").html() }
                ];
                parsedOptions.columns[0].headerTemplate = $("#headerTemplate").html();
                grid.setOptions(parsedOptions);
                // Evaluate the scripts of any components nested in the toolbar and deferred.
                eval($("#toolbar-nested-components-script").html());
            }
        });
    ```

To review the complete example, refer to the [project on how to preserve the server toolbar template of the Grid](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridPreserveServerToolbarTemplateAfterSetOptions).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)


