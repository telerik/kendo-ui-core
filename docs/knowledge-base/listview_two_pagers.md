---
title: Place Pagers at Top and Bottom of ListView
description: How to display pagers at the top and bottom of a Kendo UI ListView.
type: how-to
page_title: Place Pagers at Top and Bottom of ListView
slug: listview_two_pagers
position: 0
tags: listview, paging, pager, mvc, kendo ui, two pagers
teampulseid:
ticketid: 1111995
pitsid:
res_type: kb
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

Your project might require you to add a pager both to the top and the bottom of a Kendo UI ListView.

## Possible Solution

By default, the ListView for ASP.NET MVC does not support placing pagers both at its top and bottom. The following examples demonstrate how to work around this issue.

### ListView Widget

The following example demonstrates how to customize the default behavior of the ListView and implement a pager at the top and bottom of the widget.

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

### ListView Wrapper

To add a pager to an MVC ListView wrapper, apply the same configuration approach in regard to the page at the top. The aim is to initialize another pager through a jQuery initialization within `document ready` and pass the `dataSource` of the ListBox.  

The following example demonstrates how to customize the default behavior of the ListView and implement a pager at the top and bottom of the wrapper.

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
