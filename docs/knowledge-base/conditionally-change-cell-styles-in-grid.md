---
title: Conditional style in Grid HtmlHelper cells
description: Change appearance of grid cells based on condition
type: how-to
page_title: Conditionally change appearance of Grid cells
slug: conditionally-change-cell-styles-in-grid
tags: grid,style,template,condition,color,different,core,htmlhelper,mvc,widget
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for ASP.NET Core/Grid for ASP.NET MVC</td>
 </tr>
</table>


## Description

I want to change the appearance of cells in the Grid based on a value in the row.

## Solution

Call JavaScript function from the column ClientTemplate. The DataItem will be available and can be passed as argument to the function. Custom logic can be used to return different templates based on specific condition.

Column definition:

```C#
columns.Bound(c => c.ContactName).ClientTemplate("#=templateFunction(data)#");
```

```JavaScript
function templateFunction(item) {

    if (item.ContactName == "Maria Anders") {
        return "<span class='customClass'>"+ item.ContactName + "</span>";
    }

    return item.ContactName;
}
```

```CSS
.customClass {
    color: red;
}
```

