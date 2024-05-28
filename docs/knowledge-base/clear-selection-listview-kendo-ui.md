---
title: Clearing Selection in ListView by Clicking on an Empty Space
description: Learn how to deselect a ListView item by clicking on an empty area within the ListView container.
type: how-to
page_title: How to Deselect ListView Items on Empty Space Click in Kendo UI
slug: clear-selection-listview-kendo-ui
tags: kendo-ui, listview, clear, selection, deselect, click, empty, space
res_type: kb
category: knowledge-base
ticketid: 1652797
---

## Environment

| Product | Version |
|---|---|
| ListView for Progress® Kendo UI® | 2024.2.514 |

## Description

I want to clear the selected item in the ListView when selecting an empty space. After selecting any item, clicking on an empty area does not clear the current selection.

This KB article also answers the following questions:
- How can I deselect ListView items by clicking outside of them?
- What method allows clearing the selection in a Kendo UI ListView?
- Is it possible to deselect items in ListView on empty space click?

## Solution

To clear the selection in a ListView by clicking on an empty space, follow these steps:

1. Attach a click event listener to the ListView's container.
2. Check if the click target is the container itself or an empty area within it.
3. Use the ListView's `clearSelection` method to clear the current selection if the click is on an empty space.

Below is an example how to implement this functionality:

```dojo

      <script src="../content/shared/js/products.js"></script>

      <div id="listView"></div>

      <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="../content/web/foods/#= ProductID #.jpg" alt="Kendo UI for jQuery ListView #: ProductName #" />
            <h3>#:ProductName#</h3>
        </div>
      </script>

      <script>
        $(function () {
          $("#listView").kendoListView({
            selectable: true,
            dataSource: {
              data: products,
              pageSize: 21
            },
            template: kendo.template($("#template").html()),
            pageable: true
          });

          // Attach click event listener to the ListView's container
          $("#listView").on("click", ".k-listview-content", function(e){          
            var listView = $("#listView").data("kendoListView");

            if(!$(e.target).is('img')){ 
              listView.clearSelection();              
            }
          })
        });
      </script>

      <style>
        #listView {
          padding: 10px 5px;
          margin-bottom: -1px;
          min-height: 510px;
          /* Avoid cutout if font or line is bigger */
          font: inherit;
        }

        .k-listview-content {
          overflow: hidden;
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

        .k-listview:after {
          content: ".";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }
      </style>
```

You can check this Dojo example for a complete example.

For more details on the ListView component and its API, refer to the official [ListView](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview) documentation.

## Notes

- Ensure that the ListView's `selectable` option is enabled to utilize selection features.
- This approach relies on detecting clicks on the container itself, excluding clicks on child elements, to identify empty space clicks.

## See Also

- [Official ListView Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview)
- [ListView Selection API](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview/methods/clearselection)
