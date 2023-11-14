---
title: Using Kestrel in an ASP.NET Core Application with a Dynamic Grid
description: An example on how to a dynamic Telerik UI for ASP.NET Core Grid HtmlHelper with an aplication using Kestrel
type: how-to
page_title: Dynamic Grid Missing on the Page after .NET Core Update
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

After I upgraded `kendo.all.min.js` from version 2019.3.1023 to version 2020.1.114 and ASP.NET Core from 2.2 to 3.1, I have troubles with the dynamic creation of columns and data types.
The functionality works on core 2.2 and doesn't work on core 3.1. No error are reported on the server or client side but the response is not rendering the Grid.

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

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
