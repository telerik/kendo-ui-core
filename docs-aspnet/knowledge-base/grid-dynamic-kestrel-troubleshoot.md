---
title: Use Kestrel in an ASP.NET Core application with dynamic Grid
description: An example on how to a dynamic Telerik UI for ASP.NET Core Grid HtmlHelper with an aplication using Kestrel
type: how-to
page_title: Dynamic Grid missing on the page after .NET Core update
slug: grid-dynamic-kestrel-troubleshoot
tags: aspnet, core, dotnet-core, kendo, kendo-ui, grid, dynamic, kestrel, 3.1
res_type: kb
ticketid: 1450544
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

After I upgraded `kendo.all.min.js` from v2019.3.1023 to v2020.1.114 and ASP.NET Core from 2.2 to 3.1 I have trouble with the dynamic creation of columns and datatypes.
The functionality works on core 2.2 and doesn't work on core 3.1. The main problem is that there is no error reported server or client side. The response is just not rendering the grid.

## Solution

After I deleted almost everything an error occured:

```
    Synchronous operations are disallowed. Call WriteAsync or set AllowSynchronousIO to true instead.
```

It appears that .NET Core changed the defaults so you need to add the following code in `Startup.cs`:

```
    services.Configure<IISServerOptions>(options =>
    {
        options.AllowSynchronousIO = true;
    });
```
