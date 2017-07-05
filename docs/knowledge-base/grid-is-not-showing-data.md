---
title: Cannot Get Any Data to Load in Grid
description: Grid in ASP.NET Core is not showing data
type: troubleshooting
page_title: Grid for ASP.NET Core is not showing any records 
slug: grid-is-not-showing-data
position: 0
tags: grid,data,core,asp.net,not,showing,binding,loading
teampulseid:
ticketid: 1112718
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for ASP.NET Core</td>
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

I can't seem to get any data to load in any of our grids. The data is sent from the Controller to the client.

## Solution

You should edit the **ConfigureServices** method in **Startup.cs** as shown below.  

###### Example

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

## Cause

By default data in .NET Core is serialized in camelCase. However, the property names in the Model are usually in PascalCase. In this scenario the Grid DataSource will not recognize the fields in the data returned from the server.

## See Also

[Getting Started with Progress Telerik UI for ASP.NET Core](http://docs.telerik.com/aspnet-core/getting-started/getting-started)

