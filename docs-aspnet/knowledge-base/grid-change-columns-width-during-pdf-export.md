---
title: Change Columns Width During PDF Exporting
description: How can I change the width of the Grid columns when I export them to PDF?
type: how-to
page_title: Change Columns Width During PDF Exporting
slug: grid-change-columns-width-during-pdf-export
tags: aspnet, mvc, grid, change, columns, width, during, pdf, export, exporting
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for {{ site.product_short }} </td>
 </tr>
</table>

## Description

How can I change the width of the Grid columns when I export them to PDF?

## Solution
The PDF Export appends a **k-pdf-export** class to all the elements and then removes it. That is why, you can target the **colgroup > col** setting and use CSS rules.

```

.k-pdf-export colgroup > col {
  width: 50px !important;        
}

.k-pdf-export td {
  white-space: nowrap;
}

```

You can also target specific columns by using the **:nth-child()** selector.

```
.k-pdf-export colgroup > col:nth-child(1),
.k-pdf-export colgroup > col:nth-child(4),
.k-pdf-export colgroup > col:nth-child(7)
{
    width: 150px !important;        
}

```

For example refer to this [Telerik REPL Project](https://netcorerepl.telerik.com/GmOlbYFe44cykJ0K06)

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)