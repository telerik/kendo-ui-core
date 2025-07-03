---
title: SignalR Binding
page_title: SignalR Binding
description: "Get started with the Scheduler component for {{ site.framework }} and learn how to configure it for SignalR Binding."
slug: htmlhelpers_scheduler_signalr_binding_aspnetcore
position: 4
---

# SignalR
[SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-5.0) is a library maintained by Microsoft that simplifies adding real-time web functionality to web applications, requiring high-frequency updates in real-time to all connected clients.

## Versions

ASP.NET Core SignalR isn't compatible with clients or servers for ASP.NET SignalR. This means, for example, that you cannot connect a ASP.NET SignalR server to a client using ASP.NET Core SignalR client library.
The table below highlights major differences between ASP.NET SignalR and ASP.NET Core SignalR

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

For further details refer to [the official Microsoft documentation](https://docs.microsoft.com/en-us/aspnet/core/signalr/version-differences?view=aspnetcore-5.0).

# ASP.NET SignalR configuration 

 The [Scheduler SignalR Demo](https://demos.telerik.com/{{ site.platform }}/scheduler/signalr) and the [SignalR Meeting hub](https://github.com/telerik/kendo-ui-demos-service/blob/master/demos-and-odata-v3/KendoCRUDService/Hubs/MeetingHub.cs) are built using Microsoft.AspNet.SignalR and v1.1.3 of the client-side scripts.

 To setup an application to use the Scheduler for {{ site.framework }} and the Microsoft.AspNet.SignalR library you need to:
 * Map to the hub when application starts
 ```C#
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
 
 * Create a [Hub with CRUD operation support](https://github.com/telerik/kendo-ui-demos-service/blob/master/demos-and-odata-v3/KendoCRUDService/Hubs/MeetingHub.cs)
 * Configure the Scheduler for SignalR binding and the client-side hub connection
 ```JavaScript
    <script src="~/shared/web/integration/jquery.signalr-1.1.3.min.js"></script>
    <script>
        var hubUrl = "path/to/hub";
        var connection = $.hubConnection(hubUrl, { useDefaultPath: false });
        var meetingHub = connection.createHubProxy("meetingHub");
        var hubStart = connection.start({ jsonp: true });

        function onPush(e) {
            var notification = $("#notification").data("kendoNotification");
            notification.success(e.type);
        }
    </script>
 ```
 ```HtmlHelper
    @(Html.Kendo().Notification()
        .Name("notification")
        .Width("100%")
        .Position(position => position
            .Top(0)
            .Left(0))
    )

    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingSignalRViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.MonthView();
            views.AgendaView();
            views.TimelineView();
        })
        .Timezone("Etc/UTC")
        .Resources(resource =>
        {
            resource.Add(m => m.RoomID)
                .Title("Room")
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] {
                        new { Text = "Meeting Room 101", Value = 1, Color = "#6eb3fa" },
                        new { Text = "Meeting Room 201", Value = 2, Color = "#f58a8a" }
                });
            resource.Add(m => m.Attendees)
                .Title("Attendees")
                .Multiple(true)
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] {
                        new { Text = "Alex", Value = 1, Color = "#f8a398" },
                        new { Text = "Bob", Value = 2, Color = "#51a0ed" },
                        new { Text = "Charlie", Value = 3, Color = "#56ca85" }
                });
        })
        .DataSource(dataSource => dataSource
            .SignalR()
            .Events(events => events.Push("onPush"))
            .Transport(tr => tr
                .Promise("hubStart")
                .Hub("meetingHub")
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
                    model.Id(m => m.ID);
                    model.Field(m => m.ID).Editable(false);
                    model.Field("start", typeof(DateTime)).From("Start");
                    model.Field("end", typeof(DateTime)).From("End");
                    model.Field("title", typeof(string)).From("Title");
                    model.Field("description", typeof(string)).From("Description");
                    model.Field("recurrenceID", typeof(int)).From("RecurrenceID");
                    model.Field("recurrenceRule", typeof(string)).From("RecurrenceRule");
                    model.Field("recurrenceException", typeof(string)).From("RecurrenceException");
                    model.Field("isAllDay", typeof(bool)).From("IsAllDay");
                    model.Field("startTimezone", typeof(string)).From("StartTimezone");
                    model.Field("endTimezone", typeof(string)).From("EndTimezone");
                })
            )
        )
    )
 ```

# ASP.NET Core SignalR configuration 

There are several major diferences when configuring ASP.NET Core SignalR compared to ASP.NET SignalR.  See the implementation details in the example below and for a complete example navigate to our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.Mvc) with code examples.

The steps below outline what you need to do to configure the Scheduler HtmlHelper for {{ site.framework }} when using ASP.NET Core SignalR.
* ASP.NET Core SignalR is an ASP.NET Core middleware. Therefore, on the server, you will need to add it in the ConfigureServices method and also map routes to hubs:
```C# Startup.cs
    public void ConfigureServices(IServiceCollection services)
    {
        // Add framework services.
        services
            .AddControllersWithViews()
            .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
            // Maintain property names during serialization. See:
            // https://github.com/aspnet/Announcements/issues/194
            // https://docs.telerik.com/aspnet-core/compatibility/json-serialization
            .AddNewtonsoftJson(options => 
                options.SerializerSettings.ContractResolver = new DefaultContractResolver());

        // Add Kendo UI services to the services container
        services.AddKendo();
        // Add SignalR services to the services container
        services.AddSignalR().AddJsonProtocol(options => {
            options.PayloadSerializerOptions.PropertyNamingPolicy = null;
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        //Additional configuraions

        app.UseEndpoints(endpoints =>
        {
            // Map route to Hub
            endpoints.MapHub<MeetingHub>("/meetingHub");
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });
    }
```

* Configure a Hub with CRUD methods
```C#
    public class MeetingHub : Hub
    {
        //static collection used for Demo purposes. You can fetch events from a database, for example.
        public static List<MeetingSignalRViewModel> Meetings { get; set; }

        public MeetingHub()
        {
            Meetings = new List<MeetingSignalRViewModel>();
        }

        public async Task<MeetingSignalRViewModel> Create(MeetingSignalRViewModel item)
        {
            item.ID = Guid.NewGuid();
            Meetings.Add(item);

            await Clients.Others.SendAsync("CREATE", item);

            return item;
        }

        public IEnumerable<MeetingSignalRViewModel> Read()
        {
            return Meetings;
        }

        public async Task Update(MeetingSignalRViewModel item)
        {
            var target = Meetings.FirstOrDefault(x => x.ID == item.ID);
            target = item;

            await Clients.Others.SendAsync("UPDATE", item);
        }

        public async Task Destroy(MeetingSignalRViewModel item)
        {
            var target = Meetings.Find(x => x.ID == item.ID);
            Meetings.Remove(target);

            await Clients.Others.SendAsync("DESTROY", item);
        }
    }
```

* Configure the Scheduler for ASP.NET Core SignalR binding and the client-side hub connection:
```JavaScript
    <script src="~/js/signalr/dist/browser/signalr.min.js"></script>
    <script>
        "use strict";
        
        var meetingHubConnection = new signalR.HubConnectionBuilder().withUrl("/meetingHub").build();
        var hubStart = meetingHubConnection
            .start({ jsonp: true })
            .then(function (e) {
                $("#notification").data("kendoNotification").success("SignalR Hub Started!");
            })
            .catch(function (err) {
                return console.error(err.toString());
            });

        function onPush(e) {
            $("#notification").data("kendoNotification").success(e.type);
        }
    </script>
```
```HtmlHelper
    @(Html.Kendo().Notification()
        .Name("notification")
        .Width("100%")
        .Position(position => position
            .Top(0)
            .Left(0))
            )

        @(Html.Kendo().Scheduler<MeetingSignalRViewModel>()
        .Name("scheduler")
        .Date(DateTime.Now)
        .StartTime(DateTime.Now.AddHours(-3))
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.MonthView();
            views.AgendaView();
            views.TimelineView();
        })
        .Timezone("Etc/UTC")
        .Resources(resource =>
        {
            resource.Add(m => m.RoomID)
                .Title("Room")
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] {
                        new { Text = "Meeting Room 101", Value = 1, Color = "#6eb3fa" },
                        new { Text = "Meeting Room 201", Value = 2, Color = "#f58a8a" }
                });
            resource.Add(m => m.Attendees)
                .Title("Attendees")
                .Multiple(true)
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] {
                        new { Text = "Alex", Value = 1, Color = "#f8a398" },
                        new { Text = "Bob", Value = 2, Color = "#51a0ed" },
                        new { Text = "Charlie", Value = 3, Color = "#56ca85" }
                });
        })
        .DataSource(dataSource => dataSource
            .SignalR()
            .Events(events => events.Push("onPush"))
            .Transport(tr => tr
                .Promise("hubStart") // The promise returned by the start method of the SignalR connection
                .Hub("meetingHubConnection") // The SignalR HubConnection object created by the HubConnectionBuilder
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
                    model.Id(m => m.ID);
                    model.Field(m => m.ID).Editable(false);
                    model.Field("start", typeof(DateTime)).From("Start");
                    model.Field("end", typeof(DateTime)).From("End");
                    model.Field("title", typeof(string)).From("Title");
                    model.Field("description", typeof(string)).From("Description");
                    model.Field("recurrenceID", typeof(int)).From("RecurrenceID");
                    model.Field("recurrenceRule", typeof(string)).From("RecurrenceRule");
                    model.Field("recurrenceException", typeof(string)).From("RecurrenceException");
                    model.Field("isAllDay", typeof(bool)).From("IsAllDay");
                    model.Field("startTimezone", typeof(string)).From("StartTimezone");
                    model.Field("endTimezone", typeof(string)).From("EndTimezone");
                })
            )
        )
    )
```
