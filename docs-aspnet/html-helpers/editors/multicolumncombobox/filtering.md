---
title: Filtering
page_title: Filtering
description: "Set the filter options of the Telerik UI MultiColumnComboBox component for {{ site.framework }}."
components: ["multicolumncombobox"]
previous_url: /helpers/editors/multicolumncombobox/filtering
slug: filtering_multicolumncombobox_aspnetcore
position: 6
---

# Filtering

The Telerik UI MultiColumnComboBox for {{ site.framework }} allows you to filter the available options by their text to find the respective option quickly.

To enable the MultiColumnComboBox filtering, set the desired filter operator through the [`Filter()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/multicomboboxbuilder#filtersystemstring) method. The supported options are `contains`, `startswith`, and `endswith`. When the filtering feature is enabled, you can specify where the filter operation must be performed:

* [Client Filtering](#client-filtering)
* [Server Filtering](#server-filtering)

## Client Filtering 

By design, when the `Filter()` option is defined, the MultiColumnComboBox filters the data client-side. The filter data operation is performed directly on the client, and no requests are sent to the server. 

## Server Filtering

To enable the server filtering, set the `ServerFiltering` option of the DataSource to `true`. In doing so, the filtering will be performed on the server. The component triggers an AJAX request and sends the search entry and the respective filter operator to the server. As a result, the MultiColumnComboBox data is filtered server-side, and the ready-to-use subset is returned to the client.

```HtmlHelper
        @(Html.Kendo().MultiColumnComboBox()
              .Name("products")
              .Placeholder("Select product")
              .DataTextField("ProductName")
              .DataValueField("ProductID")
              .Columns(columns =>
              {
                  columns.Add().Field("ProductName").Title("Name");
                  columns.Add().Field("ProductID").Title("ID");
              })
              .HtmlAttributes(new { style = "width:100%;" })
              .Filter(FilterType.Contains)
              .AutoBind(false)
              .MinLength(3)
              .DataSource(source =>
              {
                  source.Read(read =>
                  {
                      read.Action("ServerFiltering_GetProducts", "MultiColumnComboBox");
                  })
                  .ServerFiltering(true);
              })
        )
```
{% if site.core %}
```TagHelper
        <kendo-multicolumncombobox auto-bind="false" datatextfield="ProductName" datavaluefield="ProductID" min-length="3" placeholder="Select product" filter="FilterType.Contains" name="products" style="width:100%;">
            <multicolumncombobox-columns>
                <column field="ProductName" title="Name">
                </column>
                <column field="ProductID" title="ID">
                </column>
            </multicolumncombobox-columns>
            <datasource server-filtering="true">
                <transport>
                    <read url="@Url.Action("ServerFiltering_GetProducts", "MultiColumnComboBox")" />
                </transport>
            </datasource>
        </kendo-multicolumncombobox>
```
{% endif %}
```C#
        public JsonResult ServerFiltering_GetProducts(string text)
        {
            using (var northwind = GetContext())
            {
                var products = northwind.Products.Select(product => new ProductViewModel
                {
                    ProductID = product.ProductID,
                    ProductName = product.ProductName,
                    UnitPrice = product.UnitPrice.Value,
                    UnitsInStock = product.UnitsInStock.Value,
                    UnitsOnOrder = product.UnitsOnOrder.Value,
                    Discontinued = product.Discontinued
                });

                if (!string.IsNullOrEmpty(text))
                {
                    products = products.Where(p => p.ProductName.Contains(text));
                }

                return Json(products.ToList());
            }
        }
```

## Multicolumn Filtering

Apart from the standard filter options, the MultiColumnComboBox allows you to set fields against which the data will be filtered.

The `FilterFields()` option accepts the names of the fields as an array of strings.

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Filter("contains")
        .FilterFields(new string[] { "ContactName", "ContactTitle" })
        .Columns(columns =>
        {
            columns.Add().Field("ContactName").Title("Contact Name").Width("200px")
            columns.Add().Field("ContactTitle").Title("Contact Title").Width("200px");
            columns.Add().Field("CompanyName").Title("Company Name").Width("200px");
            columns.Add().Field("Country").Title("Country").Width("200px");
        })
        .DataSource(source => source
            .Read(read => read.Action("Products_Read", "MultiColumnComboBox"))
            .ServerFiltering(true)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-multicolumncombobox  name="multicolumncombobox" 
    filter="FilterType.Contains"
    filter-fields='new string[] { "ContactName", "ContactTitle"}'>
        <multicolumncombobox-columns>
            <column field="ContactName" title="Contact Name" width="200px">
            </column>
            <column field="ContactTitle" title="Contact Title" width="200px">
            </column>
            <column field="CompanyName" title="Company Name" width="200px">
            </column>
            <column field="Country" title="Country" width="200px">
            </column>
        </multicolumncombobox-columns>
        <datasource server-filtering="true">
            <transport>
                <read url="@Url.Action("Products_Read", "MultiColumnComboBox")" />
            </transport>
        </datasource>
    </kendo-multicolumncombobox>
```
{% endif %}

## See Also

* [Server Filtering by the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/serverfiltering)
* [Client Filtering by the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/clientfiltering)
* [Server-Side API](/api/multicolumncombobox)
