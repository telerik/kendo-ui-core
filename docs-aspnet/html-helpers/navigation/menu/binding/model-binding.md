---
title:  Model Binding
page_title: Model Binding
description: "Learn how to implement model binding with Telerik UI Menu component for {{ site.framework }}."
previous_url: /helpers/navigation/menu/binding/model-binding
slug: htmlhelpers_menu_modelbinding_aspnetcore
position: 2
---

# Model Binding

The Telerik UI Menu enables you to bind it to a hierarchical model.

1. Create a new action method and pass the **Categories** table as the model. The **Categories** has to be associated to the **Products** table.

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

    ```HtmlHelper
    @(Html.Kendo().Menu()
        .Name("menu") // The name of the Menu is mandatory. It specifies the "id" attribute of the widget.
        .BindTo(Model, mappings =>
        {
            mappings.For<Category>(binding => binding // Define the first level of the Menu.
                .ItemDataBound((item, category) => // Define the mapping between the Menu item properties and the model properties.
                    {
                    item.Text = category.CategoryName;
                    })
                .Children(category => category.Products)); // Define which property of the model contains the children.
            mappings.For<Product>(binding => binding
                .ItemDataBound((item, product) =>
                {
                    item.Text = product.ProductName;
                }));
        })
    )
    ```
    {% if site.core %}
    ```TagHelper
        @{
            var menuItems = Model.Select(category =>
            {
                return new MenuItemBase
                {
                    Text = category.CategoryName,
                    Children = category.Products.Select(product =>
                    {
                        return new MenuItemBase { Text = product.ProductName };
                    })
                };
            });
        }

        <kendo-menu name="menu" bind-to="menuItems">
        </kendo-menu>
    ```
{% endif %}


## See Also

* [Model Binding by the Menu HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/modelbinding)
* [Binding to Custom Attributes by the Menu HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/menu-bind-attributes)
* [Server-Side API](/api/menu)
