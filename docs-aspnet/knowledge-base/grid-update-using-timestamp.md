---
title: Update Grids by Using timestamp Property
page_title: Update Grids by Using timestamp Property
description: "Update the {{ site.product }} Grid in ASP.NET MVC applications by using the timestamp property."
previous_url: /helpers/data-management/grid/how-to/editing/update-using-timestamp, /html-helpers/data-management/grid/how-to/editing/update-using-timestamp
slug: howto_updategridusingtimestamp_gridaspnetmv
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

How can I update Grids by using `timestamp` property?

## Solution

You can achieve this requirement using the following implementation:

1. Create an editable Grid:

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridTimestamp.Models.Product>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductID);
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.RowVersionString);
            columns.Command(command => command.Edit());
        })
        .DataSource(source =>
        {
            source.Ajax()
            .Model(model =>
            {
                model.Id(p => p.ProductID);
                model.Field(p => p.ProductID).Editable(false);
            })
            .Read("Read", "Home")
            .Update("Update", "Home");
        })
    )
    ```

1. Define the `timestamp` Model property:

    ```C#
    public class Product
    {
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int ProductID { get; set; }
        public string ProductName { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; }

        [NotMapped]
        public string RowVersionString
        {
            get
            {
                if (this.RowVersion != null)
                {
                    return Convert.ToBase64String(this.RowVersion);
                }

                return string.Empty;
            }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    this.RowVersion = null;
                }
                else
                {
                    this.RowVersion = Convert.FromBase64String(value);
                }
            }
        }
    }
    ```

1. Define the Update Action:

    ```C#
    public ActionResult Update(Product product)
    {
        if (ModelState.IsValid)
        {
            context.Products.Attach(product);
            context.Entry(product).State = EntityState.Modified;
            context.SaveChanges();
        }

        return Json(new[] { product }.ToDataSourceResult(new DataSourceRequest(), ModelState));
    }
    ```

To review the complete example, refer to the [project on how to update the Telerik UI Grid in ASP.NET MVC applications by using the `timestamp` property](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridTimestamp).

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