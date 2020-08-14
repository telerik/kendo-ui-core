---
title: Numeric column right alignment
description: An example on how to add CSS styling for right alignment of numeric grid's field
type: how-to
page_title: Numeric column right alignment | Kendo UI Grid for ASP.NET Core
slug: grid-numeric-column-add-css-alignment
tags: grid, CSS, alignment, column, numeric
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
</table>


## Description

How can I align a numeric column in Kendo UI Grid?

## Solution

Add a custom class for the needed columns. Apply the appropriate styles using the class name selector. 

```
<column field="UnitPrice" title="Unit Price" html-attributes='new Dictionary<string, object>{ ["class"] = "numericColumn" }'/>

<style>
    .numericColumn {
        text-align: right;
    }
</style>    
```

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)