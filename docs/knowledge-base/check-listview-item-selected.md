---
title: Check If Particular ListView Item Is Selected
description: An example on how to check if a particular item corresponds to a property of the selected items in the Kendo UI ListView.
type: how-to
page_title: Check If Particular Item Is Selected | Kendo UI ListView
slug: check-listview-item-selected
tags: listview, item, selected, check
ticketid: 1134915
res_type: kb
component: listview
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListView</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I check if a certain value corresponds to a DataItem property of the selected ListView items?

## Solution

1. Use the `select` method of the Kendo UI ListView API to get a list of all the selected items.
1. Access its corresponding DataItem and properties by getting their index.

```dojo
<div id="example">

      <div class="demo-section k-content wide">
        <button onclick="checked()">Is <b>Queso Cabrales</b> selected?</button>
        <div id="listView"></div>
        <div id="pager" class="k-pager-wrap"> </div>
      </div>

      <div class="box wide">
        <h4>Console Log</h4>
        <div class="console"></div>
      </div>

      <script type="text/x-kendo-tmpl" id="template">
        <div class="product">
            <img src="../content/web/foods/#:ProductID#.jpg" alt="#:ProductName# image" />
            <h3>#:ProductName#</h3>
        </div>
      </script>

      <script>          
        function checked() {
          var Product = "Queso Cabrales",
              listView = $("#listView").data("kendoListView"),
              selected = listView.select();

          for (let i = 0; i < selected.length; i++)
          {
            var index = $(selected[i]).index(),
                dataItem = listView.dataSource.view()[index];
            if (dataItem.ProductName == Product)
            {
              alert("Queso Cabrales is Selected");
            }
          }
        }

        $(document).ready(function() {
          var dataSource = new kendo.data.DataSource({
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/Products",
                dataType: "jsonp"
              }
            },
            pageSize: 15
          });

          $("#pager").kendoPager({
            dataSource: dataSource
          });

          $("#listView").kendoListView({
            dataSource: dataSource,
            selectable: "multiple",
            dataBound: onDataBound,
            change: onChange,
            template: kendo.template($("#template").html())
          });

          function onDataBound() {
            kendoConsole.log("ListView data bound");
          }

          function onChange() {
            var data = dataSource.view(),
                selected = $.map(this.select(), function(item) {
                  return data[$(item).index()].ProductName;
                });

            kendoConsole.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
          }
        });
      </script>

      <style>
        .product
        {
          float: left;
          width: 220px;
          height: 110px;
          margin: 0;
          padding: 5px;
          cursor: pointer;
        }
        .product img
        {
          float: left;
          width: 110px;
          height: 110px;
        }
        .product h3
        {
          margin: 0;
          padding: 10px 0 0 10px;
          font-size: .9em;
          overflow: hidden;
          font-weight: normal;
          float: left;
          max-width: 100px;
          text-transform: uppercase;
        }
        .k-pager-wrap
        {
          border-top: 0;
        }
        .demo-section .k-listview:after
        {
          content: ".";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }
      </style>
    </div>
```

## See Also

* [API Reference of the `select` Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview/methods/select)
