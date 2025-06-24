---
title: Overview
page_title: Editing Overview
description: "Get started with the editing functionality of the Telerik UI Grid component for {{ site.framework }}."
previous_url: /helpers/data-management/grid/editing/ajax-editing, /helpers/data-management/grid/editing/batch-editing, /helpers/data-management/grid/editing/server-editing, /helpers/data-management/grid/editing/webapi-editing, /html-helpers/data-management/grid/editing/custom
slug: htmlhelpers_grid_aspnetcore_editing_overview
position: 1
---

# Editing Overview

The Telerik UI for {{ site.framework }} Grid component supports create, update, and delete operations (CRUD) with different modes and user experience. 

## Basics

The Grid CRUD operations rely on the following algorithm:

1. Users execute [Grid commands (**Edit**, **Save**, **Delete**, and more)](#commands) with the mouse or keyboard.
1. The DataSource of the Grid triggers the respective `Create`, `Update`, or `Destroy` actions based on the applied data operation.
1. The changes are handled in the Controller Action methods, and the new, deleted, or edited data item is returned through the response of the request.
1. The Grid rebinds to display the latest data.

## Model Requirements

Adding, deleting, or editing rows in the Grid sets the following requirements on the Grid model:

* The model field names must be valid JavaScript identifiers and contain neither spaces nor special characters. The first character has to be a letter.
* The `Id()` option of the `Model()` configuration must contain the name of the unique model identifier. The DataSource uses the specified identifier field to track the state of the data items. The `Id` field must be unique and non-editable, otherwise, unexpected behavior and loss of data might occur.

    ```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        ... // Additional configuration.
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => 
            {
                model.Id(p => p.ProductID);
                model.Field(p => p.ProductID).Editable(false);
            })
            ... // Additional configuration.
        )
    )
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax">
            <schema data="Data" total="Total" errors="Errors">
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" type="number" editable="false"></field>
                    </fields>
                </model>
            </schema>
            <!-- Other configuration. -->
        </datasource>
    </kendo-grid>
    ```
    {% endif %}

* All fields defined in the `Model()` configuration of the DataSource with the `Editable(false)` option are disabled for editing.
{% if site.core %}
* When using Grid TagHelper, define the data type of the fields to take advantage of the built-in editors, filterable UI, and correct sorting, filtering, and grouping operations.

    The following table lists the available data types when using Grid TagHelper.

    Data Type | Column Template or Format | Editor
    :------- | :---- | :--------
    `string`| Displayed as text.  | [`TextBox`]({% slug htmlhelpers_overview_textbox%})
    `number`| The [`format`](/api/kendo.mvc.taghelpers/gridcolumntaghelper#attributes) attribute can be used to format the number as currency `"{0:c2}"`, percentage `"{0:p0}"`, exponential `"{0:e4}"` or a custom format `"{0:0.00}"`. See all [`Number Formatting`](https://www.telerik.com/kendo-jquery-ui/documentation/globalization/intl/numberformatting) | [`NumericTextBox`]({% slug htmlhelpers_numerictextbox_aspnetcore%})
    `date` | The [`format`](/api/kendo.mvc.taghelpers/gridcolumntaghelper#attributes) attribute can be used to format the date as a short `"{0:d}"`, long `"{0:D}"`, full date/time `"{0:F}"` and many more standard and custom date patterns. See all [`Date Formatting`](https://www.telerik.com/kendo-jquery-ui/documentation/globalization/intl/dateformatting) | [`DatePicker`]({% slug htmlhelpers_datepicker_aspnetcore%})
    `boolean` | Displayed as lowercase text `true` or `false` | [`CheckBox`]({% slug htmlhelpers_checkbox_aspnetcore_overview%})
    `object` |  Arrays and Objects without templates are rendered as `[object Object]`.| [`TextBox`]({% slug htmlhelpers_overview_textbox%})
    
    When using the HtmlHelper version of the Grid, the data types of the column fields are automatically set up in the DataSource options, so it is not required to specify them explicitly.
    {% endif %}

## Edit Modes

The Grid offers the following modes to add and edit rows with a different user experience:

* [Inline editing]({% slug inlineediting_grid_aspnetcore %})&mdash;Users modify the Grid content row by row.
* [Popup editing]({% slug popupediting_grid_aspnetcore %})&mdash;Users modify the Grid content row by row in a modal popup form.
* [InCell (Batch) editing]({% slug batchediting_grid_aspnetcore %})&mdash;Users modify the Grid content cell by cell.
    
To enable the editing functionality of the Grid:

1. Set the `Editable` configuration: 

    ```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("Grid")
        ... // Additional configuration.
        .Editable(e => e.Enabled(true))
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-grid name="grid">
        <editable enabled="true"/>
        <!-- Other configuration. -->
    </kendo-grid>
    ```
    {% endif %}

    The default edit mode is [Inline]({% slug inlineediting_grid_aspnetcore %}). To use a different edit mode, specify it through the `Mode()` option: 

    ```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("Grid")
        ... // Additional configuration.
        .Editable(e => e.Mode(GridEditMode.PopUp))
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-grid name="grid">
        <editable enabled="true" mode="popup"/>
        <!-- Other configuration. -->
    </kendo-grid>
    ```
    {% endif %}
        
    >For more information on the available editable configurations, refer to the {% if site.core %}[HtmlHelper API](/api/kendo.mvc.ui.fluent/grideditingsettingsbuilder) and [TagHelper API](/api/kendo.mvc.taghelpers/grideditablesettingstaghelper) options{% else %}[API options](/api/kendo.mvc.ui.fluent/grideditingsettingsbuilder){% endif %}.

1. Specify the `Id` field in the `Model()` configuration of the DataSource: 

    ```HtmlHelper
    .Model(model => model.Id(p => p.ProductID))
    ```
    {% if site.core %}
    ```TagHelper
    <model id="ProductID">
        <!-- Other configuration. -->
    </model>
    ```
    {% endif %}

    >The `Model` method configures the model of the DataSource. For more information, refer to the [`Model` definition](https://docs.telerik.com/{{ site.platform }}/html-helpers/datasource/model) documentation.

1. Declare the endpoints for the desired actions (`Create`, `Update`, `Destroy`):

    ```HtmlHelper
    .DataSource(dataSource => dataSource
        .Ajax()
        ... // Additional configuration.
        .Read(read => read.Action("Read", "Grid"))
        .Create(create => create.Action("Create", "Grid"))
        .Update(update => update.Action("Update", "Grid"))
        .Destroy(destroy => destroy.Action("Destroy", "Grid"))
    )
    ```
    {% if site.core %}
    ```TagHelper
    <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
        <transport>
            <!-- Other configuration. -->
            <read url="@Url.Action("Read", "Grid")"/>
            <create url="@Url.Action("Create", "Grid")"/>
            <update url="@Url.Action("Update", "Grid")"/>
            <destroy url="@Url.Action("Destroy", "Grid")"/>
        </transport>
    </datasource>
    ```
    {% endif %}

1. Define an Action method for each operation in the Controller. Intercept the Model instance, save the changes, and return the expected response.

    The following example shows the `Update` Action method for an Inline or Popup editable Grid set up with [Ajax data binding]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding%}).
    
    ```C#
    [AcceptVerbs("Post")]
    public JsonResult Update([DataSourceRequest] DataSourceRequest request, ProductViewModel product)
    {
        if (product != null && ModelState.IsValid)
        {
            productService.Update(product);
        }

        return Json(new[] { product }.ToDataSourceResult(request, ModelState));
    }
    ```

> Editing multiple rows at the same time is not supported.

## Delete Operation

Delete operations provide the same user experience in all Grid edit modes and require the same configuration:

* [**Delete** command button](#commands).
* `Destroy` action in the DataSource configuration.
* Optional delete confirmation dialog. Use the `DisplayDeleteConfirmation()` option in the `Editable()` configuration to determine if the Grid will show a Dialog before triggering the `Destroy` action so that users can abort the operation.

```HtmlHelper
@(Html.Kendo().Grid<ProductViewModel>()
    .Name("Grid")
    .Editable(settings => settings.DisplayDeleteConfirmation(false))
    ... // Additional configuration.
)
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <editable enabled="true" confirmation="false"/>
        <!-- Other configuration. -->
    </kendo-grid>
```
{% endif %}

Delete operations can work even if the Grid editing feature is not enabled.

>tip See the delete operations in action in the complete examples for Grid [Inline]({% slug inlineediting_grid_aspnetcore %}), [InCell]({% slug batchediting_grid_aspnetcore %}), and [Popup]({% slug popupediting_grid_aspnetcore %}) editing. Also, check how to [customize the Delete Confirmation Dialog]({% slug grid-custom-delete-confirmation-dialog%}).

## Commands

The Grid provides the following built-in commands that enable users to add, delete, and edit rows:

* `Create`&mdash;Adds a new row and puts it in edit mode.
* `Destroy`&mdash;Deletes a row.
* `Edit`&mdash;Puts a Grid row or cell in edit mode.
* `Save`&mdash;Confirms the row or cell changes and exits edit mode if the user input is valid.
* `Cancel`&mdash;Cancels the row or cell changes and exits edit mode. The command automatically appears in the Toolbar of the Grid when the `Save()` command is defined.

Users execute commands in the following ways:

* By clicking the column command buttons.
* By clicking editable cells in InCell edit mode and then anywhere else on the page.
* By using the [Grid keyboard navigation](https://demos.telerik.com/{{ site.platform }}/grid/keyboard-navigation).

Command buttons can only reside in Grid [column commands](/api/kendo.mvc.ui.fluent/gridcolumnfactory#commandsystemaction) or the Grid [Toolbar]({% slug htmlhelpers_grid_aspnetcore_toolbar%}). You can also trigger the desired operation programmatically from anywhere on the page using the [client-side methods](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid#methods).

## Known Limitations

The following limitations apply when using editing along with other features of the component.

* If filtering is applied and the `ServerOperation()` option is disabled in the DataSource configuration, adding new records is not allowed. 
* The component behaves differently when it is grouped and you add a new record. If `ServerOperation()` is enabled in the DataSource configuration, the new row is added as part of a separate (duplicate) group. If `ServerOperation()` is disabled, the new row is added as part of an existing group.

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Inline Editing by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-inline)
* [Popup Editing by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-popup)
* [InCell Editing by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing)
* [Custom Editor by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom)
* [Custom Validation Editing by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom-validation)
* [Find Out More in the Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
* [Server-Side HtmlHelper API](/api/grid)
{% if site.core %}
* [Server-Side TagHelper API](/api/taghelpers/grid)
{% endif %}
