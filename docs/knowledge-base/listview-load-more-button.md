---
title: ListView Load More Items Button
description: "Learn how to create a \"load more items\" button in the Kendo UI ListView."
type: how-to
page_title: ListView Load More Items Button
slug: listview-load-more-button
tags: kendo, kendo-ui, listview, load, more, fetch, paging
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ListView for jQuery</td>
 </tr>
</table>

## Description

I want to create a behavior similar to the Endless Scrolling functionality, however the items must be loaded when the user clicks on a button.

How can I achieve this functionality?

## Solution

You can use the internal logic of the Endless Scrolling feature to load more items when the user clicks on a button instead of scrolling the component.

```dojo
    <div id="listView"></div>
    <button id="load" class="k-button k-button-md k-button-solid-primary">Load More</button>


    <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="Kendo UI for jQuery ListView #: ProductName #" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
      </div>
    </script>

    <script>
      $("#load").on("click", function() {
        let listview = $("#listView").data("kendoListView");
        var originalPageSize = listview.dataSource.options.pageSize;

        // Implement a custom variation of the Endless scrolling behavior.
        if(!listview._endlessFetchInProgress && listview._endlessPageSize < listview.dataSource.total()) {
          listview._skipRerenderItemsCount = listview._endlessPageSize;
          listview._endlessPageSize = listview._skipRerenderItemsCount + originalPageSize;
          listview.dataSource.options.endless = true;
          listview._endlessFetchInProgress = true;
          listview.dataSource.pageSize(listview._endlessPageSize);
        }
      });

      $(function() {
        var dataSource = new kendo.data.DataSource({
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/Products",
              dataType: "jsonp"
            }
          },
          pageSize: 9
        });

        $("#listView").kendoListView({
          dataSource: dataSource,
          height: 350,
          scrollable: "endless",
          template: kendo.template($("#template").html())
        });

        // Disable the default endless scrolling.
        $("#listView").data("kendoListView").content.off("scroll.kendoListView");
      });
    </script>

    <style>
      #listView {
        padding: 10px 5px;
        margin-bottom: -1px;
        display: flex;
      }
      .product {
        float: left;
        position: relative;
        width: 111px;
        height: 170px;
        margin: 0 5px;
        padding: 0;
      }
      .product img {
        width: 110px;
        height: 110px;
      }
      .product h3 {
        margin: 0;
        padding: 3px 5px 0 0;
        max-width: 96px;
        overflow: hidden;
        line-height: 1.1em;
        font-size: .9em;
        font-weight: normal;
        text-transform: uppercase;
        color: #999;
      }
      .product p {
        visibility: hidden;
      }
      .product:hover p {
        visibility: visible;
        position: absolute;
        width: 110px;
        height: 110px;
        top: 0;
        margin: 0;
        padding: 0;
        line-height: 110px;
        vertical-align: middle;
        text-align: center;
        color: #fff;
        background-color: rgba(0,0,0,0.75);
        transition: background .2s linear, color .2s linear;
        -moz-transition: background .2s linear, color .2s linear;
        -webkit-transition: background .2s linear, color .2s linear;
        -o-transition: background .2s linear, color .2s linear;
      }
      .k-listview:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
    </style>
```