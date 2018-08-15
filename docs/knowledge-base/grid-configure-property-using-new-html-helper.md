---
title: Set Configuration Property Globally on the Server for Multiple Grids
description: An example demonstrating how to create a custom Grid helper to set a property globally for multiple grids.
type: how-to
page_title: Globally Configure Properties on the Server for Multiple Grids | Telerik UI for ASP.NET MVC Grid
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

How can I add **No Data Found** as a global template for all Grid in my application and show it when no records are available?

## Solution

1. Create a custom Kendo UI Grid HtmlHelper.
1. In the custom HtmlHelper, set the `NoRecords` property.

    The following example demonstrates how to create a custom `MyGrid` HtmlHelper.

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

1. Use `Html.MyGrid` instead of `Html.Grid`.

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
