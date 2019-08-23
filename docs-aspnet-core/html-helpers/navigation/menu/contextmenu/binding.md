---
title: Binding
page_title: Data Binding | Telerik UI ContextMenu HtmlHelper for ASP.NET Core
description: "Learn the basics approaches for binding the Telerik UI ContextMenu HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_contextmenu_databinding_aspnetcore
previous_url: https://docs.telerik.com/aspnet-core/html-helpers/navigation/menu/contextmenu
position: 2
---

# Data Binding

The ContextMenu provides Model Binding for binding it to data:

## Model Binding

The Telerik UI ContextMenu enables you to bind it to a hierarchical model.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET Core]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}).

1. Declare the model you wish to use for the View.

    ```Razor
    @model IEnumerable<ModelBindingDemo.Models.Category>
    ```

1. Add the ContextMenu.

    ```Razor
    @model IEnumerable<ModelBindingDemo.Models.Category>

    <div id="target">Click to open</div>

    @(Html.Kendo().ContextMenu()
            .Name("contextmenu")
            .Target("#target")
            .ShowOn("click")
            .BindTo(Model, mappings =>
            {
                mappings.For<ModelBindingDemo.Models.Category>(binding => binding
                        .ItemDataBound((item, category) =>
                        {
                            item.Text = category.CategoryName;
                        })
                        .Children(category => category.Products));
                mappings.For<ModelBindingDemo.Models.Product>(binding => binding
                        .ItemDataBound((item, product) =>
                        {
                            item.Text = product.ProductName;
                        }));
            })
    )
    ```
    ```Controller
    public class ContextMenuController : BaseController
    {

        public ActionResult ModelBinding()
        {
            var model = new List<Category>()
            {
                new Category
                {
                    CategoryID = 1,
                    CategoryName = "Item 1",
                    Products = new List<Product>
                        {
                            new Product { ProductID = "1" , ProductName = "SubItem 1" },
                            new Product { ProductID = "2" , ProductName = "SubItem 2" },
                            new Product { ProductID = "3" , ProductName = "SubItem 3" }
                        }
                },
                new Category
                {
                    CategoryID = 2,
                    CategoryName = "Item 2",
                    Products = new List<Product>
                        {
                            new Product { ProductID = "1" , ProductName = "SubItem 1" },
                            new Product { ProductID = "2" , ProductName = "SubItem 2" },
                            new Product { ProductID = "3" , ProductName = "SubItem 3" }
                        }
                }
            };

            return View(model);
        }
    }
    ```

## See Also

* [Server-Side API](/api/menu)
