---
title: Prevent page scroll when DropDownList is opened
description: An example on how to prevent page scroll when DropDownList is opened.
type: how-to
page_title: Prevent page scroll when DropDownList is opened | Kendo UI DropDownList
slug: dropdownlist-prevent-page-scroll
tags: prevent, page, scroll, dropdownlist, open
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DropDownList</td>
 </tr>
</table>

## Description

How to prevent page scroll when DropDownList is opened?

## Solution

* Query the DropDownList `ul` element and attach a `wheel` event handler to its parent.
* Prevent default action if scroll is at the beginning or end of the DropDownList ListView.

```html
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
                  url: "http://demos.telerik.com/kendo-ui/service/Products",
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
