---
title: Bind Grid to Collections of Dynamic Objects
page_title: Bind Grid to Collections of Dynamic Objects
description: "Bind the {{ site.product }} Grid to a collection of dynamic objects in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/Binding/bind-to-collection-of-dynamic-objects, /html-helpers/data-management/grid/how-to/Binding/bind-to-collection-of-dynamic-objects
slug: howto_bindtocollectionsofdynamicobjects_gridaspnetmv
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

How can I bind the Grid to a collection of dynamic objects?

## Solution

You can achieve this requirement using the following implementation:

1. Define the View's model as `IEnumerable<dynamic>` and bind the Grid to this model. Also, configure the Grid for[ Ajax data bidning]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding%}).

    ```HtmlHelper
    @model IEnumerable<dynamic>

    @(Html.Kendo().Grid(Model)
        .Name("Grid")
        .DataSource(ds => ds
            .Ajax()
            .Model(m =>
            {
                m.Id("ProductID");
                m.Field("ProductID", typeof(int));
                m.Field("ProductName", typeof(string));
                m.Field("UnitPrice", typeof(decimal));
                m.Field("QuantityPerUnit", typeof(string));
            })
            .Read(r => r.Action("Read", "Home"))
            .Update(u => u.Action("Update", "Home"))
            .Destroy(u => u.Action("Destroy", "Home"))
            .Create(u => u.Action("Create", "Home"))
        )
        ... // Additional configuration
    )
    ```

1. Set up the **Read** Action method of the Grid to retrieve the data:

    ```C#
    public ActionResult Read([DataSourceRequest] DataSourceRequest request)
    {
        return GetView(request);
    }

    private IEnumerable<dynamic> GetData()
    {
        var db = new GridBindingDynamicCollectionEntities();
        return db.Products;
    }

    private JsonResult GetView(DataSourceRequest request)
    {
        return Json(GetData().ToDataSourceResult(request));
    }
    ```

To review the complete example, refer to the ASP.NET MVC project on how to [bind the {{ site.product }} Grid to a collection of dynamic objects](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridBindingDynamicCollection).

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
