---
title: Access Child Properties in ClientTemplate inside DetailTemplate of Grid
description: An example on how to access properties from a child Kendo UI Grid in a child Grid's template.
type: how-to
page_title: Access Child Properties in Nested ClientTemplate | Kendo UI Grid
slug: grid-child-properties-in-child-template
tags: grid, child, nested, properties, template, detail, detailtemplate, clienttemplate
ticketid: 1139311
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

When working with a column `ClientTemplate` inside the `DetailTemplate` of the Grid, using the Kendo UI Template `hash` literal notation gives me access to the parent Grid properties but not to the child Grid properties.

How can I access the child Grid properties inside a nested `ClientTemplate`?

## Solution

Escape sharp symbols that are not part of the current template scope. By design, child Grids are able to get the property values of their parents through `ClientTemplates` by using the `#=ParentProperty#` syntax. However, when you call their own property values, use the `\\#=OwnProperty\\#` syntax instead.

## See Also

* [Templates Overview](https://docs.telerik.com/kendo-ui/framework/templates/overview#templates-overview)
* [Notes on Using Hash Literals within Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview#hash-literals)
* [Detail Template Grid Demo](http://demos.telerik.com/aspnet-mvc/grid/detailtemplate)
