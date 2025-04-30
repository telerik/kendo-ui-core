---
title: Edit Grids with Entity Framework Code First
page_title: Edit Grids with Entity Framework Code First
description: "Implement CRUD data operations with Entity Framework Code First when working with the {{ site.product }} Grid."
previous_url: /helpers/data-management/grid/how-to/editing/edit-ef-code-first, /html-helpers/data-management/grid/how-to/editing/edit-ef-code-first
slug: howto_editwithentityframeworkcodefirst_gridaspnetmvc
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

How can I edit Grids with Entity Framework Code First?

## Solution

You can achieve this requirement using the following implementation:

1. Define a Grid that binds to remote data:

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridEditingEFCodeFirst.Models.Customer>()
        .Name("Customers")
        .ToolBar(tb => tb.Create())
        .Pageable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(c => c.CustomerID))
            .Read("GetCustomers", "Home")
            .Update("UpdateCustomer", "Home")
            .Create("InsertCustomer", "Home")
            .Destroy("DeleteCustomer", "Home")
        )
        .Columns(cols =>
        {
            cols.Bound(c => c.Name).Width(300);
            cols.Bound(c => c.Phone);
            cols.Bound(c => c.Email);
            cols.Command(cmd =>
            {
                cmd.Edit();
                cmd.Destroy();
            });
        })
    )
    ```

2. Implement the Action methods for the CRUD operations:

    ```C#
    public ActionResult GetCustomers([DataSourceRequest] DataSourceRequest request)
    {
        using (var dbContext = new CustomerContext())
        {
            return Json(dbContext.Customers.ToDataSourceResult(request,
                    c => new CustomerViewModel
                    {
                        CustomerID = c.CustomerID,
                        Name = c.Name,
                        Email = c.Email,
                        Phone = c.Phone
                    }));
        }
    }

    public ActionResult UpdateCustomer([DataSourceRequest] DataSourceRequest request, Customer customer)
    {
        using (var dbContext = new CustomerContext())
        {
            var customerToUpdate = dbContext.Customers.First(cust => cust.CustomerID == customer.CustomerID);

            TryUpdateModel(customerToUpdate);

            dbContext.SaveChanges();

            return Json(ModelState.ToDataSourceResult());
        }
    }

    public ActionResult InsertCustomer([DataSourceRequest] DataSourceRequest request, Customer customerToAdd)
    {
        using (var dbContext = new CustomerContext())
        {
            if (ModelState.IsValid)
            {
                dbContext.Customers.Add(customerToAdd);
                dbContext.SaveChanges();
            }

            return Json(new[] { customerToAdd }.ToDataSourceResult(request));
        }
    }

    public ActionResult DeleteCustomer([DataSourceRequest] DataSourceRequest request, Customer customer)
    {
        using (var dbContext = new CustomerContext())
        {
            var customerToDelete = dbContext.Customers.First(cust => cust.CustomerID == customer.CustomerID);

            if (customerToDelete != null)
            {
                dbContext.Customers.Remove(customerToDelete);
                dbContext.SaveChanges();
            }

            return Json(new[] { customerToDelete }.ToDataSourceResult(request));
        }
    }
    ```

To review the complete implementation, refer to the [project on how to implement Grid's CRUD data operations using Entity Framework Code First](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingEFCodeFirst).

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
