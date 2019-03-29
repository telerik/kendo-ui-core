---
title: Prevent PageSscroll When DropDownList is Opened
description: An example on how to prevent the scrolling of the page when the Kendo UI DropDownList is opened.
type: how-to
page_title: Prevent Scrolling of the Page on Opening | Kendo UI DropDownList
slug: dropdownlist-prevent-page-scroll
tags: prevent, page, scroll, dropdownlist, open
res_type: kb
component: dropdownlist
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DropDownList</td>
 </tr>
</table>

## Description

How can I prevent the page scroll when the DropDownList is opened?

## Solution

1. Query the `ul` element of the DropDownList and attach a `wheel` event handler to its parent.
1. Prevent the default action if the scroll is at the beginning or at the end of the DropDownList ListView.

```dojo
<div id="example">
    <br/><br/><br/><br/><br/><br/><br/><br/>
    <div id="example" style="min-height: 2000px; padding: 30px;">
        <input id="products" style="width: 400px" />
    </div>
</div>

<script>
    $(function() {
          $("#products").kendoDropDownList({
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            dataSource: {
              transport: {
                read: {
                  dataType: "jsonp",
                  url: "https://demos.telerik.com/kendo-ui/service/Products",
                }
              }
            },
            value: "74"
          });

          var widget = $("#products").data("kendoDropDownList");

          widget.ul.parent().on("wheel", function(e) {
            var container = this;

            if ((container.scrollTop == 0 && e.originalEvent.deltaY < 0) ||
                (container.scrollTop == container.scrollHeight - container.offsetHeight &&
                 e.originalEvent.deltaY > 0)) {
              e.preventDefault();
              e.stopPropagation();
            }

          });
        });
</script>

```
