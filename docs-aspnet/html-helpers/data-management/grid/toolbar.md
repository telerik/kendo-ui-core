---
title: Toolbar
page_title: Toolbar
description: "Learn how to configure the Toolbar of the Telerik UI Grid for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_toolbar
position: 10
---

# Toolbar

The [`ToolBar()`](/api/kendo.mvc.ui.fluent/gridtoolbarcommandfactory) configuration option of the Grid allows you to add command buttons and allow the user to invoke built-in Grid functionalities. You can also define custom commands or use templates to customize the Toolbar of the {{ site.product }} Grid.

## Built-In Commands

You can configure the Toolbar and include any of the built-in commands:

```HtmlHelper
    .ToolBar(toolbar=> {
        toolbar.Columns();
        toolbar.Create();
        toolbar.Save();
        toolbar.Paste();
        toolbar.Pdf();
        toolbar.Excel();
        toolbar.Search();
        toolbar.Spacer();
        toolbar.Separator();
    })
```
{% if site.core %}
```TagHelper
    <toolbar>
        <toolbar-button name="columns"></toolbar-button> 
        <toolbar-button name="create"></toolbar-button> 
        <toolbar-button name="save"></toolbar-button> 
        <toolbar-button name="paste"></toolbar-button>
        <toolbar-button name="pdf"></toolbar-button>
        <toolbar-button name="excel"></toolbar-button>
        <toolbar-button name="search"></toolbar-button>
        <toolbar-button name="spacer" type="spacer"></toolbar-button>
        <toolbar-button name="separator" type="separator"></toolbar-button>
    </toolbar>
```
{% endif %} 


