---
title: Conditionally Change Cell Styles in Grid HtmlHelpers
description: An example on how to change the appearance of the Grid cells based on condition in ASP.NET Core projects.
type: how-to
page_title: Conditionally Change the Appearance of Grid Cells | Kendo UI Grid for ASP.NET Core
slug: conditionally-change-cell-styles-in-grid
tags: grid, style, template, condition, color, different, core, htmlhelper, mvc, widget
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>UI for ASP.NET Core/ UI for ASP.NET MVC</td>
 </tr>
</table>


## Description

How can I change the appearance of the Grid cells based on a value in the row in ASP.NET Core projects?

## Solution

1. From the column `ClientTemplate`, call the JavaScript `templateFunction` function. As a result, the `DataItem` becomes available.
1. Pass the `DataItem` as an argument to the function.
1. Use custom logic, based on the specific condition, to return different templates.

The following example demonstrates how to apply the column definition.

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
