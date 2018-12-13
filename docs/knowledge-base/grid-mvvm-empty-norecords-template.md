---
title: Configure the NoRecords Data Attribute for Empty Grids
description: An example on how to add a noRecords.template to an MVVM Kendo UI Grid.
type: how-to
page_title: Customize the NoRecords Template with MVVM | Kendo UI Grid
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

How can I determine the equivalency for the `noRecords.template` which uses data attributes for a Kendo UI MVVM Grid?

## Solution

To set the [`noRecords.template`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/norecords) use the [`data-no-records` data attribute](https://docs.telerik.com/kendo-ui/intro/widget-basics/data-attribute-initialization).

```
<div data-role="grid"      
      data-no-records="{ template : '<br /><br />Here is my No Records Message!'}">
</div>
```

The following example demonstrates how to implement a custom `noRecords` template in a Grid with no bound data.

> **Important**
>
> The camelCase `data` attribute options are set by using [dash separators](https://docs.telerik.com/kendo-ui/intro/widget-basics/data-attribute-initialization#set-data--options). For example, the `noRecords` configuration of the Kendo UI Grid is set like `data-no-records`.


```dojo
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

## See Also

* [Kendo Grid MVVM Demo](https://demos.telerik.com/kendo-ui/grid/mvvm)
* [Documentation on the data Attribute Initialization](https://docs.telerik.com/kendo-ui/intro/widget-basics/data-attribute-initialization)
