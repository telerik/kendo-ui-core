---
title:  Razor Page
page_title: Configure a DataSource for the Scheduler for Remote Binding in Razor Page.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI Scheduler HtmlHelper for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_scheduler_razorpage_aspnetcore
position: 3
---

# Razor Page

This article describes how to configure a the DataSource of a Telerik UI Scheduler HtmlHelper for {{ site.framework }} in a RazorPage scenario.

In order to set up the Scheduler component bindings, you need to configure the `Create`,`Read`,`Update` and `Destroy` methods of its `DataSource` instance. The URL in this method should refer the name of the corresponding method in the PageModel. In this method, you can also pass additional parameters, such as antiforgery token (see `forgeryToken`). Note that the CRUD methods listed above make POST requests, thus the `OnPost()` handlers should be configured. See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().Scheduler<Telerik.Examples.RazorPages.Models.MeetingViewModel>()
        .Name("scheduler")
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
        })
        .Timezone("Etc/UTC")
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.MeetingID);
                m.Field(f => f.Title).DefaultValue("No title");
                m.RecurrenceId(f => f.RecurrenceID);
            })
            .Events(e => e.Error("error_handler"))
            .Read(read=>read.Url(Url.Page("SchedulerCrudOperations","Meetings_Read")).Data("forgeryToken"))
            .Create(create=>create.Url(Url.Page("SchedulerCrudOperations","Meetings_Create")).Data("forgeryToken"))
            .Destroy(destroy=>destroy.Url(Url.Page("SchedulerCrudOperations","Meetings_Destroy")).Data("forgeryToken"))
            .Update(u=>u.Url(Url.Page("SchedulerCrudOperations","Meetings_Update")).Data("forgeryToken"))
        )
    )

    <script>
        function forgeryToken() {
            return kendo.antiForgeryTokens();
        };

        function error_handler(e) {
            if (e.errors) {
                var message = "Errors:\n";
                $.each(e.errors, function (key, value) {
                    if ('errors' in value) {
                        $.each(value.errors, function () {
                            message += this + "\n";
                        });
                    }
                });
                alert(message);

                var scheduler = $("#scheduler").data("kendoScheduler");
                scheduler.one("dataBinding", function (e) {
                    //prevent saving if server error is thrown
                    e.preventDefault();
                })
            }
        };
    </script>
```
```tab-PageModel(cshtml.cs)
    public virtual JsonResult OnPostMeetings_Read([DataSourceRequest] DataSourceRequest request)
    {
        return new JsonResult(meetings.ToDataSourceResult(request));
    }

    public virtual JsonResult OnPostMeetings_Destroy([DataSourceRequest] DataSourceRequest request, MeetingViewModel meeting)
    {
        if (ModelState.IsValid)
        {
            //destroy
        }

        return new JsonResult(new[] { meeting }.ToDataSourceResult(request, ModelState));
    }

    public virtual JsonResult OnPostMeetings_Create([DataSourceRequest] DataSourceRequest request, MeetingViewModel meeting)
    {
        if (ModelState.IsValid)
        {
            //create
        }

        return new JsonResult(new[] { meeting }.ToDataSourceResult(request, ModelState));
    }

    public virtual JsonResult OnPostMeetings_Update([DataSourceRequest] DataSourceRequest request, MeetingViewModel meeting)
    {
        if (ModelState.IsValid)
        {
            //update
        }

        return new JsonResult(new[] { meeting }.ToDataSourceResult(request, ModelState));
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [DataBinding Overview]({% slug htmlhelpers_scheduler_ajaxbinding_aspnetcore %})
