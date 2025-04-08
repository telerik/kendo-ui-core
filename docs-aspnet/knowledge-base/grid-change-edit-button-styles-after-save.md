---
title: Changing Edit Button Styles in an InLine Editable Grid After Save Operation
description: Learn how to modify the appearance of the Edit command in an InLine editable Grid after a successful save operation.
type: how-to
page_title: Changing Edit Button Styles in an InLine Editable Grid After Save Operation
slug: grid-change-edit-button-styles-after-save
tags: grid, inline, edit, button, styles, save, core, mvc
res_type: kb
ticketid: 1634238
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>{{ site.product }} Grid</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.806</td>
</tr>
</tbody>
</table>

## Description

How can I change the background color of the Edit button of an InLine editable Grid when the respective Update or Create operation is successful?

When editing an existing record or adding a new one to an InLine editable Grid, you can dynamically modify the appearance of the **Edit** command to indicate a successful operation. For example, to update the button's background color to green.

## Solution

To implement the solution, follow the steps below:

1. Handle the [`RequestEnd`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/datasourceeventbuilder#requestendsystemstring) event of the Grid's DataSource to identify successful Create/Update operations. Save the index of the new or edited row in a global variable **successfulSavedRow**.
2. Handle the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder?#databoundsystemstring) event of the Grid, select the element of the modified row by using the stored row index, and add a class **successfullSave** to the element of the respective **Edit** command.
3. Add the desired CSS styles to the **successfullSave** class. For example, `background-color`, `color`, and more.
4. Handle the `click` event over the Grid and remove the custom class to retrieve the default button's appearance.

```HtmlHelper
  @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        ..// Columns 
        columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
    })
    .Events(events => events.DataBound("onDataBound"))
    .ToolBar(toolbar => toolbar.Create())
    .Editable(editable => editable.Mode(GridEditMode.InLine))
    .Pageable()
    .Scrollable()
    .HtmlAttributes(new { style = "height:430px;" })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Events(events => events.RequestEnd("onRequestEnd"))
        .Model(model => model.Id(p => p.ProductID))
        .Create(update => update.Action("EditingInline_Create", "Grid"))
        .Read(read => read.Action("EditingInline_Read", "Grid"))
        .Update(update => update.Action("EditingInline_Update", "Grid"))
        .Destroy(update => update.Action("EditingInline_Destroy", "Grid"))
    )
  )
```
{% if site.core %}
```TagHelper
  @addTagHelper *, Kendo.Mvc

  <kendo-grid name="grid" height="430" on-data-bound="onDataBound">
    <datasource type="DataSourceTagHelperType.Ajax" page-size="20"
        on-request-end="onRequestEnd">
        <schema data="Data" total="Total">
            <model id="ProductID">
                <fields>
                    <field name="ProductID" type="number" editable="false"></field>
                </fields>
            </model>
        </schema>
        <transport>
            <read url="@Url.Action("EditingInline_Read", "Grid")"/>
            <update url="@Url.Action("EditingInline_Update", "Grid")"/>
            <create url="@Url.Action("EditingInline_Create", "Grid")"/>
            <destroy url="@Url.Action("EditingInline_Destroy", "Grid")"/>
        </transport>
    </datasource>
    <columns>
        <!-- Columns-->
        <column width="200">
            <commands>
                <column-command text="Edit" name="edit"></column-command>
                <column-command text="Delete" name="destroy"></column-command>
            </commands>
        </column>
    </columns>
    <toolbar>
        <toolbar-button name="create"></toolbar-button> 
    </toolbar>
    <editable mode="inline"/>
    <pageable enabled="true"/>
    <scrollable enabled="true"/>
  </kendo-grid>
```
{% endif %}
```JS scripts
<script type="text/javascript">
   var successfulSavedRow = null;

    function onRequestEnd(e) {
        var grid = $("#grid").data("kendoGrid");
        if(e.type == "update") {
            if(e.response.Errors == null) { // Successful Update operation.
                var editedRecord = e.response.Data[0];
                var editedDataItem = e.sender.get(editedRecord.ProductID);
                var editedRow = $(".k-grid-table").find(`tr[data-uid='${editedDataItem.uid}']`);
                var editedRowIndex = $(editedRow).index();
                successfulSavedRow = editedRowIndex;
            }
        } else if(e.type == "create") {
            if(e.response.Errors == null) { // Successful Create operation.
                successfulSavedRow = 0;
            }
        }
    }
    function onDataBound(e) {
        var grid = e.sender;
        if(successfulSavedRow != null) {
              var editedRow = grid.tbody.find('tr:eq(' + successfulSavedRow + ')');
              var editButton = editedRow.find('.k-grid-edit-command');
              editButton.addClass('successfullSave'); // Add a custom class to the "Edit" button.
              successfulSavedRow = null;
        }
    }
    $(document).ready(function(){
      $(document).on("click","#grid",function() {
        $.each($(".k-table-tbody tr"), function(){
            var editBtn = $(this).find('button.k-grid-edit-command');
            if($(editBtn).hasClass("successfullSave")) {
                $(editBtn).removeClass("successfullSave"); // Remove the custom class when the user clicks on the Grid's table.
            }
        });
      });
    });
    </script>
```
```CSS Styles
  <style>
   .successfullSave, .successfullSave:hover{
     background-color: green;
   }
  </style>
```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Grid HtmlHelper](https://netcorerepl.telerik.com/GyPkvsOW41qZiWEl58)
* [Sample code with the Grid TagHelper](https://netcorerepl.telerik.com/GIlubsus42u33Jqy59)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on updating the Edit button's appearance of the Grid after saving changes](https://netcorerepl.telerik.com/GyPkvsOW41qZiWEl58).
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