| Command | Description | Resources|
|---|---|---|
| Columns | Displays a global column menu. | [Column menu documentation]({% slug columnmenu_aspnet_grid %}#global-column-menu) |
| Create | Adds an empty data item to the grid.| [Editing functionality documentation]({% slug htmlhelpers_grid_aspnetcore_editing_overview %}) |
| Save | Persists any data changes done by the end user.|[Editing functionality documentation]({% slug htmlhelpers_grid_aspnetcore_editing_overview %}) |
| Paste | Enables the built-in paste operations.| [Clipboard documentation]({% slug htmlhelpers_grid_clipboard %})|
| Pdf | Exports the grid data in PDF format.| [PDF Export documentation]({% slug pdfexport_gridhelper_aspnetcore %})|
| Excel | Exports the grid data in MS Excel format.| [Excel Export documentation]({% slug excelexport_gridhelper_aspnetcore %})|
| Search | Adds the built-in search panel for the Grid.| [Search Panel documentation]({% slug htmlhelpers_grid_aspnetcore_searchpanel %})|
| Spacer | Moves the tools that are declared after it to the right side of the ToolBar.| |
| Separator | Acts as a delimiter between the ToolBar commands.| |

## Custom Commands

The {{site.product}} Grid supports adding custom commands to it's Toolbar.

The following example demonstrates how to add a custom command to the Toolbar:
```HtmlHelper
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
{% if site.core %}
```TagHelper
    <toolbar>
        <toolbar-button name="customCommand" text="Click me"></toolbar-button> 
    </toolbar>

    <script>
    $(document).ready(function(){
        $(".k-grid-customCommand").click(function (e) {
            e.preventDefault();
            alert('click')
            //add custom command logic here
        });
    })
    </script>
```
{% endif %} 


## Toolbar Template

The {{site.product}} Grid also supports using a template for the Toolbar. You can define a template by using the [`ClientTemplate()`](/api/kendo.mvc.ui.fluent/gridtoolbarcommandfactory#clienttemplatesystemstring) or the [`ClientTemplateid()`](/api/kendo.mvc.ui.fluent/gridtoolbarcommandfactory#clienttemplateidsystemstring) configuration options.{% if site.core %} For TagHelper Grid configuration use the `client-template` or `client-template-id` properties.
{% endif %} 

```HtmlHelper
    .ToolBar(toolbar => {
        toolbar.ClientTemplateId("GridToolbarTemplate");
    })
```
{% if site.core %}
```TagHelper
    <toolbar client-template-id="GridToolbarTemplate">
    </toolbar>
```
{% endif %} 

When you use a Toolbar Template, and you also want to use a built-in command, then add the markup for the desired command. The following example demonstrates how to add the `Pdf` and `Search` commands to the Toolbar Template.

```HtmlHelper
    <script id="GridToolbarTemplate" type="text/x-kendo-template">
        <div class="refreshBtnContainer">
            <a href="\\#" class="k-pager-refresh k-link k-button k-button-solid-base k-button-solid k-button-rectangle k-button-md k-rounded-md k-button-icon" title="Refresh"><span class="k-icon k-i-reload"></span></a>
        </div>
        
        <a role="button" class="k-button k-button-solid-base k-button-solid k-button-rectangle k-button-md k-rounded-md k-button-icontext k-grid-pdf" href="\\#"><span class="k-icon k-i-file-pdf"></span>Export to PDF</a>
        
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
{% if site.core %}
```TagHelper
    <script id="GridToolbarTemplate" type="text/html">
        <div class="refreshBtnContainer">
            <a href="\\#" class="k-pager-refresh k-link k-button k-button-solid-base k-button-solid k-button-rectangle k-button-md k-rounded-md k-button-icon" title="Refresh"><span class="k-icon k-i-reload"></span></a>
        </div>
        
        <a role="button" class="k-button k-button-solid-base k-button-solid k-button-rectangle k-button-md k-rounded-md k-button-icontext k-grid-pdf" href="\\#"><span class="k-icon k-i-file-pdf"></span>Export to PDF</a>
        
        <div class="toolbar">
            <label class="category-label" for="category">Show products by category:</label>
            <kendo-dropdownlist name="categories" style="width:150px"
                                datatextfield="CategoryName"
                                datavaluefield="CategoryId"
                                option-label="All"
                                auto-bind="false"
                                on-change="categoriesChange"
                                is-in-client-template="true">
                <datasource type="DataSourceTagHelperType.Custom">
                    <transport>
                        <read url="@Url.Action("ToolbarTemplate_Categories", "Grid")" />
                    </transport>
                </datasource>
            </kendo-dropdownlist>
        </div>
        
        <span class="k-textbox k-grid-search k-display-flex">
            <input autocomplete="off" placeholder="Search..." title="Search..." class="k-input">
            <span class="k-input-icon"><span class="k-icon k-i-search"></span></span>
        </span>
    </script>
```
{% endif %} 

As of {{site.product}} `R3 2023 SP1` release you can use the [Template component]({% slug htmlhelpers_overview_template %}) to define custom ToolBar commands, alongside the default ToolBar commands.

The following example demonstrates how you can add a Button and DropDownList components to the Grid's Toolbar, along with a default `Excel` command demonstrated in the [{{site.product}} Grid Toolbar Template Demo](https://demos.telerik.com/{{site.platform}}/grid/toolbar-template).

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .ToolBar(toolbar=> {
            toolbar.Custom().ClientTemplate(
                Html.Kendo().Template().AddComponent(c=>c
                    .Button()
                    .Name("refresh")
                    .Icon("arrow-rotate-cw")
                    .HtmlAttributes(new {title="Refresh"})
                    .Events(ev=>ev.Click("refresh"))
                ));
            toolbar.Spacer();
            toolbar.Custom().ClientTemplate(
                Html.Kendo().Template()
                .AddHtml("<label class=\"category-label\" for=\"category\">Show products by category:</label>")
                .AddComponent(c => c
                    .DropDownList()
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
                ));
            toolbar.Separator();
            toolbar.Excel();
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="500">
        <toolbar>
            <toolbar-button>
                <toolbar-command-template>
                    <kendo-button name="iconButton" icon="arrow-rotate-cw" on-click="refresh">
                    </kendo-button>
                </toolbar-command-template>
            </toolbar-button>
            <toolbar-button name="spacer" type="spacer" />
            <toolbar-button>
                <toolbar-command-template>
                    <label class="category-label" for="category">Show products by category:</label>
                    <kendo-dropdownlist name="categories" style="width:150px"
                                        datatextfield="CategoryName"
                                        datavaluefield="CategoryID"
                                        option-label="All"
                                        auto-bind="false"
                                        on-change="categoriesChange">
                        <datasource type="DataSourceTagHelperType.Custom">
                            <transport>
                                <read url="@Url.Action("ToolbarTemplate_Categories", "Grid")" />
                            </transport>
                        </datasource>
                    </kendo-dropdownlist>
                </toolbar-command-template>
            </toolbar-button>
            <toolbar-button name="separator" type="separator" />
            <toolbar-button name="excel" />
        </toolbar>
    </kendo-grid>
```
{% endif %} 
```JavaScript
    <script>
        function refresh() {
            var grid = $("#grid").data("kendoGrid");
            grid.dataSource.read();
        }
        function categoriesChange() {
            var value = this.value(),
                grid = $("#grid").data("kendoGrid");

            if (value) {
                grid.dataSource.filter({ field: "CategoryID", operator: "eq", value: parseInt(value) });
            } else {
                grid.dataSource.filter({});
            }
        }
    </script>
```

{% if site.mvc %}
### Server-side rendering of the ToolBar Template

Rendering of the Toolbar on the server is supported by using the [`.Template()`](/api/kendo.mvc.ui.fluent/gridtoolbarcommandfactory#templatesystemaction) configuration. The following example demonstrates how to define a server-side ToolBar Template.

```HtmlHelper
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("grid")
    .ToolBar(toolbar =>
    {
        toolbar.Template(@<text>
            <div class="refreshBtnContainer">
                <a href="\\#" class="k-pager-refresh k-link k-button k-button-solid-base k-button-solid k-button-md k-rounded-md" title="Refresh"><span class="k-button-icon k-icon k-i-reload"></span></a>
            </div>
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
                        )
                        </div>
        </text>);
    })
```
```JavaScript
    <script>
        $(document).ready( function () {
            var grid = $("#grid");
            grid.find(".k-grid-toolbar").on("click", ".k-pager-refresh", function (e) {
                e.preventDefault();
                grid.data("kendoGrid").dataSource.read();
            });

        });

        function categoriesChange() {
            var value = this.value(),
                grid = $("#grid").data("kendoGrid");

            if (value) {
                grid.dataSource.filter({ field: "CategoryID", operator: "eq", value: parseInt(value) });
            } else {
                grid.dataSource.filter({});
            }
        }
    </script>
```
```CSS
    <style>
        #grid .k-grid-toolbar
        {
            padding: .6em 1.3em .6em .4em;
        }
        .category-label
        {
            vertical-align: middle;
            padding-right: .5em;
        }
        #category
        {
            vertical-align: middle;
        }
        .refreshBtnContainer {
            display: inline-block;
        }
        .k-grid .toolbar {
            margin-left: auto;
            margin-right: 0;
        }
    </style>
```

{% endif %}

## See Also
* [Batch Editing of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing)
* [PopUp Editing of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-popup)
* [Excel Export of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/excel-export)
* [PDF Export of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/pdf-export)
