---
title: Toolbar
page_title: Toolbar
description: "Learn how to configure the Toolbar of the Telerik UI Grid for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_toolbar
position: 10
---

# Toolbar

The [`ToolBar()`](/api/Kendo.Mvc.UI.Fluent/GridToolBarCommandFactory) configuration option of the Grid allows you to add command buttons and allow the user to invoke built-in Grid funcitionalities. You can also define custom commands or use templates to customize the Toolbar of the {{ site.product }} Grid.

## Built-In Commands

You can configure the Toolbar and include any of the built-in commands:
```
    .ToolBar(toolbar=> {
        toolbar.Create();
        toolbar.Save();
        toolbar.Pdf();
        toolbar.Excel();
        toolbar.Search();
    })
```

| Command | Description | Resources|
|---|---|---|
| Create | Adds an empty data item to the grid.| [Editing functionality documentation]({% slug htmlhelpers_grid_aspnetcore_editing_overview %}) |
| Save | Persists any data changes done by the end user.|[Editing functionality documentation]({% slug htmlhelpers_grid_aspnetcore_editing_overview %}) |
| Pdf | Exports the grid data in PDF format.| [PDF Export documentation]({% slug pdfexport_gridhelper_aspnetcore %})|
| Excel | Exports the grid data in MS Excel format.| [Excel Export documentation]({% slug excelexport_gridhelper_aspnetcore %})|
| Search | Adds the built-in search panel for the Grid.| [Search Panel documentation]({% slug htmlhelpers_grid_aspnetcore_searchpanel %})|

## Custom Commands

The {{site.product}} Grid supports adding custom commands to it's Toolbar.

The following example demonstrates how to add a custom command to the Toolbar:
```Razor
    .ToolBar(toolbar=> {
        toolbar.Custom().Text("Click me").HtmlAttributes(new { id = "customCommand" });
    })

    <script>
    $(document).ready(function(){
        $("#customCommand").click(function (e) {
            e.preventDefault();
            alert('click')
            //add custom command logic here
        });
    })
</script>
```

## Toolbar Template

The {{site.product}} Grid also supports using a template for the Toolbar. You can define a template by using the [`ClientTemplate()`](/api/Kendo.Mvc.UI.Fluent/GridToolBarCommandFactory#clienttemplatesystemstring) or the [`ClientTemplateId()`](/api/Kendo.Mvc.UI.Fluent/GridToolBarCommandFactory#clienttemplateidsystemstring) configuration options.

When you use a Toolbar Template, and you also want to use a built-in command, then add the markup for the desired command. The following example demonstrates how to add the `Pdf` and `Search` commands to the Toolbar Template demonstrated in the [{{site.product}} Grid Toolbar Template Demo](https://demos.telerik.com/{{site.platform}}/grid/toolbar-template).

```
    <script id="GridToolbarTemplate" type="text/x-kendo-template">
        <div class="refreshBtnContainer">
            <a href="\\#" class="k-pager-refresh k-link k-button k-button-icon" title="Refresh"><span class="k-icon k-i-reload"></span></a>
        </div>
        
        <a role="button" class="k-button k-button-icontext k-grid-pdf" href="\\#"><span class="k-icon k-i-file-pdf"></span>Export to PDF</a>
        
        <div class="toolbar">
            <label class="category-label" for="category">Show products by category:</label>
            @(Html.Kendo().DropDownList()
            .Name("categories")
            .OptionLabel("All")
            .DataTextField("CategoryName")
            .DataValueField("CategoryID")
            .AutoBind(false)
            .Events(e => e.Change("categoriesChange"))
            .HtmlAttributes(new { style = "width: 150px;" })
            .DataSource(ds =>
            {
                ds.Read("ToolbarTemplate_Categories", "Grid");
            })
            .ToClientTemplate()
        )
        </div>
        
        <span class="k-textbox k-grid-search k-display-flex">
            <input autocomplete="off" placeholder="Search..." title="Search..." class="k-input">
            <span class="k-input-icon"><span class="k-icon k-i-search"></span></span>
        </span>
    </script>
```

## See Also
* [Batch Editing of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing)
* [PopUp Editing of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-popup)
* [Excel Export of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/excel-export)
* [PDF Export of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/pdf-export)
