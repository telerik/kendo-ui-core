---
title: ToolBar
page_title: ToolBar
description: "Learn how to configure the ToolBar of the Telerik UI TreeList for {{ site.framework }}."
slug: htmlhelpers_treelist_aspnetcore_ToolBar
position: 10
---

# ToolBar

The [`ToolBar()`](/api/kendo.mvc.ui.fluent/gridtoolbarcommandfactory) configuration option of the TreeList lets you add command buttons that allow the user to invoke built-in TreeList functionalities, such as adding data items, saving changes, searching, and so on.

You can also define and add [custom commands](#custom-commands) to the TreeList's ToolBar, further expanding its functionality. To customize the appearance of the ToolBar, you can [utilize templates](#toolbar-template).

## Built-In Commands

You can configure the ToolBar and include any of the built-in commands:

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
| Create | Adds an empty data item to the TreeList.| [Editing functionality documentation]({% slug htmlhelpers_grid_aspnetcore_editing_overview %}) |
| Save | Persists any data changes done by the end user.|[Editing functionality documentation]({% slug htmlhelpers_grid_aspnetcore_editing_overview %}) |
| Paste | Enables the built-in paste operations.| [Clipboard documentation]({% slug htmlhelpers_grid_clipboard %})|
| Pdf | Exports the TreeList data in PDF format.| [PDF Export documentation]({% slug pdfexport_gridhelper_aspnetcore %})|
| Excel | Exports the TreeList data in MS Excel format.| [Excel Export documentation]({% slug excelexport_gridhelper_aspnetcore %})|
| Search | Adds the built-in search panel for the TreeList.| [Search Panel documentation]({% slug htmlhelpers_grid_aspnetcore_searchpanel %})|
| Spacer | Moves the tools that are declared after it to the right side of the ToolBar.| NA|
| Separator | Acts as a delimiter between the ToolBar Commands.| NA|

## Custom Commands

The {{site.product}} TreeList supports adding Custom Commands to its ToolBar. The following example demonstrates how to add a Custom Command to the ToolBar:

```HtmlHelper
    .Toolbar(t =>
    {
        t.Custom(Html.Kendo().Template().AddComponent(c => c.Button()
               .Name("refresh")
               .Icon("arrow-rotate-cw")
               .HtmlAttributes(new { title = "Refresh" })
               .Events(ev => ev.Click("refresh"))));
        t.Spacer();
        t.Search();
    })
```

[REPL example of a Custom Command in TreeList ToolBar HtmlHelper for {{ site.framework }}](https://netcorerepl.telerik.com/QSuzwllP56E6xUe252)

{% if site.core %}
```TagHelper
	<toolbar>
        <treelist-toolbar-button>
            <treelist-toolbar-command-template>
                <kendo-button name="iconButton" icon="arrow-rotate-cw" on-click="refresh"></kendo-button>
            </treelist-toolbar-command-template>
        </treelist-toolbar-button>
        <treelist-toolbar-button name="spacer" type="spacer" />
        <treelist-toolbar-button name="search" />
    </toolbar>
```

[REPL example of a Custom Command in TreeList ToolBar TagHelper for {{ site.framework }}](https://netcorerepl.telerik.com/wyupwblF57auW35034)
{% endif %} 

## ToolBar Template Handler

Telerik UI for {{ site.framework }} ToolBar introduces an overload that accept a `JavaScript` function name. It allows you to define the Template content through a client-side handler. This way, you can prevent the components from being dependent on the `unsafe-eval` and reuse the templates within multiple Components in different application pages.

```HtmlHelper
    <script id="toolbar-template" type="text/x-kendo-template">
         <button id="refresh"></button>
         <span class="k-spacer"></span>
         <div class="toolBar">
            <label class="position-label" for="position">Filter by position:</label>
              <input type="search" id="position" style="width: 150px"/>
            </div>
        </div>
    </script>

    <script>
        function toolbarTemplate() {
            return $("#toolbar-template").html();
        }
    </script>

    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .ToolbarTemplateHandler("toolbarTemplate")
        .Columns(columns =>
        {
            columns.Add().Field(f => f.FirstName).Width(250).Title("First Name");
            columns.Add().Field(e => e.LastName).Title("Last Name");
            columns.Add().Field(e => e.Position);
            columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}").Filterable(false);
        })
        .Height(540)
        .DataSource(dataSource => dataSource
            .ServerOperation(false)
            .Read(read => read.Action("All", "EmployeeDirectory"))
            .Model(m =>
            {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo);
                m.Field(f => f.FirstName);
                m.Field(f => f.LastName);
                m.Field(f => f.ReportsTo);
                m.Expanded(true);
            })
        )
    )

```

[REPL example of a ToolBar Template Handler in TreeList HtmlHelper for {{ site.framework }}](https://netcorerepl.telerik.com/wSYfwFvQ49nhSiCY33)

{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
	<script>

        $(document).ready(function () {

            $("#refresh-button").click(function(){
                kendo.alert('refresh btn clicked')
            })
        })

        function toolbarTemplate() {
            return "<button id='refresh-button'>Refresh</button>";
        }
    </script>

<kendo-treelist name="treelist" height="540">
    <toolbar client-template-handler="toolbarTemplate"></toolbar>
    <columns>
        <treelist-column field="FirstName" width="250px"></treelist-column>
        <treelist-column field="LastName" width="160px"></treelist-column>
        <treelist-column field="Position"></treelist-column>
        <treelist-column field="Phone" width="200px"></treelist-column>
        <treelist-column field="Extension" width="140px"></treelist-column>
        <treelist-column field="Address"></treelist-column>
    </columns>
    <filterable enabled="true"/>
    <sortable enabled="true"/>
    <pageable enabled="true" page-size="15" page-sizes-enabled="true"/>
    <treelist-datasource server-operation="false">
        <transport>
            <read url="@Url.Action("All","EmployeeDirectory")"/>
        </transport>
        <schema data="Data" total="Total" errors="Errors">
            <treelist-model id="EmployeeId" parent-id="ReportsTo" expanded="true">
                <fields>
                    <field name="EmployeeId" type="number"></field>
                    <field name="ReportsTo" nullable="true"></field>
                    <field name="FirstName" type="string"></field>
                    <field name="LastName" type="string"></field>
                </fields>
            </treelist-model>
        </schema>
    </treelist-datasource>
</kendo-treelist>
```

[REPL example of a ToolBar Template Handler in TreeList TagHelper for {{ site.framework }}](https://netcorerepl.telerik.com/mykJwvvm50n7B8QX41)

{% endif %} 

## ToolBar Template Id

Telerik UI for {{ site.framework }} ToolBar introduces an overload that accepts the Id of a script as an Id for the ToolBar Template for the TreeList.

```HtmlHelper
	<script id="toolBarTemplate" type="text/x-kendo-template">
         <button id="refresh"></button>
         <span class="k-spacer"></span>
         <div class="toolbar">
            <label class="position-label" for="position">Filter by position:</label>
              <input type="search" id="position" style="width: 150px"/>
            </div>
        </div>
    </script>

    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .ToolbarTemplateId("toolBarTemplate")
        .Columns(columns =>
        {
            columns.Add().Field(f => f.FirstName).Width(250).Title("First Name");
            columns.Add().Field(e => e.LastName).Title("Last Name");
            columns.Add().Field(e => e.Position);
            columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}").Filterable(false);
        })
        .Height(540)
        .DataSource(dataSource => dataSource
            .ServerOperation(false)
            .Read(read => read.Action("All", "EmployeeDirectory"))
            .Model(m =>
            {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo);
                m.Field(f => f.FirstName);
                m.Field(f => f.LastName);
                m.Field(f => f.ReportsTo);
                m.Expanded(true);
            })
        )
    )
```

[REPL example of a ToolBar Template Id in TreeList HtmlHelper for {{ site.framework }}](https://netcorerepl.telerik.com/GouTQFbG5298UmMT40)

{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

	<script id="toolbar-template" type="text/x-kendo-template">
         <button id="refresh"></button>
         <span class="k-spacer"></span>
         <div class="toolbar">
            <label class="position-label" for="position">Filter by position:</label>
              <input type="search" id="position" style="width: 150px"/>
            </div>
        </div>
    </script>
	
	<script>

        $(document).ready(function () {

            var treelist = $("#treelist").data("kendoTreeList");

            $("#refresh").kendoButton({
                icon: "arrow-rotate-cw",
                click: function () {
                    treelist.dataSource.read();
                }
            });
        })

    </script>

    <kendo-treelist name="treelist" height="540">
        <toolbar client-template-id="toolbar-template"></toolbar>
        <columns>
            <treelist-column field="FirstName" width="250px"></treelist-column>
            <treelist-column field="LastName" width="160px"></treelist-column>
            <treelist-column field="Position"></treelist-column>
            <treelist-column field="Phone" width="200px"></treelist-column>
            <treelist-column field="Extension" width="140px"></treelist-column>
            <treelist-column field="Address"></treelist-column>
        </columns>
        <filterable enabled="true"/>
        <sortable enabled="true"/>
        <pageable enabled="true" page-size="15" page-sizes-enabled="true"/>
        <treelist-datasource server-operation="false">
            <transport>
                <read url="@Url.Action("All","EmployeeDirectory")"/>
            </transport>
            <schema data="Data" total="Total" errors="Errors">
                <treelist-model id="EmployeeId" parent-id="ReportsTo" expanded="true">
                    <fields>
                        <field name="EmployeeId" type="number"></field>
                        <field name="ReportsTo" nullable="true"></field>
                        <field name="FirstName" type="string"></field>
                        <field name="LastName" type="string"></field>
                    </fields>
                </treelist-model>
            </schema>
        </treelist-datasource>
    </kendo-treelist>
```

[REPL example of a ToolBar Template Id in TreeList TagHelper for {{ site.framework }}](https://netcorerepl.telerik.com/ceafQvbQ55BuPN4K40)
{% endif %} 

## Next Steps

* [Handle the Events of the Telerik UI TreeList Component for {{ site.framework }}]({% slug treelist_events %})
* [Persist the State of the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/persist-state)
* [Use Row Template in the Telerik UI TreeList Component for {{ site.framework }}]({% slug row_templates_aspnetcore_treelist %})
{% if site.core %}
* [TreeList in Razor Pages]({% slug htmlhelpers_treelist_razorpage_aspnetcore %})
{% endif %}

## See Also
* [Basic Usage of the ToolBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar)
{% if site.core %}
* [ToolBar TagHelper (Demo)](https://demos.telerik.com/aspnet-core/toolbar/tag-helper)
{% endif %}
* [Resizing of the ToolBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar/resizing)
* [Events of the ToolBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar/events)
* [ToolBar HtmlHelper integration with Editors (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar/integration)
