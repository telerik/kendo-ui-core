---
title: Position the Null Values Last When Sorting 
description: Show the null value at the end of the Grid when sorting in any order
type: how-to
page_title: Sorting Null Elements to the Bottom | Kendo UI Grid
slug: grid-sort-null-value-end
position: 
tags: grid, sort, sorting, null, bottom, show, end, ascending, descending, order, values, element, last
ticketid: 1432643
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.917</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How do I show the null values at the end of the Grid when I sort it in any order?

## Solution
Use the following custom function in the [columns.sortable.compare](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.sortable#columnssortablecompare) configuration.

```javascript
  columns: [{
    sortable: {
      compare: function (a, b, desc) {
        if (a.name === b.name)
          return 0;
        else if (a.name === null)
          return desc ? -1 : 1;
        else if (b.name === null)
          return desc ? 1 : -1;
        else if (desc)
          return -1;
        else
          return 1;
      }
    }
  }]
```
#### Example

```dojo
  <div id="grid"></div>
  <script>
      var numbers = {
          "one"  : 1,
          "two"  : 2,
          "three": 3
      };

      var dataSource = new kendo.data.DataSource({
          data: [
          { id : 1, name : "a" },
          { id : 2, name : "b" },
          { id : 3, name : "c" },
          { id : 4, name : "d" },
          { id : 5, name : "e" },
          { id : 6, name : null },
          { id : 7, name : "g" }
      ],
      pageSize: 10,
      schema  : {
          model: {
              fields: {
                  id   : { type: 'number' },
                  name : { type: 'string' }
              }
          }
      }
      });

      $("#grid").kendoGrid({
          dataSource: dataSource,
          sortable: true,
          columns: [ { field: "id", title: "id" },
          { 
              field: "name", 
              title: "Name",
              sortable: {
                  compare: function (a, b, desc) {
                    if (a.name === b.name)
                        return 0;
                      else if (a.name === null)
                        return desc ? -1 : 1;
                      else if (b.name === null)
                        return desc ? 1 : -1;
                      else if (desc)
                        return -1;
                      else
                        return 1;
                  }
                }
              }]
      });
  </script>
```
## See Also

- [columns.sortable.compare](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.sortable#columnssortablecompare) configuration
