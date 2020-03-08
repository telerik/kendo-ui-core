---
title: Enable Only Horizontal Pager
description: Set the pager of the Kendo UI Grid to allow only the horizontal appearance and prevent the vertical dropdownlist.
type: how-to
page_title: Prevent Pager from Displaying Vertically | Kendo UI Grid
slug: grid-enable-only-horizontal-pager
position: 
tags: grid, pager, responsive, horizontal
ticketid: 1445455
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.1023</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
What is the best way to set the pager's appearance to be shown only as horizontally?  How can I make it so the Grid's pager doesn't change?

## Solution
The pager can be set to always display as horizontal by changing the [pageable.responsive property](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/pageable.responsive) to false.

```javascript
      $("#grid").kendoGrid({
        pageable: {
          responsive: false
        },
       //...
      });
```

#### Example

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "productName" },
          { field: "category" }
        ],
        dataSource: [
          { productName: "Tea", category: "Beverages" },
          { productName: "Coffee", category: "Beverages" },
          { productName: "Ham", category: "Food" },
          { productName: "Bread", category: "Food" }
        ],
        pageable: {
          pageSize: 2,
          responsive: false
        }
      });
    </script>
```

## See Also
* [pageable.responsive - API Reference/Kendo UI Grid for jQuery](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/pageable.responsive)
