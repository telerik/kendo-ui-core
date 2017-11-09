---
title: Access Child Properties in ClientTemplate inside Grid's DetailTemplate
description: An example on how to access properties from the child grid in a child grid's template
type: how-to
page_title: Access Child Properties in ClientTemplate inside Grid's DetailTemplate
slug: grid-child-properties-in-child-template
tags: grid, child, nested, properties, template, detail, detailtemplate, clienttemplate
ticketid: 1139311
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
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

When working with a column ClientTemplate inside of a Grid's DetailTemplate, using the Kendo UI Template Hash Literal notation gives me access to the parent Grid properties but not the Child Grid properties; how can I access the Child Grid properties inside a nested ClientTemplate?

## Solution

Sharp symbols which are not part of the current template scope must be escaped. Child Grids are designed to have the ability to get its parent's property values through ClientTemplates using the syntax `#=ParentProperty#`, but when calling its own property values, the syntax `\\#=OwnProperty\\#` must be used instead.

## See Also

* [Templates Overview.](https://docs.telerik.com/kendo-ui/framework/templates/overview#templates-overview)
* [Important notes about using Hash Literals within Templates.](https://docs.telerik.com/kendo-ui/framework/templates/overview#hash-literals)
* [Detail Template Grid Demo.](http://demos.telerik.com/aspnet-mvc/grid/detailtemplate)
