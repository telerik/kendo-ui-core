---
title: Configure NoRecords Data Attribute for Empty Grid
description: Adding a noRecords.template to a MVVM Kendo UI Grid
type: how-to
page_title: Customize No Records Template with MVVM | Kendo UI Grid
slug: grid-mvvm-empty-norecords-template
tags: grid, mvvm, empty, norecords, template
ticketid: 1123131
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.516</td>
 </tr>
</table>

## Description

What is the equivalency of noRecords.template using data attributes for a Kendo UI Grid using MVVM?

## Solution

Using the [data-no-records data attribute](https://docs.telerik.com/kendo-ui/intro/widget-basics/data-attribute-initialization), you can easily set the [noRecords.template](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/norecords) using the following:
```
<div data-role="grid"      
      data-no-records="{ template : '<br /><br />Here is my No Records Message!'}">
</div>
```

This example demonstrates a Kendo UI Grid with no bound data and a custom noRecords Template:

```html
    <div id="example">
      <div>
        <h4>Add or update a record</h4>
        <!--For DataSource, add: data-bind="source: products" -->
        <div data-role="grid"
             data-columns="[
                           { 'field': 'ProductName', 'width': 270 },
                           { 'field': 'UnitPrice' },
                           ]"          
             data-no-records="{ template : '<br /><br />Here is my No Records Message!'}"            
             style="height: 200px">
        </div>
      </div>


      <script>
        var viewModel = kendo.observable({
          products: new kendo.data.DataSource({
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductName: { type: "string" },
                  UnitPrice: { type: "number" }
                }
              }
            },
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/products",
                dataType: "jsonp"
              }
            }
          })
        });
        kendo.bind($("#example"), viewModel);
      </script>
    </div>
```

## Notes

The camelCase data attribute options are set [using dash-separators](https://docs.telerik.com/kendo-ui/intro/widget-basics/data-attribute-initialization#set-data--options). For example, the noRecords configuration of the Kendo UI Grid is set like **data-no-records**.

## See Also

* [Kendo Grid MVVM Demo](https://demos.telerik.com/kendo-ui/grid/mvvm)
* [Data Attribute Initialization - Documentation](https://docs.telerik.com/kendo-ui/intro/widget-basics/data-attribute-initialization)

