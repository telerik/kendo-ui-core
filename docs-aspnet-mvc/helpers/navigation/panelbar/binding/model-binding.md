---
title: Model Binding
page_title: Model Binding | Telerik UI PanelBar HtmlHelper for ASP.NET MVC
description: "Learn how to implement model binding with Telerik UI PanelBar HtmlHelper for ASP.NET MVC."
slug: modelbinding_panelbarhelper_aspnetmvc
position: 4
---

# Model Binding

The Telerik UI PanelBar enables you to bind it to a hierarchical model.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method and pass the **Categories** table as the model. The **Categories** table has to be associated to the **Products** table.

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Categories);
        }

1. Make your view strongly typed.

    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
            Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Category>>" %>
    ```
    ```Razor
        @model IEnumerable<MvcApplication1.Models.Category>
    ```

1. Add a PanelBar.

    ```ASPX
        <%: Html.Kendo().PanelBar()
            .Name("panelbar") // The name of the PanelBar is mandatory. It specifies the "id" attribute of the PanelBar.
            .BindTo(Model, mappings =>
            {
                mappings.For<category>(binding => binding // Define first level of PanelBar.
                    .ItemDataBound((item, category) => // Define mapping between PanelBar item properties and the model properties.
                    {
                        item.Text = category.CategoryName;
                    })
                    .Children(category => category.Products)); // Define which property of the model contains the children.
                mappings.For<product>(binding => binding
                    .ItemDataBound((item, product) =>
                    {
                        item.Text = product.ProductName;
                    }));
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().PanelBar()
            .Name("panelbar") // The name of the PanelBar is mandatory. It specifies the "id" attribute of the PanelBar.
            .BindTo(Model, mappings =>
            {
                mappings.For<category>(binding => binding // Define first level of PanelBar.
                    .ItemDataBound((item, category) => // Define mapping between PanelBar item properties and the model properties.
                        {
                        item.Text = category.CategoryName;
                        })
                    .Children(category => category.Products)); // Define which property of the model contains the children.
                mappings.For<product>(binding => binding
                    .ItemDataBound((item, product) =>
                        {
                        item.Text = product.ProductName;
                        }));
            })
        )
    ```

## See Also

* [Basic Usage of the PanelBar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/panelbar)
* [PanelBarBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/PanelBarBuilder)
* [PanelBar Server-Side API](/api/panelbar)
