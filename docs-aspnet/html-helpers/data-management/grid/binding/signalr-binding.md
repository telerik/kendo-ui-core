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

This article provides step-by-step instructions on using SignalR binding with the Grid.

## SignalR Versions

Two versions of SignalR exist&mdash;[ASP.NET Core SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-8.0) and [ASP.NET SignalR](https://learn.microsoft.com/en-us/aspnet/signalr/overview/getting-started/introduction-to-signalr). It is important to note that ASP.NET Core SignalR  is not compatible with clients or servers for ASP.NET SignalR. This means, for example, that you cannot connect a ASP.NET SignalR server to a client using ASP.NET Core SignalR client library.

The table below highlights the major differences between ASP.NET SignalR and ASP.NET Core SignalR:

<table>
      <thead>
         <tr>
            <th></th>
            <th>ASP.NET SignalR</th>
            <th>ASP.NET Core SignalR</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td><strong>Server NuGet package</strong></td>
            <td>Microsoft.AspNet.SignalR</a></td>
            <td>None. Included in the Microsoft.AspNetCore.App shared framework.</td>
         </tr>
         <tr>
            <td><strong>Client NuGet packages</strong></td>
            <td>Microsoft.AspNet.SignalR.Client<br>Microsoft.AspNet.SignalR.JS</td>
            <td>Microsoft.AspNetCore.SignalR.Client</td>
         </tr>
         <tr>
            <td><strong>JavaScript client npm package</strong></td>
            <td>signalr</td>
            <td>@microsoft/signalr</td>
         </tr>
         <tr>
            <td><strong>Server app type</strong></td>
            <td>ASP.NET (System.Web) or OWIN Self-Host</td>
            <td>ASP.NET Core</td>
         </tr>
         <tr>
            <td><strong>Supported server platforms</strong></td>
            <td>.NET Framework 4.5 or later</td>
            <td>.NET Core 3.0 or later</td>
         </tr>
      </tbody>
</table>

For further details, refer to [the official Microsoft documentation](https://learn.microsoft.com/en-us/aspnet/core/signalr/version-differences?view=aspnetcore-8.0).

{% if site.core %}
>tip The {{ site.product }} Grid uses the [ASP.NET Core SignalR service](https://github.com/telerik/kendo-ui-demos-service/tree/master/signalr-hubs), and the example below demonstrates how to set up the Grid with this service. If you use ASP.NET SignalR, refer to Microsoft's documentation for complete details on configuring the server and client-side hubs and hub connections.

### Setting Up the ASP.NET Core SignalR Service

To configure ASP.NET Core SignalR service, edit the `Program.cs` file and add SignalR to the services collection. Once done, ensure the hubs are mapped, as well.

```
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddSignalR(opt => opt.EnableDetailedErrors = true).AddJsonProtocol(options => {
        options.PayloadSerializerOptions.PropertyNamingPolicy = null;
    });
    ...
    var app = builder.Build();
    ...
    app.MapHub<ProductHub>("/products");

    app.Run();

```
{% else %}
### Setting Up ASP.NET SignalR Service

Complete details on setting up an ASP.NET SignalR service are available in [Microsoft's documentation](https://learn.microsoft.com/en-us/aspnet/signalr/overview/getting-started/tutorial-getting-started-with-signalr). In general, the following steps must be taken:

1. Add the `Microsoft.AspNet.SignalR` NuGet package.
1. Add an OWIN Startup Class and the SignalR configuration.
1. Ensure the hubs are mapped.

```
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here, for example, the Demo Service configuration is below
            app.MapSignalR("/signalr/hubs", new HubConfiguration
            {
                EnableJSONP = true
            });
        }
    }
```
{% endif %}

## Configuring the Hub

SignalR uses [hubs to communicate between clients and servers](https://learn.microsoft.com/en-us/aspnet/core/signalr/hubs?view=aspnetcore-8.0). A hub is a high-level pipeline that allows the client-server communication. The SignalR Hubs API enables you to call methods on connected clients from the server.

The example below demonstrates a sample Hub implementation:

```
    public class ProductHub(SampleEntitiesDataContext context) : Hub
    {
        public override Task OnConnectedAsync()
        {
            Groups.AddToGroupAsync(Context.ConnectionId, GetGroupName());
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception e)
        {
            Groups.RemoveFromGroupAsync(Context.ConnectionId, GetGroupName());
            return base.OnDisconnectedAsync(e);
        }

        public IEnumerable<ProductSignalR> Read()
        {
            var products = context.Products.Select(p => new ProductSignalR
            {
                ID = p.ProductID,
                ProductName = p.ProductName,
                UnitPrice = (double)p.UnitPrice.GetValueOrDefault(),
                UnitsInStock = p.UnitsInStock.GetValueOrDefault(),
                CreatedAt = DateTime.Now.AddMilliseconds(1),
                Category = new CategorySignalR
                {
                    CategoryID = p.Category.CategoryID,
                    CategoryName = p.Category.CategoryName
                }
            }).ToList();

            return products;
        }

        public ProductSignalR Create(ProductSignalR product)
        {
            product.ID = DateTime.Now.Ticks;
            product.CreatedAt = DateTime.Now;
            product.Category ??= new CategorySignalR { CategoryID = 1 };

            Clients.OthersInGroup(GetGroupName()).SendAsync("create", product);
            return product;
        }

        public ProductSignalR Update(ProductSignalR product)
        {
            Clients.OthersInGroup(GetGroupName()).SendAsync("update", product);
            return product;
        }

        public void Destroy(ProductSignalR product)
        {
            Clients.OthersInGroup(GetGroupName()).SendAsync("destroy", product);
        }

        public string GetGroupName()
        {
            return GetRemoteIpAddress();
        }

        public string GetRemoteIpAddress()
        {
            return Context.GetHttpContext()?.Connection.RemoteIpAddress?.ToString();
        }
    }

```

## Including the Client-Side Library

Ensure the client-side library matches the server-side library version. Connecting an ASP.NET SignalR server to a client using ASP.NET Core SignalR client library and vice versa is not supported.

{% if site.core %}
### Configuring the ASP.NET Core SignalR Client-Side Hub

1. Add a reference to the client-side SignalR library.
1. Initialize a hub.
1. Start the hub.

For complete details and API reference on the client-side SignalR library, refer to [Microsoft's documentation](https://learn.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-8.0&tabs=visual-studio).

```JavaScript
    <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/8.0.7/signalr.min.js" integrity="sha512-7SRCYIJtR6F8ocwW7UxW6wGKqbSyqREDbfCORCbGLatU0iugBLwyOXpzhkPyHIFdBO0K2VCu57fvP2Twgx1o2A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        var hubUrl = "path/to/hub";
        var hub = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl,{
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();

        var hubStart = hub.start()
            .then(function (e) {
                $("#notification").data("kendoNotification").success("SignalR Hub Started!");
            })
            .catch(function (err) {
                return console.error(err.toString());
            });
    </script>
```
{% else %}
### Configuring the ASP.NET SignalR Client-Side Hub

If you use the ASP.NET SignalR service, you must use the ASP.NET SignalR client-side library. 

1. Add a reference to the client-side SignalR library.
1. Initialize a hub.
1. Start the hub.

For additional guidance on the client-side API of the ASP.NET SignalR library, refer to [Microsoft's documentation](https://learn.microsoft.com/en-us/aspnet/signalr/overview/guide-to-the-api/hubs-api-guide-javascript-client).
The example below demonstrates the hub configuration:

 ```JavaScript
    <script src="Scripts/jquery.signalR-2.2.1.min.js"></script>
    <script>
        var hubUrl = "path/to/hub";
        var connection = $.hubConnection(hubUrl, { useDefaultPath: false });
        var meetingHub = connection.createHubProxy("products");
        var hubStart = connection.start({ jsonp: true });
    </script>
 ```
{% endif %}

## Configuring the Grid's DataSource

The next steps describe how to set up the `Transport` configuration of the Grid's DataSource to connect to the SignalR Hub.

Instruct the DataSource to use SignalR protocol for transmitting and operating with data in real-time.

```HtmlHelper
@(Html.Kendo().Grid<ProductViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName).Width(150);
        columns.Bound(p => p.UnitsInStock).Width(120);
        columns.Bound(p => p.Category).ClientTemplate("#=Category.CategoryName#").Width(150);
        columns.Bound(p => p.Category.CategoryName).Filterable(false);
        columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
    })
    .ToolBar(c =>
    {
        c.Create();
    })
    .Editable(editable => editable.Mode(GridEditMode.InLine))
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
                model.Id("ID");
                model.Field("ID", typeof(int)).Editable(false);
                model.Field("UnitsInStock", typeof(int));
                model.Field(m => m.Category).DefaultValue(new CategoryViewModel() { CategoryID = 1, CategoryName = "Beverages" });
            })
        )
    )
)
```

## SignalR with Push Notifications

The following example demonstrates a sample implementation of a Grid that uses SignalR to show push notifications.

```JavaScript
$(document).ready(function() {
    var hubUrl = "path/to/hub";
    var hub = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl,{
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .build();

    var hubStart = hub.start()
        .then(function (e) {
            $("#notification").data("kendoNotification").success("SignalR Hub Started!");
        })
        .catch(function (err) {
            return console.error(err.toString());
        });
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
            })
        )
    )
)
```

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [SignalR Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/signalr)
* [Official Microsoft Documentation on Getting Started with {{ site.framework }} SignalR](https://learn.microsoft.com/en-us/aspnet/signalr/overview/getting-started/)
* [Server-Side API](/api/grid)
