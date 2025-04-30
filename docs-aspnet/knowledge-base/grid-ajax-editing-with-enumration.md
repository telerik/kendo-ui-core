---
title: Using Enum Type Fields in Grid
page_title: Using Enum Type Fields in Grid
description: "Configure the {{ site.product }} Grid to display and edit enum properties."
previous_url: /helpers/data-management/grid/how-to/editing/ajax-editing-with-enumration, /html-helpers/data-management/grid/how-to/editing/ajax-editing-with-enumration, /helpers/data-management/grid/how-to/editing/enum-editing-with-dropdownlist-localization, /html-helpers/data-management/grid/how-to/editing/enum-editing-with-dropdownlist-localization
slug: howto_doajaxeditingenumeration_gridaspnetmvc
component: grid
type: how-to
res_type: kb
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

How can I use configure the {{ site.product }} Grid to display and edit `enum` type fields?

## Solution

The example relies on the following key steps:

1. Define a Grid with a column that binds to a field of type `enum`:

    ```HtmlHelper
        @(Html.Kendo().Grid<Product>()
            .Name("Grid")
            .Columns(columns =>
            {
                ...
                columns.Bound(p => p.Category);
            })
            .Editable(editable => editable.Mode(GridEditMode.InCell))
            ...
        )
    ```

2. The **Category** field is an Enumeration:

    ```C#
        public class Product
        {
            public Category Category { get; set; }
        }

        public enum Category
        {
            Beverages,
            Foods
        }
    ```

3. Create a custom editor template for the **Category** field:

    ```HtmlHelper
    @model Category
    @using Kendo.Mvc.UI

    @{
        List<SelectListItem> list = new List<SelectListItem>();
        foreach (var value in Enum.GetValues(typeof(Telerik.Examples.Mvc.Areas.GridEditingAjaxWithEnumeration.Models.Category)))
        {
            list.Add(new SelectListItem()
            {

                Text = value.ToString(),
                Value = ((int)value).ToString()
            });
        }
    }

    @(Html.Kendo().DropDownListFor(m=> m)
        .DataTextField("Text")
        .DataValueField("Value")
        .BindTo(list)
    )
    ```

To review the complete example, refer to the ASP.NET MVC application on how to [configure the Grid to display and edit `enum` fields](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingAjaxWithEnumeration).

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

