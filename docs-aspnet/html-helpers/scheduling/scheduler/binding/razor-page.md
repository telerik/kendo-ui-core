---
title:  Razor Pages
page_title: Razor Pages
description: "Learn how to configure the {{ site.product }} Scheduler for remote data binding using a DataSource in a Razor Page application."
slug: htmlhelpers_scheduler_razorpage_aspnetcore
position: 6
---

# Scheduler in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Scheduler for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Scheduler component in a Razor Pages scenario.

For the complete project, refer to the [Scheduler in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Scheduler/SchedulerCrudOperations.cshtml).

## Getting Started

To configure the CRUD operations of the Scheduler DataSource within a Razor Pages application, follow the next steps:

1. Specify the `Read`, `Create`, `Update`, and `Destroy` options of the `DataSource` configuration. The URL in each of these options must refer to the method name in the `PageModel`.

    ```HtmlHelper
        @page
        @model IndexModel

        @(Html.Kendo().Scheduler<MeetingViewModel>()
            .Name("scheduler")
            .Timezone("Etc/UTC")
            .DataSource(d => d
                .Model(m =>
                {
                    m.Id(f => f.MeetingID);
                    m.Field(f => f.Title).DefaultValue("No title");
                    m.Field(f => f.Start);
                    m.Field(f => f.End);
                    m.Field(f => f.Description);
                    m.Field(f => f.RecurrenceID);
                    m.Field(f => f.RecurrenceRule);
                    m.Field(f => f.RecurrenceException);
                    m.Field(f => f.StartTimezone);
                    m.Field(f => f.EndTimezone);
                    m.Field(f => f.IsAllDay);
                })
                .Read(r => r.Url("/Index?handler=Meetings_Read").Data("forgeryToken"))
                .Create(c => c.Url("/Index?handler=Meetings_Create").Data("forgeryToken"))
                .Destroy(d => d.Url("/Index?handler=Meetings_Destroy").Data("forgeryToken"))
                .Update(u => u.Url("/Index?handler=Meetings_Update").Data("forgeryToken"))
            )
            ... // Additional configuration options.
        )
    ```
    ```TagHelper
        @page
        @model IndexModel
        @addTagHelper *, Kendo.Mvc

        @{
            string defaultTitle = "No Title";
        }

        <kendo-scheduler name="scheduler"
            timezone="Etc/UTC">
            <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="/Index?handler=Meetings_Read" data="forgeryToken"/>
                    <create url="/Index?handler=Meetings_Create" data="forgeryToken"/>
                    <destroy url="/Index?handler=Meetings_Destroy" data="forgeryToken"/>
                    <update url="/Index?handler=Meetings_Update" data="forgeryToken"/>
                </transport>
                <schema data="Data" total="Total" errors="Errors">
                    <scheduler-model id="MeetingID">
                        <fields>
                            <field name="MeetingID" type="number"></field>
                            <field name="title" from="Title" type="string" default-value="@defaultTitle"></field>
                            <field name="start" from="Start" type="date"></field>
                            <field name="end" from="End" type="date"></field>
                            <field name="description" from="Description" type="string"></field>
                            <field name="recurrenceId" from="RecurrenceID" type="number" default-value=null></field>
                            <field name="recurrenceRule" from="RecurrenceRule" type="string" ></field>
                            <field name="recurrenceException" from="RecurrenceException" type="string"></field>
                            <field name="startTimezone" from="StartTimezone" type="string"></field>
                            <field name="endTimezone" from="EndTimezone" type="string"></field>
                            <field name="isAllDay" from="IsAllDay" type="boolean"></field>
                        </fields>
                    </scheduler-model>
                </schema>
            </scheduler-datasource>
            <!-- Additional configuration options. -->
        </kendo-scheduler>
    ```

1. Add an `AntiForgeryToken` at the top of the page.

    ```Razor
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the CRUD requests.

    ```JS
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```JS
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                }
            }
        </script>
    ```

1. Within the `cshtml.cs` file, add a handler method for each data operation.

    ```C# Index.cshtml.cs
        public static IList<MeetingViewModel> meetings;

        public void OnGet()
        {
            if (meetings == null)
            {
                // Populate the "meetings" collection with data (events).
                meetings = new List<MeetingViewModel>();
                Enumerable.Range(1, 5).ToList().ForEach(x => meetings.Add(new MeetingViewModel()
                {
                    MeetingID = x,
                    Title = "Event " + x,
                    Start = DateTime.Now.AddHours(x * 2),
                    End = DateTime.Now.AddHours(x * 3),
                    Description = "Description for event " + x
                }));
            }
        }

        public virtual JsonResult OnPostMeetings_Read([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(meetings.ToDataSourceResult(request));
        }

        public virtual JsonResult OnPostMeetings_Create([DataSourceRequest] DataSourceRequest request, MeetingViewModel meeting)
        {
            if (ModelState.IsValid)
            {
                meeting.MeetingID = meetings.Count + 2;
                meetings.Add(meeting);
            }

            return new JsonResult(new[] { meeting }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult OnPostMeetings_Destroy([DataSourceRequest] DataSourceRequest request, MeetingViewModel meeting)
        {
            if (ModelState.IsValid)
            {
                meetings.Remove(meetings.First(x => x.MeetingID == meeting.MeetingID));
            }

            return new JsonResult(new[] { meeting }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult OnPostMeetings_Update([DataSourceRequest] DataSourceRequest request, MeetingViewModel meeting)
        {
            if (ModelState.IsValid)
            {
                meetings.Where(x => x.MeetingID == meeting.MeetingID).Select(x => meeting);
            }

            return new JsonResult(new[] { meeting }.ToDataSourceResult(request, ModelState));
        }
    ```
    ```Model
        @using Kendo.Mvc.UI;
        @using System.ComponentModel.DataAnnotations;

        public class MeetingViewModel : ISchedulerEvent
        {
            public int MeetingID { get; set; }

            [Required]
            public string Title { get; set; }

            public string Description { get; set; }
            private DateTime start;

            [Required]
            public DateTime Start
            {
                get
                {
                    return start;
                }
                set
                {
                    start = value.ToUniversalTime();
                }
            }

            public string StartTimezone { get; set; }
            private DateTime end;

            [Required]
            [DateGreaterThan(OtherField = "Start")]
            public DateTime End
            {
                get
                {
                    return end;
                }
                set
                {
                    end = value.ToUniversalTime();
                }
            }

            public string EndTimezone { get; set; }
            public string RecurrenceRule { get; set; }
            public int? RecurrenceID { get; set; }
            public string RecurrenceException { get; set; }
            public bool IsAllDay { get; set; }
        }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Server-Side HtmlHelper API of the Scheduler](/api/scheduler)
* [Server-Side TagHelper API of the Scheduler](/api/taghelpers/scheduler)
* [Knowledge Base Section](/knowledge-base)
