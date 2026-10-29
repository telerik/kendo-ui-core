---
title: Binding a ListView in a TabStrip with {{ site.product }}
description: "Explains how to fix ListView binding issues inside a TabStrip in {{ site.product }} applications via Ajax."
type: how-to
page_title: Fixing ListView Binding Issues in a TabStrip with {{ site.product }}
slug: listview-databinding-in-tabstrip
tags: listview, tabstrip, databinding, ajax, schema, asp.net core, asp.net mvc
ticketid: 1719305
ticketed: true
res_type: kb
components: ["grid", "listview", "tabstrip"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid, ListView, and TabStrip</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>2021.2.616</td>
 </tr>
</table>

## Description

When a Grid client detail template contains a TabStrip and a ListView, the ListView may not bind when declared as a TagHelper.

The nested Kendo template can prevent the ListView from completing its data request in this configuration. This article shows how to initialize the ListView after the Grid detail row renders. It also shows the equivalent HtmlHelper configuration.

## Solution

### Using HtmlHelpers

HtmlHelpers can render the ListView configuration directly in the client template. Call `ToClientTemplate()` on both the nested ListView and the TabStrip.

```HtmlHelper.skip-repl
@(Html.Kendo().TabStrip()
    .Name("tabStrip_#=CategoryID#")
    .Items(items =>
    {
        items.Add()
            .Text("Products ListView")
            .Content(@<text>
                @(Html.Kendo().ListView<Product>()
                    .Name("productsListView_#=CategoryID#")
                    .TagName("div")
                    .ClientTemplateId("product-listview-item-template")
                    .DataSource(dataSource => dataSource
                        .Ajax()
                        .PageSize(10)
                        .Model(model => model.Id(product => product.ProductID))
                        .Read(read => read.Url(
                            Url.Action("ProductsListView", "Home") +
                            "?categoryId=#=CategoryID#"
                        ))
                    )
                    .Pageable()
                    .ToClientTemplate()
                )
            </text>);
    })
    .ToClientTemplate()
)
```

{% if site.core %}
### Using TagHelpers

When you place a TagHelper inside a Kendo client template, use `type="text/html"` on the template and set `is-in-client-template="true"` on the Kendo component.

In this scenario, define the ListView container as a regular `div`. Store the category ID in a `data-*` attribute, then initialize the ListView in the Grid `detailInit` event.

```Razor.skip-repl
@addTagHelper *, Kendo.Mvc

<script id="category-detail-template" type="text/html">
    <kendo-tabstrip name="tabStrip_#=CategoryID#" is-in-client-template="true">
        <items>
            <tabstrip-item text="Products ListView">
                <content>
                    <div class="products-listview" data-category-id="#=CategoryID#"></div>
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
</script>
```

Define the ListView item template separately.

```HTML.skip-repl
<script id="product-listview-item-template" type="text/x-kendo-template">
    <div class="product-card">
        <strong>#: ProductName #</strong>
    </div>
</script>
```

Initialize the ListView after the Grid detail row renders.

```JS.skip-repl
<script>
    var productCardTemplate = null;

    function onCategoriesGridDetailInit(e) {
        if (!productCardTemplate) {
            productCardTemplate = kendo.template(
                $("#product-listview-item-template").html()
            );
        }

        e.detailRow.find(".products-listview").each(function () {
            var categoryId = $(this).data("categoryId");

            $(this).kendoListView({
                dataSource: {
                    transport: {
                        read: {
                            url: '@Url.Action("ProductsListView", "Home")',
                            data: {
                                categoryId: categoryId
                            }
                        }
                    },
                    schema: {
                        data: "Data",
                        total: "Total"
                    },
                    serverPaging: true,
                    pageSize: 10
                },
                pageable: true,
                template: productCardTemplate
            });
        });
    }
</script>
```

The `schema.data` and `schema.total` settings match the `DataSourceResult` response returned by the server. Use them when initializing the ListView with the jQuery API as shown above.
{% endif %}

## Key Points

1. When using HtmlHelpers inside a client template, call `ToClientTemplate()` on each nested helper.
2. Use a `data-*` attribute to pass dynamic values such as `CategoryID` to the ListView initialization code.
3. When using the jQuery ListView API, configure `schema.data` and `schema.total` to match the server response.
{% if site.core %}
4. For Core TagHelpers inside a Kendo client template, use `type="text/html"` and `is-in-client-template="true"`.
5. In the TagHelper workaround, initialize the ListView after the Grid detail row renders.
{% endif %}

## See Also

- [{{ site.framework }} ListView Ajax Binding]({% slug htmlhelpers_listview_aspnetcore_ajaxbinding %})
- [{{ site.framework }} ListView Documentation]({% slug htmlhelpers_listview_aspnetcore %})
- [{{ site.framework }} TabStrip Documentation]({% slug htmlhelpers_tabstrip_aspnetcore %})
- [{{ site.framework }} Grid Client Detail Templates]({% slug clientdetailtemplate_grid_aspnetcore %})
- [Schema Configuration](https://www.telerik.com/kendo-jquery-ui/documentation/api/data/datasource/configuration/schema#schemadata)
- [Grid `detailInit` Event](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/detailinit)
- [HTMLElement.dataset - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
