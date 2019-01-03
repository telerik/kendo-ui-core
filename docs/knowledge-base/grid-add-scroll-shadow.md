---
title: Add Scroll Shadow in Scrollable Grid
description: An example on how to add top and bottom shadows on scroll to a Kendo UI Grid.
type: how-to
page_title: Add Top and Bottom Scroll Shadows | Kendo UI Grid
slug: grid-add-scroll-shadow
tags: grid, shadow
ticketid: 1365055
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
  		<td>Progress Kendo UI Grid</td>
	</tr>
	<tr>
		<td>Progress Kendo UI version</td>
		<td>Tested up to version 2018.3.1017</td>
	</tr>
</table>

## Description

How can I add top and bottom scroll shadows which disappear when the Grid is scrolled to top or bottom?

## Solution

1. Handle the  [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event&mdash;in the event handler, [`wrap`](https://api.jquery.com/wrap/) the `.k-grid-element` in a `div` element and, depending on the scroll position and the height of the scrollable element, add classes to the `div`:
	1. If the height of the scrollable element is bigger than the fixed height of the table, add a bottom shadow.
	1. When the element is scrolled down, add a top shadow.
	1. When the element is scrolled to the very bottom, remove the bottom shadow.
	1. When the element is scrolled to the very top, remove the top shadow.
1. Add inline CSS for styling the top and bottom shadows.
	* To change the color, modify the `rgba` value.
	* To change the height of the shadows, edit the `height` CSS property.

```dojo
  <style>
    .box-shadow-wrapper {
        position: relative;
    }

    .box-shadow-wrapper table {
        position: static;
    }

    .box-shadow-wrapper.top-shadow:before {
        content: "";
        height: 20px;
        position: absolute;
        top: 0;
        bottom: auto;
        width: 100%;
        background-image: -webkit-linear-gradient(rgba(243, 88, 0, 0.5), rgba(255, 255, 255, 0.5));
        background-image: -moz-linear-gradient(rgba(243, 88, 0, 0.5), rgba(255, 255, 255, 0.5));
        background-image: -o-linear-gradient(rgba(243, 88, 0, 0.5), rgba(255, 255, 255, 0.5));
        background-image: linear-gradient(rgba(243, 88, 0, 0.5), rgba(255, 255, 255, 0.5));
        z-index: 1;
    }

    .box-shadow-wrapper.bottom-shadow:after {
        content: "";
        height: 20px;
        width: 100%;
        position: absolute;
        top: auto;
        bottom: 0;
        background-image: -webkit-linear-gradient(rgba(255, 255, 255, 0.5), rgba(243, 88, 0, 0.5));
        background-image: -moz-linear-gradient(rgba(255, 255, 255, 0.5), rgba(243, 88, 0, 0.5));
        background-image: -o-linear-gradient(rgba(255, 255, 255, 0.5), rgba(243, 88, 0, 0.5));
        background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(243, 88, 0, 0.5),);
        z-index: 1;
    }

  </style>

  <div id="example">
    <div id="grid"></div>
    <script>
      $(document).ready(function () {
        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            },
            pageSize: 20
          },
          height: 550,
          groupable: true,
          sortable: true,
          dataBound: function(e){
            var grid = e.sender;
            var scrollElement = grid.element.find('.k-grid-content.k-auto-scrollable');

            scrollElement.wrap('<div class="box-shadow-wrapper"></div>');

            var shadowWrap = $('.box-shadow-wrapper');

            if (shadowWrap.outerHeight() < grid.table.outerHeight()) {
              shadowWrap.addClass('bottom-shadow');
            }

            $(scrollElement).on('scroll', function() {
              if($(this).scrollTop() > 0) {
                shadowWrap.addClass('top-shadow');
              } else {
                shadowWrap.removeClass('top-shadow');
              }

              if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                shadowWrap.removeClass('bottom-shadow');
              } else {
                shadowWrap.addClass('bottom-shadow');
              }
            })
          },
          pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
          },
          columns: [{
            field: "ContactName",
            title: "Contact Name",
            width: 240
          }, {
            field: "ContactTitle",
            title: "Contact Title"
          }, {
            field: "CompanyName",
            title: "Company Name"
          }, {
            field: "Country",
            width: 150
          }]
        });
      });
    </script>
  </div>

```
