---
title: Local Binding
page_title: Local Binding
description: "Get started with the Scheduler component for {{ site.framework }} and learn how to bind it to a local dataset."
components: ["scheduler"]
slug: htmlhelpers_scheduler_serverbinding_aspnetcore
position: 1
---

# Local Binding

Local data binding refers to binding the Scheduler component to a dataset that is prepared on the server and made available during the initial page rendering. The data is retrieved server-side (from a database, service, or other data source) and then passed to the view, where the `BindTo()` method accepts the `IEnumerable` collection.

The local data binding approach is often used when dealing with small to medium-sized read-only datasets since all records are available when the page is loaded. However, for scenarios requiring data manipulation or large datasets, consider using [Ajax data binding]({% slug htmlhelpers_scheduler_ajaxbinding_aspnetcore %}) to enable full CRUD functionality.

To bind the Scheduler to a model collection, follow the next steps:

1. Create a new model which inherits the `ISchedulerEvent` interface.

    ```C# Model    
    public class Projection : ISchedulerEvent
    {
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Description { get; set; }
        public bool IsAllDay { get; set; }
        string StartTimezone { get; set; }
        string EndTimezone { get; set; }
        public string RecurrenceRule { get; set; }
        public string RecurrenceException { get; set; }
    }
    ```
    ```C# Interface
    public interface ISchedulerEvent
    {
        string Title { get; set; }
        string Description { get; set; }
        bool IsAllDay { get; set; }
        DateTime Start { get; set; }
        DateTime End { get; set; }
        string StartTimezone { get; set; }
        string EndTimezone { get; set; }
        string RecurrenceRule { get; set; }
        string RecurrenceException { get; set; }
    }
    ```

1. Create a new Action method that passes a `List` collection to the view.

    ```C# Controller
    public ActionResult Index()
    {
        List<Projection> cinemaSchedule = new List<Projection> {
            new Projection {
                Title = "Fast and furious 6",
                Start = new DateTime(2013,6,13,17,00,00),
                End= new DateTime(2013,6,13,18,30,00)
            },
            new Projection {
                Title= "The Internship",
                Start= new DateTime(2013,6,13,14,00,00),
                End= new DateTime(2013,6,13,15,30,00)
            },
            new Projection {
                Title = "The Perks of Being a Wallflower",
                Start =  new DateTime(2013,6,13,16,00,00),
                End =  new DateTime(2013,6,13,17,30,00)
            }};

        return View(cinemaSchedule);
    }
    ```

1. Add the Scheduler to the view and bind it to the model data collection by using the `BindTo()` option.

    ```HtmlHelper
    @model List<Projection>

    @(Html.Kendo().Scheduler<Projection>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
        .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
        .Editable(false)
        .Height(600)
        .BindTo(Model)
    )
    ```

## See Also

* [Server-Side API of the Scheduler HtmlHelper](/api/scheduler)
{% if site.core %}
* [Server-Side API of the Scheduler TagHelper](/api/taghelpers/scheduler)
{% endif %}
