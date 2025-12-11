---
title: Post Grid Through a Form
page_title: Post Grid Data Through a Form
description: "Integrate the {{ site.product }} Grid into a standard HTML form and submit its data along with the form fields."
previous_url: /helpers/data-management/grid/how-to/editing/post-grid-with-form, /html-helpers/data-management/grid/how-to/editing/post-grid-with-form
slug: howto_postgriddatawithform_gridaspnetmv
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

How can I use the Grid in a form and submit its data along with the form fields?

## Solution

To submit the Grid's data items as part of an `Html.Form`, note that.

* All items in the Grid are submitted no matter if they are updated or not.
* Only the items from the current page are submitted.
* Server operations must be disabled&mdash;`ServerOperation(false)`.

The solution relies on the following key steps:

1. Define the form and the Grid. Set the `Name()` of the Grid to the name of the Model property that the Grid binds to.

    ```C# Models
    public class Category
    {
        public int CategoryID { get; set; }
        public string Name { get; set; }
        public IEnumerable<Product> Products { get; set; }
    }

    public class Product
    {
        public string Name { get; set; }
        public int ProductID { get; set; }
    }
    ```
    ```Razor View
    @model Telerik.Examples.Mvc.Areas.GridPostWithForm.Models.Category

    @using(Html.BeginForm("Save", "Home"))
    {
        <fieldset>
            <legend>Editing Category (@Model.CategoryID)</legend>

            @Html.LabelFor(category => category.Name)
            @Html.EditorFor(category => category.Name)

            @(Html.Kendo().Grid(Model.Products)
                .Name("Products")
                .ToolBar(tools => tools.Create().Text("Add new product"))
                .Editable(editable => editable.Mode(GridEditMode.InCell).CreateAt(GridInsertRowPosition.Bottom))
                .Columns(columns =>
                {
                    ... // Defined columns.
                })
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .Model(model => 
                    {
                        model.Id(p => p.ProductID);
                        model.Field(p => p.ProductID).Editable(false);
                    })
                    .ServerOperation(false)
                )
            )
        </fieldset>

        <input type="submit" value="Save" />
    }
    ```

1. Set the `ClientTemplate() `option to each Grid column in order to add the respective input element with `name` and `value` attributes.

    ```Razor
    .Columns(columns =>
    {
        columns.Bound(p => p.Name).ClientTemplate("#= Name #" + 
        "<input type='hidden' name='Products[#= index(data)#].Name' value='#= Name #' />"
        );

        columns.Bound(p => p.ProductID).Hidden().ClientTemplate("#= ProductID #" +
        "<input type='hidden' name='Products[#= index(data)#].ProductID' value='#= ProductID #' />"
        );

        columns.Command(command => command.Destroy()).Width(100);
    })
    ```

1. Get the index of the data item for the `name` attribute of each input element:

    ```JS
    function index(dataItem) {
        var data = $("#Products").data("kendoGrid").dataSource.data();
        return data.indexOf(dataItem);
    }
    ```

To review the complete example, refer to the [project on how to submit the Grid data items as part of an `Html.Form`](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridPostWithForm).

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
