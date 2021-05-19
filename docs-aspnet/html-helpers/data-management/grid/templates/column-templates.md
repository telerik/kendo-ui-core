---
title: Column Templates
page_title: Column Templates
description: "Get started with the Telerik UI Grid HtmlHelper for {{ site.framework }} and learn how to customize the way the column displays its value."
slug: column_templates_aspnetcore_grid
position: 2
---

# Column Templates

The Grid renders table rows (`tr`) which represent the data source items.

For runnable examples, refer to:
* [Demo on using the row template of the Grid HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/grid/rowtemplate)
* [Demo on using the detail-row template of the Grid HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/grid/detailtemplate)
* [Demo on using the toolbar template of the Grid HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-template)

Each table row consists of table cells (`td`) which represent the Grid columns. By default, the Grid displays the HTML-encoded value of the field in the column.

The following example demonstrates how to set the template as a string and wrap the column value in HTML.

        .Columns(c =>
        {
            c.Bound(f => f.ShipCountry).ClientTemplate("<strong>#= ShipCountry # </strong>");
        })

The following example demonstrates how to set column templates as a Kendo UI template. First compile the template, then pass it to the column.

        <script type="kendo-template" id="my-template">
            <em>#= ShipCountry  # </em>
        </script>
        <script>
            var myTemplate = kendo.template($('#my-template').html());
        </script>
        .Columns(c =>
        {
            c.Bound(f => f.ShipCountry ).ClientTemplate("#=myTemplate(data)#");
        })

The following example demonstrates how to set a column template as a function.

        .Columns(c =>
        {
            c.Bound(f => f.Products).ClientTemplate("#=showProducts(data)#");
        })
        <script>
        function showProducts(data) {
            if (data.Products) {
                var template = "<ul>";
                for (var i = 0; i < data.Products.length; i++) {
                    var product = data.Products[i];                
                    template += kendo.format("<li>Product: {0}, Price: {1:c} </li>", product.ProductName, product.Price)    ;
                }
                template += "</ul>"
                return template;
            }
        }
        </script>

## See Also

* [Templates by the Grid HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-template)
* [Server-Side API](/api/grid)
