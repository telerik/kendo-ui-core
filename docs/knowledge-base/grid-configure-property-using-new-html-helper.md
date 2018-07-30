---
title: Set Configuration Property Server Side Globally for Multiple Grids.
description: An example demonstrating how to create a custom Grid helper to set a property globally for multiple grids.
type: how-to
page_title: Configure Property Only Once on the Server Side  for Multiple Grids | UI for ASP.NET MVC Grid
slug: grid-configure-property-using-new-html-helper
tags: grid, mvc, asp.net, property, globally, global, multiple, custom, helper.
ticketid: 1157755
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.620</td>
 </tr>
</table>

## Description

I want to add "No Data Found" as the template shown when there are no records, globally for all the grids in my application. Is there a way?

## Solution

In order to implement the described functionality, create a custom Kendo Grid HTML Helper and set the `NoRecords` property there.

The following is an example helper named MyGrid:

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.UI;
  
namespace MyNamespace
{
    public static class MyHtmlHelperExtensions
    {
        public static Kendo.Mvc.UI.Fluent.GridBuilder<T> MyGrid<T>(this HtmlHelper helper, string name)
            where T : class
        {
            return helper.Kendo().Grid<T>()
            .NoRecords("No data found");
        }
    }
}
```

Then `Html.MyGrid` can be used instead of `Html.Grid` as follows:

```
@(Html.MyGrid<Model>()
  .Name("grid")
  .Columns(columns =>
  {
   ...
  })
  .DataSource(dataSource => dataSource
   ...   
  )
)
```
