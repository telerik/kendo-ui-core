---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ListView component for {{ site.framework }}."
previous_url: /helpers/html-helpers/listview, /helpers/data-management/listview/overview, /helpers/data-management/listview/configuration
slug: htmlhelpers_listview_aspnetcore
position: 0
---

# {{ site.framework }} ListView Overview

{% if site.core %}
The Telerik UI ListView TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ListView widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI ListView HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ListView widget.
{% endif %}

The ListView enables you to display a custom layout of data-bound items. The ListView is ideally suited for displaying a list of items in a consistent manner. You can see commonplace examples of its use in the design structures of the Internet, search engine results, tweets from Twitter, Facebook updates, inbox items in Gmail, card lists in Trello, and so on.

The ListView enables you to control the display of data. It does not provide a default rendering of data-bound items. Instead, it relies on templates to define the way a list of items is displayed, including alternating items and items that are in the process of editing.

* [Demo page for the ListView](https://demos.telerik.com/{{ site.platform }}/listview/index)

## Initializing the ListView

The following example demonstrates how to define the ListView.

* The `TagName` of the ListView for {{ site.framework }} is used to create an element to contain all ListView items once the ListView is bound.
* The `ClientTemplateId` is mandatory for the ListView. It contains the `id` of the `script` element which accommodates the item template.


```HtmlHelper
    @(Html.Kendo().ListView() 
        .Name("productListView") // The name of the ListView is mandatory. It specifies the "id" attribute of the widget.
        .TagName("div") // The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
        .ClientTemplateId("template") // This template will be used for rendering the ListView items.
        .DataSource(dataSource => {
                dataSource.Read(read => read.Action("Products_Read", "ListView"));
        }) // The DataSource configuration. It will be used on paging.
        .Pageable() // Enable paging.
    )
```
{% if site.core %}
```TagHelper
    <kendo-listview name="productListView"
        tag-name="div"
        template-id="template">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="9">
            <transport >
                <read url="@Url.Action("Products_Read", "ListView")" />
            </transport>
        </datasource>
        <pageable enabled="true"/>
    </kendo-listview>
```
{% endif %}
```Template
    <script type="text/x-kendo-tmpl" id="template">
        <div class="product">
            <h3>#=ProductName#</h3>
            <dl>
                <dt>Price:</dt>
                <dd>#=kendo.toString(UnitPrice, "c")#</dd>
            </dl>
        </div>
    </script>
```
```Controller
    public partial class ListViewController : BaseController
    {
        private IProductService productService;

        public ListViewController(IProductService service)
        {
            productService = service;
        }
                                      
        public ActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetProducts().ToDataSourceResult(request));
        }

        private IEnumerable<ProductViewModel> GetProducts()
        {
            using (var northwind = GetContext())
            {
                return northwind.Products.Select(product => new ProductViewModel
                {
                    ProductID = product.ProductID,
                    ProductName = product.ProductName,
                    UnitPrice = product.UnitPrice.HasValue ? product.UnitPrice.Value : default(decimal),
                    UnitsInStock = product.UnitsInStock.HasValue ? product.UnitsInStock.Value : default(int),
                    UnitsOnOrder = product.UnitsOnOrder.HasValue ? product.UnitsOnOrder.Value : default(int),
                    Discontinued = product.Discontinued,
                    LastSupply = DateTime.Today
                }).ToList();
            }
        }
    }
```

## Basic Configuration

The following example demonstrates the basic configuration for the ListView.


```HtmlHelper
    @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>(Model)
        .Name("listView")
        .TagName("div")
        .ClientTemplateId("template")
        .DataSource(dataSource => dataSource
            .Model(model => model.Id("ProductID"))
            .PageSize(4)
            .Read(read => read.Action("Editing_Read", "ListView"))
            .Update(update => update.Action("Editing_Update", "ListView"))
            .Destroy(destroy => destroy.Action("Editing_Destroy", "ListView"))
        )
        .Pageable()
        .Editable()
    )
```
{% if site.core %}
```TagHelper
    <kendo-listview name="listView"
        tag-name="div"
        template-id="template"
        edit-template-id="editTemplate">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="4">
            <transport>
                <read url="@Url.Action("Orders_Read", "ListView")"  />
                <update url="@Url.Action("Orders_Update", "ListView")"  />
                <destroy url="@Url.Action("Orders_Destroy", "ListView" )" />
            </transport>
            <schema>
                <model id="ProductID">
                    <fields>
                        <field name="ProductName"></field>
                        <field name="UnitPrice"></field>
                        <field name="UnitsInStock"></field>
                        <field name="Discontinued"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
        <pageable enabled="true"/>
    </kendo-listview>
```
{% endif %}
```Templates
    <script type="text/x-kendo-tmpl" id="template">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>#:ProductName#</dd>
                <dt>Unit Price</dt>
                <dd>#:kendo.toString(UnitPrice, "c")#</dd>
                <dt>Units In Stock</dt>
                <dd>#:UnitsInStock#</dd>
                <dt>Discontinued</dt>
                <dd>#:Discontinued#</dd>
            </dl>
            <div class="edit-buttons">
                <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
                <a class="k-button k-delete-button" href="\\#"><span class="k-icon k-i-delete"></span></a>
            </div>
        </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>
                    <span class="k-textbox k-input k-input-md k-rounded-md k-input-solid">
                        <input type="text" class="k-input-inner" data-bind="value:ProductName" name="ProductName" required="required" validationMessage="required" />
                    </span>
                    <span data-for="ProductName" class="k-invalid-msg"></span>
                </dd>
                <dt>Unit Price</dt>
                <dd>
                    <input type="text" data-bind="value:UnitPrice" data-role="numerictextbox" data-type="number" name="UnitPrice" required="required" min="1" validationMessage="required" />
                    <span data-for="UnitPrice" class="k-invalid-msg"></span>
                </dd>
                <dt>Units In Stock</dt>
                <dd>
                    <input type="text" data-bind="value:UnitsInStock" data-role="numerictextbox" name="UnitsInStock" required="required" data-type="number" min="0" validationMessage="required" />
                    <span data-for="UnitsInStock" class="k-invalid-msg"></span>
                </dd>
                <dt>Discontinued</dt>
                <dd><input type="checkbox" name="Discontinued" data-bind="checked:Discontinued"></dd>
            </dl>
            <div class="edit-buttons">
                <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-update-button" href="\\#"><span class="k-button-icon k-icon k-i-check"></span></a>
                <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-cancel-button" href="\\#"><span class="k-button-icon k-icon k-i-cancel"></span></a>
            </div>
        </div>
    </script>
```
 

## Functionality and Features


|Feature|Description|
|-------|-----------|
| [Ajax binding]({% slug htmlhelpers_listview_aspnetcore_ajaxbinding %}) | You can bind the ListView to an [Ajax DataSource](https://docs.telerik.com/aspnet-core/html-helpers/datasource/types#ajax-datasource) which formats the request and parses the server response out-of-the-box. | 
| [Editing]({% slug htmlhelpers_listview_aspnetcore_editing %}) | To customize the editing functionality of the ListView, configure the provided editing templates. |
| [Paging]({% slug htmlhelpers_listview_aspnetcore_paging %}) | The ListView component supports the paging functionality. |
| [Templates]({% slug htmlhelpers_listview_aspnetcore_templates%}) | To customize the visualization of the ListView items, use the provided [Kendo templates](https://docs.telerik.com/kendo-ui/framework/templates/overview). |
| [Scroll modes]({% slug htmlhelpers_listview_aspnetcore_scrolling %}) | ListView enables you to use the default scroll mode or utilize endless scrolling. |
| [Selection]({% slug htmlhelpers_listview_aspnetcore_selection %}) | Choose between single or multiple selection mode. |
| [Globalization]({% slug globalization_htmlhelpers_listview %}) | The ListView component allows you to adapt your apps for international users by translating the component messages and applying a right-to-left layout. |
| [Accessibility]({% slug accessibility_htmlhelpers_listview %}) | The ListView is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support. |

## Next Steps

* [Getting Started with ListView]({% slug listview_getting_started %})
* [Basic Usage of the ListView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/index)
{% if site.core %}
* [Basic Usage of the ListView TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listview/tag-helper)
{% endif %}

## See Also

* [Basic Usage of the ListView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/index)
* [Server-Side API](/api/listview)
