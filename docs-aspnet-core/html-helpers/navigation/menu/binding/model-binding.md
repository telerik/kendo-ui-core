---
title:  Model Binding
page_title: Model Binding | Kendo UI Menu HtmlHelper for ASP.NET Core
description: "Learn how to implement model binding with Kendo UI Menu HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_menu_modelbinding_aspnetcore
position: 2
---

# Model Binding

The Kendo UI Menu enables you to bind it to a hierarchical model.

To perform model binding:

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET Core]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}).
1. Create a new action method and pass the **Categories** table as the model. Note that the **Categories** must be associated to the **Products** table.

    ```Razor
    public ActionResult Index()
    {
        NorthwindDataContext northwind = new NorthwindDataContext();

        return View(northwind.Categories);
    }
    ```

1. Make your view strongly typed.

    ```Razor
    @model IEnumerable<MvcApplication1.Models.Category>
    ```

1. Add a Menu.

    ```Razor
    @(Html.Kendo().Menu()
        .Name("menu") //The name of the Menu is mandatory. It specifies the "id" attribute of the widget.
        .BindTo(Model, mappings =>
        {
            mappings.For<category>(binding => binding //Define the first level of the Menu.
                .ItemDataBound((item, category) => //Define the mapping between the Menu item properties and the model properties.
                    {
                    item.Text = category.CategoryName;
                    })
                .Children(category => category.Products)); //Define which property of the model contains the children.
            mappings.For<product>(binding => binding
                .ItemDataBound((item, product) =>
                {
                    item.Text = product.ProductName;
                }));
        })
    )
    ```

## See Also

* [JavaScript API Reference of the Menu](http://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
* [Menu HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/menu/overview)
* [Menu Official Demos](http://demos.telerik.com/aspnet-core/menu/index)
