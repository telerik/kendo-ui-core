---
title: Toolbar
page_title: Toolbar
description: "Learn how to configure the Toolbar of the Telerik UI Grid for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_toolbar
position: 15
---

# ToolBar

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

In the 2025 Q2 release an alternative way to configure the tools has been implemented. It relies on the `Items` configuration of the Grid toolbar:

```HtmlHelper
    .ToolBar(toolbar =>toolbar
        .Items(itm=>{
            itm.Edit();
            itm.Update();
            itm.CancelEdit();
            itm.Destroy();
            itm.Search();
            itm.Excel();
            itm.Sort();
            itm.Filter();
            itm.ColumnChooser();
            itm.Group().ReorderButtons(true);
            itm.Pdf();
        })
        .Overflow(overflow => overflow
            .Mode(ToolBarOverflowMode.Scroll)
            .ScrollButtons(ScrollButtonsType.Visible)
            .ScrollButtonsPosition(ScrollButtonsPositionType.Split)
        )
    )
```

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
| Group | Allows grouping the data from the ToolBar tool. | [Grouping tool documentation]({% slug adaptive_tools_gridhelper_aspnetcore %}#grouping) |
| Sort | Displays a sort tool. | [Sorting tool documentation]({% slug adaptive_tools_gridhelper_aspnetcore %}#sorting) |
| Filter | Allows column filtering from the ToolBar tool. | [Filtering tool documentation]({% slug adaptive_tools_gridhelper_aspnetcore %}#filtering) |

### Overflow

The built-in Toolbar provides properties for customizing its overflow behavior and appearance.

The following example demonstrates how to modify the default overflow settings of the Toolbar through the `Oveflow()` configuration.

```Razor
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("grid")
            .ToolBar(toolbar => toolbar
                .Items(itm =>
                {
                    itm.Create();
                    itm.Edit();
                    itm.Destroy();
                    itm.Separator();
                    itm.Filter();
                    itm.Sort();
                    itm.Group();
                    itm.Spacer();
                    itm.ColumnChooser();
                })
            )
            .Overflow(o => o
               .Mode(ToolBarOverflowMode.Scroll)
               .ScrollButtons(ScrollButtonsType.Auto)
               .ScrollButtonsPosition(ScrollButtonsPositionType.Start)
               .ScrollDistance(50))
            )
            ... // Additional configuration.
         )
```
{% if site.core %}
```TagHelper
<kendo-grid name="grid">
    <toolbar>
        <toolbar-button name="create"></toolbar-button>
        <toolbar-button name="edit"></toolbar-button>
        <toolbar-button name="destroy"></toolbar-button>
        <toolbar-button name="separator"></toolbar-button>
        <toolbar-button name="filter"></toolbar-button>
        <toolbar-button name="sort"></toolbar-button>
        <toolbar-button name="group"></toolbar-button>
        <toolbar-button name="spacer" type="spacer" />
        <toolbar-button name="columnChooser"></toolbar-button>
    </toolbar>
    <!-- Additional configuration. -->
</kendo-grid>
```
{% endif %} 

For more information on the available overflow options, refer to the [Appearance documentation of the ToolBar component]({% slug toolbar_appearance %}).

## Disable Inactive Tools

Starting with 2025 Q2 release the Grid component provides the possibility to disable or hide the inactive tools when editing. By default the inactive tools will be hidden. When the `ToolBar.ShowInactiveTools` option is enabled the inactive tools will be displayed as disabled.
In the example below, the inactive buttons will be disabled until a change in the Grid data is made:

The following example demonstrates how to add a custom command to the Toolbar:
```HtmlHelper
    @(Html.Kendo().Grid<MyApplication1.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns => {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(140);
            columns.Bound(p => p.UnitsInStock).Width(140);
            columns.Bound(p => p.Discontinued).Width(100);
            columns.Command(command => command.Destroy()).Width(150);
        })
        .ToolBar(toolbar =>toolbar
            .Items(itm =>
            {
                itm.Create();
                itm.Edit();
                itm.Destroy();
                itm.Separator();
                itm.Filter();
                itm.Sort();
                itm.Group();
                itm.Spacer();
                itm.ColumnChooser();
            })
            .ShowInactiveTools(true)
            .Overflow(overflow => overflow
                .Mode(ToolBarOverflowMode.Scroll)
                .ScrollButtons(ScrollButtonsType.Visible)
                .ScrollButtonsPosition(ScrollButtonsPositionType.Split)
            )
        )
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        //additional configuration omitted for brevity
    )
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <toolbar show-inactive-tools="false">
            <toolbar-button name="create"></toolbar-button>
            <toolbar-button name="edit"></toolbar-button>
            <toolbar-button name="destroy"></toolbar-button>
            <toolbar-button name="separator"></toolbar-button>
            <toolbar-button name="filter"></toolbar-button>
            <toolbar-button name="sort"></toolbar-button>
            <toolbar-button name="group"></toolbar-button>
            <toolbar-button name="spacer" type="spacer" />
            <toolbar-button name="columnChooser"></toolbar-button>
        </toolbar>
        <editable mode="incell"/>
    </kendo-grid>
```
{% endif %} 

## Custom Commands

The Toolbar of the Grid component supports custom commands.

The following example demonstrates how to add a custom command to the Toolbar:
```HtmlHelper
    .ToolBar(toolbar=> {
        toolbar.Custom().Text("Click me").HtmlAttributes(new { id = "customCommand" });
    })

    <script>
    $(document).ready(function(){
        $("#customCommand").on("click", function(event) {
            alert('Custom command is clicked.');
            // Add the custom command logic here.
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
        $(".k-grid-customCommand").on("click", function(event) {
            alert('Custom command is clicked.');
            // Add the custom command logic here.
        });
    })
    </script>
```
{% endif %} 

If you are using the `Toolbar.Items` configuration (available since the Q2 2025 release), you can add a custom command as shown below:

```HtmlHelper
    .ToolBar(toolbar =>toolbar
        .Items(itm=>{
            itm.Excel();
            itm.Pdf();
            itm.Custom().ClientTemplate(
                Html.Kendo().Template().AddComponent(c => c
                    .Button()
                    .Name("refresh")
                    .Icon("arrow-rotate-cw")
                    .HtmlAttributes(new { title = "Refresh" })
                ));
        })
    )
```

## Toolbar Template

The Grid also supports using a template for the Toolbar. {% if site.core %}You can define the template as a string or an [external Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external), load it through a partial view, or return its content using a JavaScript function.{% else %}You can define the template as a string or return its content using a JavaScript function.{% endif %} For more information on the available template options, refer to the [`ToolBar()`](/api/kendo.mvc.ui.fluent/gridtoolbarcommandfactory) API.

{% if site.core %}
The following example shows how to create a template for the Toolbar using an [external Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external).

```HtmlHelper
    .ToolBar(toolbar => {
        toolbar.ClientTemplateId("GridToolbarTemplate");
    })
```
```TagHelper
    <toolbar client-template-id="GridToolbarTemplate">
    </toolbar>
```
```JS GridToolbarTemplate
    <script id="GridToolbarTemplate" type="text/x-kendo-template">
        <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Custom command</button>
    </script>
```
{% else %} 
The following example shows how to create a template for the Toolbar using the `ClientTemplateHandler()` option, which returns an [external Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external).

```HtmlHelper
    .ToolBar(toolbar => {
        toolbar.ClientTemplateHandler("getToolbarTemplate");
    })
```
```JS
    <script id="GridToolbarTemplate" type="text/x-kendo-template">
        <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Custom command</button>
    </script>

    <script>
        function getToolbarTemplate(data) {
            var template = $("#GridToolbarTemplate").html();
            return template;
        }
    </script>
```
{% endif %}

### Built-In and Custom Commands in the Toolbar Template

To use the built-in commands in the Toolbar template, add the `HTML` markup of the respective command. 

The following example demonstrates how to add the built-in `Pdf` and `Search` commands together with custom commands to the Toolbar template.

```HtmlHelper
    <script id="GridToolbarTemplate" type="text/x-kendo-template">
        <div class="refreshBtnContainer">
            @(Html.Kendo().Button()
                .Name("refresh")
                .Icon("arrow-rotate-cw")
                .ToClientTemplate()
            )
        </div>
        
        <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-button-icontext k-grid-pdf" href="\\#"><span class="k-icon k-i-file-pdf"></span>Export to PDF</a>
        
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
            <kendo-button name="refresh" icon="arrow-rotate-cw" is-in-client-template="true">
            </kendo-button>
        </div>
        
        <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-button-icontext k-grid-pdf" href="\\#"><span class="k-icon k-i-file-pdf"></span>Export to PDF</a>
        
        <div class="toolbar">
            <label class="category-label" for="category">Show products by category:</label>
            <kendo-dropdownlist name="categories" style="width:150px" is-in-client-template="true"
                datatextfield="CategoryName"
                datavaluefield="CategoryId"
                option-label="All"
                auto-bind="false"
                on-change="categoriesChange">
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

Starting with version R3 2023 SP1, you can use the [Template component]({% slug htmlhelpers_overview_template %}) to define custom Toolbar commands alongside the default ones. 

The following example demonstrates how you can add [Button]({% slug htmlhelpers_button_aspnetcore %}) and [DropDownList]({% slug htmlhelpers_dropdownlist_aspnetcore %}) components to the Grid's Toolbar, along with the default `Excel` command. For a live example, visit the [Toolbar Template Demo of the Grid](https://demos.telerik.com/{{site.platform}}/grid/toolbar-template).

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
                    <kendo-button name="refresh" icon="arrow-rotate-cw" on-click="refresh">
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
### Server-Side Rendering of the Toolbar Template

Rendering of the Toolbar on the server is supported by using the [`Template()`](/api/kendo.mvc.ui.fluent/gridtoolbarcommandfactory#templatesystemaction) configuration option.

The following example demonstrates how to define a server-side Toolbar template.

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
    ... // Additional configuration.
)
```
```JavaScript
    <script>
        $(document).ready(function() {
            var grid = $("#grid");
            grid.find(".k-grid-toolbar").on("click", ".k-pager-refresh", function (e) {
                e.preventDefault();
                grid.data("kendoGrid").dataSource.read();
            });
        });

        function categoriesChange() {
            var value = this.value(),
            grid = $("#grid").data("kendoGrid");

            if(value) {
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

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Toolbar Template of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-template)
* [Toolbar Columns Menu of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-columns-menu)
* [Server-Side API of the Grid HtmlHelper](/api/grid)
{% if site.core %}
* [Server-Side API of the Grid TagHelper](/api/taghelpers/grid)
{% endif %}
