---
title: SignalR Binding
page_title: SignalR Binding
description: "Learn the basics of SignalR Binding when working with the Grid component for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_signalrbinding
previous_url: /helpers/html-helpers/grid/signalr-binding
position: 6
---

# SignalR Binding

SignalR allows you to add real-time functionality to your Grid. SignalR takes care of everything behind the scenes that makes real-time client-to-server and server-to-client communications possible. This is useful in collaborative scenarios where multiple parties are editing the Grid simultaneously or in apps that utilize push notifications.

You can use it with both the Telerik UI helpers for MVC and Core because they wrap the [Kendo UI for jQuery Grid](https://docs.telerik.com/kendo-ui/controls/grid/overview).

 For a runnable example, refer to the [demo on SignalR binding of the Grid component](https://demos.telerik.com/{{ site.platform }}/grid/signalr).


> As of the [{{ site.framework }} R2 2018 release](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.1), the suite provides SignalR support for its components.
> The feature is tested with SignalR 1.0.0-rc1-final.

This article provides step-by-step instructions on using SignalR binding with the Grid.

## Setting Up the SignalR Service

Start with installing the SignalR NuGet package and configuring SignalR to connect to Hubs upon SignalR requests:

1. Install the Microsoft.AspNetCore.SignalR NuGet package in your project.

2. Register the service and serialize the returned JSON to PascalCase. Refer to our [JSON Serialization article](https://docs.telerik.com/aspnet-core/compatibility/json-serialization) for more information about serialization.

3. In the `Startup.cs` file of the solution, map the endpoint of the SignalR hub.

```
using SignalR.Mvc;

 public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services
                .AddControllersWithViews()
                // Maintain property names during serialization. See:
                // https://github.com/aspnet/Announcements/issues/194
                .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            // Add Kendo UI services to the services container.
            services.AddKendo();
            // Add SignalR.
            services.AddSignalR().AddJsonProtocol(x => x.PayloadSerializerOptions.PropertyNamingPolicy = null);
        }

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //Some code is omitted for clarity.
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapHub<GridHub>("/gridHub");
            });
        }

```

## Configuring the Hub to Access and Store Data


SignalR uses [hubs to communicate between clients and servers](https://docs.microsoft.com/en-us/aspnet/core/signalr/hubs?view=aspnetcore-2.1). A hub is a high-level pipeline that allows the client-server communication. The SignalR Hubs API enables you to call methods on connected clients from the server.

Define the hub in the `Hubs/GridHub.cs` file:

```
using Core_CustomKendoGrid_with_SignalR.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalR.Mvc
{
    public class GridHub : Hub
    {
        
            public override System.Threading.Tasks.Task OnConnectedAsync()
            {
                Groups.AddToGroupAsync(Context.ConnectionId, GetGroupName());
                return base.OnConnectedAsync();
            }

            public override System.Threading.Tasks.Task OnDisconnectedAsync(Exception e)
            {
                Groups.RemoveFromGroupAsync(Context.ConnectionId, GetGroupName());
                return base.OnDisconnectedAsync(e);
            }

            public IEnumerable<OrderViewModel> Read()
            {

                    var result = Enumerable.Range(1, 50).Select(i => new OrderViewModel
                    {
                        OrderID = i,
                        Freight = i * 10,
                        OrderDate = new DateTime(2016, 9, 15).AddDays(i % 7),
                        ShipName = "ShipName " + i,
                        ShipCity = "ShipCity " + i
                    }).ToList();

                    return result;
                
            }

            public OrderViewModel Create(OrderViewModel product)
            {

                Clients.OthersInGroup(GetGroupName()).SendAsync("create", product);

                return product;
            }

            public void Update(OrderViewModel product)
            {
                Clients.OthersInGroup(GetGroupName()).SendAsync("update", product);
            }

            public void Destroy(OrderViewModel product)
            {
                Clients.OthersInGroup(GetGroupName()).SendAsync("destroy", product);
            }

            public string GetGroupName()
            {
                return GetRemoteIpAddress();
            }

            public string GetRemoteIpAddress()
            {
                return Context.GetHttpContext()?.Connection.RemoteIpAddress.ToString();
            }
        
    }
}

```

## Including the Client-Side Implementation of SignalR in the Page

Connect the View (for example, `Views/Home/Index.cshtml`) to a hub before initializing the Grid that uses the hub.

The SignalR clients ship alongside the server components and are versioned to match. Any supported client can safely connect to any supported server. Refer to the [official SignalR documentation](https://docs.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-2.1) for client-side installation information.


```
<script src="https://unpkg.com/@@aspnet/signalr@1.0.0/dist/browser/signalr.js"></script>
<script>
    //signalR config
    var hubUrl = "/gridHub";

    var hub = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
            transport: signalR.HttpTransportType.LongPolling
        })
        .build();

    var hubStart = hub.start()
</script>
```

> Use Long Polling because [WebSockets](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/websockets?view=aspnetcore-2.1) work only in [some scenarios](https://github.com/aspnet/SignalR/issues/1457#issuecomment-366280873) and [server-sent events](https://caniuse.com/#search=server%20sent%20events) are not supported by IE/Edge.

## Configuring the Grid's DataSource Transport 

The next steps are to configure the Grid's DataSource Transport to connect to the SignalR Hub.
Instruct the data source to use SignalR protocol for transmitting and operating with data in real time.

```HtmlHelper
@(Html.Kendo().Grid<Core_Grid_CRUD.Models.OrderViewModel>()
                .Name("grid")
                .Columns(columns =>
                {
                    columns.Select();
                    columns.Bound(p => p.OrderID).Filterable(true);
                    columns.Bound(p => p.Freight);
                    columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
                    columns.Bound(p => p.ShipName);
                    columns.Bound(p => p.ShipCity).Width(250);
                    columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
                })
                .ToolBar(c =>
                {
                    c.Create();
                    c.Save();
                    c.Search();
                })
                .Scrollable()
                .Sortable()
                .DataSource(dataSource => dataSource
                    .SignalR()
                    .Transport(tr => tr
                        .Promise("hubStart")
                        .Hub("hub")
                        .Client(c => c
                            .Read("read")
                            .Create("create")
                            .Update("update")
                            .Destroy("destroy"))
                        .Server(s => s
                            .Read("read")
                            .Create("create")
                            .Update("update")
                            .Destroy("destroy")))
                    .Schema(schema => schema
                        .Model(model =>
                        {
                            model.Id("OrderID");
                            model.Field("OrderID", typeof(string)).Editable(false);
                            model.Field("Freight", typeof(decimal));
                            model.Field("OrderDate", typeof(DateTime));
                            model.Field("ShipName", typeof(string));
                            model.Field("ShipCity", typeof(string));
                            
                        }
                        )
                    )
            )
```

## SignalR with Push Notifications

The following example demonstrates a sample implementation of a Grid which uses SignalR to show push notifications. The used service is available in [this GitHub repository](https://github.com/telerik/kendo-ui-demos-service/tree/master/signalr-hubs):

```JavaScript
$(document).ready(function() {
    var hubUrl = "http://domain/signalr-service/products";
    var hub = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
            transport: signalR.HttpTransportType.LongPolling
        })
        .build();

    var hubStart = hub.start();
});

function onPush(e) {
    var notification = $("#notification").data("kendoNotification");
    notification.success(e.type);
}

```
```HtmlHelper
@(Html.Kendo().Notification()
        .Name("notification")
        .Width("100%")
        .Position(position => position
            .Top(50)
            .Left(50))
)

@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice);
            columns.Bound(p => p.CreatedAt);
            columns.Command(command =>
            {
                command.Edit();
                command.Destroy();
            }).Width(150);
        })
        .HtmlAttributes(new { style = "height: 550px;margin-bottom:20px;" })
        .ToolBar(toolbar =>
        {
            toolbar.Create();
        })
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Sortable()
        .Scrollable()
        .DataSource(dataSource => dataSource
            .SignalR()
            .AutoSync(true)
            .Events(events => events.Push("onPush"))
            .Transport(tr => tr
                .Promise("hubStart")
                .Hub("hub")
                .Client(c => c
                    .Read("read")
                    .Create("create")
                    .Update("update")
                    .Destroy("destroy"))
                .Server(s => s
                    .Read("read")
                    .Create("create")
                    .Update("update")
                    .Destroy("destroy")))
            .Schema(schema => schema
                .Model(model =>
                {
                    model.Id("ID");
                    model.Field("ID", typeof(string)).Editable(false);
                    model.Field("ProductName", typeof(string));
                    model.Field("CreatedAt", typeof(DateTime));
                    model.Field("UnitPrice", typeof(int));
                }
                )
            )
        )
)
```

## See Also

* [SignalR Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/signalr)
* [Official Microsoft Documentation on Getting Started with {{ site.framework }} SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/get-started?view=aspnetcore-2.1&tabs=visual-studio)
* [Server-Side API](/api/grid)
