---
title: Cannot Get Any Data to Load in Grid
description: The Grid does not load any records in an ASP.NET Core project.
type: troubleshooting
page_title: Grid in ASP.NET Core Does Not Show Any Records | UI for ASP.NET Core
slug: grid-is-not-showing-data
tags: grid, data, core, aspnet, not showing, binding, loading
ticketid: 1112718
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET Core</td>
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
  <td>.Net framework</td>
  <td>Version 1 0</td>
 </tr>
</table>


## Description

When the Grid data is sent from the Controller to the client and I cannot get any records to load in any of the grids in my ASP.NET Core project. What is the cause and how can I handle this issues?

## Cause

By default, the data in .NET Core is serialized in camelCase, while the property names in the Model are usually in PascalCase. As a result, in this scenario the DataSource of the Grid does not recognize the fields in the data that is returned by the server.

## Solution

Edit the `ConfigureServices` method in the `Startup.cs`.  

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

## See Also

[Getting Started with Telerik UI for ASP.NET Core](http://docs.telerik.com/aspnet-core/getting-started/getting-started)
