---
title: Cannot Get Any Data to Load in Grid
description: The Grid HtmlHelper does not load any records in an ASP.NET Core project.
type: troubleshooting
page_title: The Grid Does Not Show Any Records
slug: grid-is-not-showing-data
tags: grid, data, core, aspnet, not showing, binding, loading, empty, no items, records, returned
ticketid: 1112718
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for {{ site.framework }}</td>
 </tr>
</table>


## Description

When the Grid data is returned from the `Controller` to the client, it is impossible to get any records and load them in any of the Grids in my ASP.NET Core project. What is the cause for this issue and its solution?

## Cause

By default, the data in .NET Core is serialized in camelCase while the property names in the `Model` are usually in PascalCase. As a result, in this scenario, the DataSource of the Grid does not recognize the fields in the data that is returned by the server.

## Solution

Edit the `ConfigureServices` method in the `Startup.cs` file.

```
    public void ConfigureServices(IServiceCollection services)
    {
        ...
        // Maintain property names during serialization. See:
        // https://github.com/aspnet/Announcements/issues/194
        services
            .AddMvc()
            .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

        // Add Kendo UI services to the services container
        services.AddKendo();
    }
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
