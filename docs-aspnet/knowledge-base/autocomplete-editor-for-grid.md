---
title: Add New Values to Grid Records with AutoComplete as Editor
page_title: Add New Values to Grid Records with AutoComplete as Editor
description: "Learn how to add a new value to the Grid records when the {{ site.product }} AutoComplete is used as an editor in the Grid."
type: how-to
previous_url: /helpers/editors/autocomplete/how-to/add-new-values-to-grid-with-autocomplete-editor, /html-helpers/editors/autocomplete/how-to/add-new-values-to-grid-with-autocomplete-editor, /helpers/data-management/grid/how-to/editing/add-new-values-to-records-with-autocomplete-editor, /html-helpers/data-management/grid/how-to/editing/add-new-values-to-records-with-autocomplete-editor
slug: howto_addnewvaluestogridrecordsautoceditor_autocompleteaspnetmv
tags: grid, autocomplete, editor, add, new, options, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }}</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I use the {{ site.framework }} AutoComplete component as an editor in an InCell editable Grid to add new values to the Grid records?

## Solution

The AutoComplete editor will provide a convenient list of options to hint the user of the available options. You can achieve this implementation through the following key steps:

1. [Define an InCell editable Grid]({% slug batchediting_grid_aspnetcore %}) and bind its column to the complex Model property **Person**.

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridEditingAutoCompleteNewItem.Models.GridViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.Person).ClientTemplate("#= data.Person ? Person.Name : '' # ").Title("AUTOCOMPLETE");
            columns.Bound(p => p.Text).Title("Text");
        })
        .ToolBar(commands =>
        {
            commands.Create().Text("New");
            commands.Save();
        })
        .Scrollable()
        .HtmlAttributes(new { style = "height: 430px;" })
        .Editable(editing => editing.Mode(GridEditMode.InCell))
        .DataSource(dataSource => dataSource
            .Ajax()
            .ServerOperation(false)
            .Model(model =>
            {
                model.Id(p => p.ID);
            })
            .Update("Update", "Home")
            .Read("Read", "Home")
            .Events(e => e.Change("onChange"))
        )
    )
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" height="430">
        <columns>
            <column field="Person" template="#= data.Person ? Person.Name : '' #" title="AUTOCOMPLETE"></column>
            <column field="Text" title="Text"></column>
        </columns>
        <toolbar>
            <toolbar-button name="create" text="New"></toolbar-button>
            <toolbar-button name="save"></toolbar-button>
        </toolbar>
        <editable mode="incell"/>
        <scrollable enabled="true"/>
        <datasource type="DataSourceTagHelperType.Ajax" server-operation="false" on-change="onChange">
            <schema>
                <model id="ID"></model>
            </schema>
            <transport>
                <read url="@Url.Action("Read", "Home")" />
                <update url="@Url.Action("Update", "Home")" />
            </transport>
        </datasource>
    </kendo-grid>
    ```
    {% endif %}

1. Create a [custom editor template for the column]({% slug customediting_grid_aspnetcore %}) that contains an AutoComplete editor, which binds to remote data.
1. Configure the AutoComplete for [server-side filtering]({% slug htmlhelpers_autocomplete_filtering_aspnetcore %}).

    ```HtmlHelper
    @model ResultEntryViewModel

    @(Html.Kendo().AutoCompleteFor(m => m.ID)
        .DataTextField("Name")
        .DataSource(dataSource => 
            dataSource.Read(read => read.Action("GetAutocomplete", "Home").Data("onAdditionalData"))
            .ServerFiltering(true))
        .Delay(500)
        .HighlightFirst(true)
    )
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model ResultEntryViewModel

    <kendo-autocomplete for="ID" highlight-first="true" delay="500"
        dataTextField="Name">
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
            <transport>
                <read url="@Url.Action("GetAutocomplete", "Home")" data="onAdditionalData" />
            </transport>
        </datasource>
    </kendo-autocomplete>
    ```
    {% endif %}

1. Handle the [`Change`](/api/kendo.mvc.ui.fluent/datasourceeventbuilder#changesystemstring) event of the Grid's DataSource and update the **Person** field of the respective record when its current value is changed through the AutoComplete editor. Then, trigger the [`closeCell()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/closecell) method of the Grid to exit edit mode.

    ```JS
    <script type="text/javascript">
        // Handle the Grid's DataSource Change event.
        function onChange(e) {
            // The Change event provides the action argument for the type of the operation.
            if (e.action == "itemchange") {
                if (e.field == "Person") {
                    if (typeof (e.items[0].Person) == "string") {
                        e.items[0].set("Person", { ID: "0", Name: e.items[0].Person });
                        $("#grid").data("kendoGrid").closeCell($("[data-role=autocomplete]").closest("td"));
                    }
                }
            }
        }

        function onAdditionalData() {
            return {
                text: $("#Person").val()
            };
        }
    </script>
    ```

To see the complete example, refer to the  ASP.NET MVC project on how to [add a new value to the Grid records](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingAutoCompleteNewItem) when the Grid uses the Telerik UI AutoComplete as an editor. {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} AutoComplete Resources

* [{{ site.framework }} AutoComplete Documentation]({%slug htmlhelpers_autocomplete_aspnetcore%})
* [{{ site.framework }} AutoComplete Demos](https://demos.telerik.com/{{ site.platform }}/autocomplete/index)
{% if site.core %}
* [{{ site.framework }} AutoComplete Product Page](https://www.telerik.com/aspnet-core-ui/autocomplete)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)
{% else %}
* [{{ site.framework }} AutoComplete Product Page](https://www.telerik.com/aspnet-mvc/autocomplete)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Server-Side API Reference of the AutoComplete for {{ site.framework }}](/api/autocomplete)
{% if site.core %}
* [Server-Side TagHelper API Reference of the AutoComplete for {{ site.framework }}](/api/taghelpers/autocomplete)
{% endif %}
* [Server-Side API Reference of the Grid for {{ site.framework }}](/api/grid)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](/api/taghelpers/grid)
{% endif %}

