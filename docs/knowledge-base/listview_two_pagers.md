---
title: How to Place Pager at Top and Bottom of ListView
description: Example for displaying two pagers for ListView
type: how-to
page_title: Use two pagers for Progress® Kendo UI® ListView for ASP.NET MVC
slug: listview_two_pagers
position: 0
tags: listview, paging, pager, mvc, kendo ui, two pagers
teampulseid:
ticketid: 1111995
publish: false
pitsid:
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ListView for ASP.NET MVC (version 2017.2 504)</td>
 </tr>
 <tr>
  <td>Progress® Kendo UI® version</td>
  <td>2017.2 504</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2015</td>
 </tr>
 <tr>
  <td>MVC Version</td>
  <td>MVC 5</td>
 </tr>
 <tr>
  <td>View Engine</td>
  <td>Razor</td>
 </tr>
</table>

## Description
I have a ListView with a pager that works great.  The pager is at the bottom of the ListView, but we want it at both the top AND bottom.

## Possible Solution  
The ListView for ASP.NET MVC does not support the functionality out of the box, but you could take a look at the following example, demonstrating such implementation with the Kendo UI ListView:
#### ListView for Kendo UI example
```html
<!DOCTYPE html>
<html>
<head>
    <base href="http://demos.telerik.com/kendo-ui/listview/index">
    <style>html { font-size: 14px; font-family: Arial, Helvetica, sans-serif; }</style>
    <title></title>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.2.504/styles/kendo.common-material.min.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.2.504/styles/kendo.material.min.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.2.504/styles/kendo.material.mobile.min.css" />

    <script src="https://kendo.cdn.telerik.com/2017.2.504/js/jquery.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2017.2.504/js/kendo.all.min.js"></script>
</head>
<body>
<div id="example">

    <script src="../content/shared/js/products.js"></script>

    <div class="demo-section k-content wide">
        <div id="pager1" class="k-pager-wrap"></div>
        <div id="listView"></div>
        <div id="pager2" class="k-pager-wrap"></div>
    </div>

    <script type="text/x-kendo-template" id="template">
        <div class="product">
            #:ProductName#
        </div>
    </script>

    <script>
        $(function() {
            var dataSource = new kendo.data.DataSource({
                data: products,
                pageSize: 21
            });

            $("#pager1").kendoPager({
                dataSource: dataSource
            });
          	$("#pager2").kendoPager({
                dataSource: dataSource
            });

            $("#listView").kendoListView({
                dataSource: dataSource,
                template: kendo.template($("#template").html())
            });
        });
    </script>
</div>
</body>
</html>

```

The same principal could be used with the MVC wrapper, but only in regards of the page at the top. The main idea is to initialize another pager (_with jQuery initialization within document ready_) and pass the dataSource of the ListBox:  

#### ListView for ASP.NET MVC Example
```html
<div id="pager1" class="k-pager-wrap"></div>
@(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("listView")
    .TagName("div")
    ...
    ...
    .Pageable()
)
</div>
<script>
    $(function() {
        var listView = $("#listView").data("kendoListView");
        $("#pager1").kendoPager({
            dataSource: listView.dataSource
        });
    });
</script>
```
