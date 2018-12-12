---
title: Allow Endless Scrolling of Remote Data in ListView
description: An example on how to create an endless scrolling in the Kendo ListView
type: how-to
page_title: Enable Endless Scrolling of Remote Data | Kendo UI ListView
slug: listview-endless-scrolling
tags: listview, list, view, endless, infinite, scroll, remote, data
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
  <td>Progress Kendo UI version</td>
  <td>Created with version 2018.1.117</td>
 </tr>
</table>

## Description

How can I create an infinite scroll in the ListView?

## Solution

1. Add an additional data source which will request new data once the user scrolls to the bottom of the ListView.
1. Attach an event handler to the scroll of the ListView which will be fired when the user scrolls to the bottom.
1. In the scroll handler, request new items by using the [`query`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-query) method of the additional data source.
1. Once the requested items are received, add them to the data source of the ListView by using the [`add`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-add) method.

```dojo
    <div id="example">

      <div class="demo-section k-content wide">
        <div id="listView"></div>
      </div>

      <script type="text/x-kendo-template" id="template">
        <div id="#=OrderID#" class="product">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= EmployeeID #.jpg" alt="#: ShipCity # image" />
            <h3>#:ShipName#</h3>
            <p>#:ShipCity#</p>
        </div>
      </script>

      <script>
        $(function() {
          jQuery.fn.scrollTo = function(elem) {
            $(this).scrollTop($(this).scrollTop() - $(this).offset().top + elem.offset().top);
            return this;
          };

          var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders",
                type: "POST"
              }
            },
            pageSize: 6,			
            serverPaging: true,
          });

          var dataSourceScroll = new kendo.data.DataSource({
            type: "odata",
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders",
                type: "POST"
              }
            },
            pageSize: 6,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
          });



          $("#listView").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#template").html())
          });

          var page = 1;
          $('#listView').on('scroll', function () {

            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
              page++;
              var lastItem = $('#listView .product').last();
              var listView = $('#listView').data('kendoListView');
              dataSourceScroll.query({
                page: page,
                pageSize: 6
              }).then(function () {
                dataSourceScroll.data().forEach(x => {
                  listView.dataSource.add(x);
                  $('#listView').scrollTo(lastItem);
                })
              });

            }
          })
        });
      </script>

      <style>

        #listView{
          width: 270px;
          height:400px;
          overflow-y:scroll;
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
    </div>
```
