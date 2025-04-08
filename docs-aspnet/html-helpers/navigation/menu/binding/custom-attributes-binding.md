---
title:  Custom Attributes Binding
page_title: Custom Attributes Binding
description: "Learn how to bind custom attributes from the server-side with the Telerik UI Menu component for {{ site.framework }}."
slug: custom-attributes-binding
position: 6
---

# Custom Attributes Binding

The {{ site.product }} Menu enables you to apply model binding to populate its items dynamically from the server. You can also bind the HTML attributes of the Menu items to fields from the passed Model.

With the [`MenuItemFactory`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/menuitemfactory) class you can construct the menu items and their corresponding attributes. Afterwards, you can apply client-side logic based on the item selection.

The following example illustrates how to bind custom attributes.

1. Make sure that you have supplemented the Menu items from the controller side.

    ```C# Controller.cs
        public ActionResult Menu_Bind_Attributes()
        {
            var categories = categoryService.GetCategories();
            return View(categories);
        }
    ```
    ```C# Model.cs
        public class Category
        {
            public Category()
            {
                this.Products = new HashSet<Product>();
                this.DetailProducts = new HashSet<DetailProduct>();
            }

            [Key]
            public int CategoryID { get; set; }

            public string CategoryName { get; set; }

            public string Description { get; set; }

            public byte[] Picture { get; set; }

            [InverseProperty(nameof(Product.Category))]
            public virtual ICollection<Product> Products { get; set; }

            [InverseProperty(nameof(DetailProduct.Category))]
            public virtual ICollection<DetailProduct> DetailProducts { get; set; }
        }
    ```
1. Within the Razor View, define a custom method that will construct the items in a format consumable by the Menu. Use the `MenuItemFactory` class.

    ```Razor
    @model IEnumerable<Kendo.Mvc.Examples.Models.Category>

    @functions {

        void GenerateProductItems(Kendo.Mvc.UI.Fluent.MenuItemFactory productItems, Category category)
        {
            foreach (var product in category.Products)
            {
                productItems.Add()
                    .Text(product.ProductName)
                    .HtmlAttributes(new
                    {
                        categoryid = product.CategoryID,
                        productid = product.ProductID,
                        unitprice = product.UnitPrice,
                        unitsinstock = product.UnitsInStock
                    });
            }
        }
    }
    ```
1. Inside the boundaries of the Menu, supplement the composed items by using the [`Items()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/menubuilder#itemssystemaction) configuration method.

    ```HtmlHelper
        @model IEnumerable<Kendo.Mvc.Examples.Models.Category>

        @functions {

            void GenerateProductItems(Kendo.Mvc.UI.Fluent.MenuItemFactory productItems, Category category)
            {
                ...
            }
        }
        
        @(Html.Kendo().Menu()
            .Name("myMenu")
            .Items(items => {
                  foreach (var category in Model)
                  {
                      items.Add()
                        .Text(category.CategoryName)
                        .HtmlAttributes(new
                        {
                            categoryid = category.CategoryID,
                            title = category.Description
                        })
                        .Items(productItems => { GenerateProductItems(productItems, category); });
                  }
              })
        )
    ```
    {% if site.core %}
    ```TagHelper
        @model IEnumerable<Kendo.Mvc.Examples.Models.Category>

        @functions {

            void GenerateProductItems(Kendo.Mvc.UI.Fluent.MenuItemFactory productItems, Category category)
            {
                ...
            }
        }
        
        <kendo-menu name="myMenu">
            <items>
                @{
                    foreach (var category in Model)
                    {
                        <menu-item text="@category.CategoryName" title="@category.Description" categoryid="@category.CategoryID">
                            <sub-items>
                                @{
                                    foreach (var product in category.Products)
                                    {
                                        <menu-item text="@product.ProductName"
                                        categoryid="@product.CategoryID"
                                        productid="@product.ProductID"
                                        unitprice="@product.UnitPrice"
                                        unitsinstock="@product.UnitsInStock"/>
                                    }
                                }
                            </sub-items>
                        </menu-item>
                    }
                 }
            </items>
        </kendo-menu>
    ```
    {% endif %}

1. **Optional** To perform custom client-side logic based on the constructed attributes, handle the [`Select`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/menueventbuilder#selectsystemstring) event of the Menu.

    ```HtmlHelper
    @model IEnumerable<Kendo.Mvc.Examples.Models.Category>

        @functions {

            void GenerateProductItems(Kendo.Mvc.UI.Fluent.MenuItemFactory productItems, Category category)
            {
                ...
            }
        }
        
        @(Html.Kendo().Menu()
            .Name("myMenu")
            .Events(events => events
                .Select("onMenuSelect")
            )
            .Items(items => {
                  foreach (var category in Model)
                  {
                      items.Add()
                        .Text(category.CategoryName)
                        .HtmlAttributes(new
                        {
                            categoryid = category.CategoryID,
                            title = category.Description
                        })
                        .Items(productItems => { GenerateProductItems(productItems, category); });
                  }
              })
        )
    ```
    {% if site.core %}
    ```TagHelper
        @model IEnumerable<Kendo.Mvc.Examples.Models.Category>

        @functions {

            void GenerateProductItems(Kendo.Mvc.UI.Fluent.MenuItemFactory productItems, Category category)
            {
                ...
            }
        }
        
        <kendo-menu name="myMenu" on-select="onMenuSelect">
            <items>
                @{
                    foreach (var category in Model)
                    {
                        <menu-item text="@category.CategoryName" title="@category.Description" categoryid="@category.CategoryID">
                            <sub-items>
                                @{
                                    foreach (var product in category.Products)
                                    {
                                        <menu-item text="@product.ProductName"
                                        categoryid="@product.CategoryID"
                                        productid="@product.ProductID"
                                        unitprice="@product.UnitPrice"
                                        unitsinstock="@product.UnitsInStock"/>
                                    }
                                }
                            </sub-items>
                        </menu-item>
                    }
                 }
            </items>
        </kendo-menu>
    ```
    {% endif %}
    ```JS script.js
        <script>
            function onMenuSelect(e){
                // Gather the constructed custom attributes. 
                let categoryIdAttr = $(ev.item).attr("categoryid");
                let productidAttr = $(ev.item).attr("productid");
            }
        </script>
    ```

For a complete example on the Custom Attributes Binding, refer to the [demo on custom attributes binding of the Menu](https://demos.telerik.com/{{ site.platform }}/menu/menu-bind-attributes).

## See Also

* [Custom Attributes Binding in the Menu (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/menu-bind-attributes)
* [Server-Side API of the Menu HtmlHelper](/api/menu)
{% if site.core %}
* [Server-Side API of the Menu TagHelper](/api/taghelpers/menu)
{% endif %}
* [Client-Side API of the Menu](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu)