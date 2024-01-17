---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Timeline component for {{ site.framework }}."
previous_url: /helpers/navigation/timeline/overview
slug: overview_htmlhelpers_timeline_aspnetcore
position: 0
---

# {{ site.framework }} Timeline Overview

{% if site.core %}
The Telerik UI Timeline TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Timeline widget.
{% else %}
The Telerik UI Timeline HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Timeline widget.
{% endif %}

The Timeline widget displays a collection of events and their data in a chronological succession for each year.

You can scroll through the events and collapse/expand them. The events order can be vertical or horizontal, and you can customize their templates, as well as respond to events and use API control the widget behavior. You can also control the format of the rendered date for the event. If you provide a list of actions, they will be rendered as links after the description and images.

* [Demo page for the Timeline HtmlHelper](https://demos.telerik.com/{{ site.platform }}/timeline/index)
{% if site.core %}
* [Demo page for the Timeline TagHelper](https://demos.telerik.com/aspnet-core/timeline/tag-helper)
{% endif %}

![{{ site.product_short }} Timeline Overview](images/timeline-overview.png)

## Initializing the Timeline

The following example demonstrates how to define the Timeline. Note the tabs for the controller and model code that show how to feed data to the widget.

```HtmlHelper
    @(Html.Kendo().Timeline<MyApp.Models.TimelineEventModel>()
               .Name("Timeline")
               .DataDateField("EventDate")
               .DataDescriptionField("Description")
               .DataSubTitleField("Subtitle")
               .DataTitleField("Title")
               .DataImagesField("Images")
               .DataActionsField("Actions")
               .Orientation("vertical") // defines the layout of the widget
               .AlternatingMode() // renders the events on both sides of the axis in vertical mode
               .CollapsibleEvents() // starts all events collapsed in vertical mode
               .DataSource(dt => dt.Read("GetTimelineData", "Timeline"))
    )
```
{% if site.core %}
```TagHelper
    <kendo-timeline name="Timeline"
                    orientation="vertical"
                    datadatefield="EventDate"
                    datatitlefield="Title"
                    datasubtitlefield="Subtitle"
                    datadescriptionfield="Description"
                    dataactionsfield="Actions"
                    dataimagesfield="Images"
                    alternating-mode="true"
                    collapsible-events="true">
        <datasource>
            <transport>
                <read url="@Url.Action("GetTimelineData","Timeline")" />
            </transport>
            <schema>
                <model>
                    <fields>
                        <field name="EventDate" type="date"></field>
                        <field name="Title" type="string"></field>
                        <field name="Subtitle" type="string"></field>
                        <field name="Description" type="string"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
    </kendo-timeline>
```
{% endif %}
```Controller
public partial class Timeline : BaseController
{
    public JsonResult GetTimelineData()
    {
        List<TimelineEventModel> events = new List<TimelineEventModel>();

        events.Add(new TimelineEventModel() {
            Title = "Barcelona \u0026 Tenerife",
            Subtitle = "May 15, 2015",
            Description = "First event description.",
            EventDate = new System.DateTime(2015, 4, 15),
            Images = new List<TimelineEventImageModel>() {
                new TimelineEventImageModel() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500" }
            },
            Actions = new List<TimelineEventActionModel>() {
                new TimelineEventActionModel() { text = "More info about Barcelona", url="https://en.wikipedia.org/wiki/Barcelona" }
            }
        });

        events.Add(new TimelineEventModel()
        {
            Title = "United States East Coast Tour",
            Subtitle = "Feb 27, 2018",
            Description = "The second event description.",
            EventDate = new System.DateTime(2018, 1, 27),
            Images = new List<TimelineEventImageModel>() {
                new TimelineEventImageModel() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/United-States/Boston-Old-South-Church_Ivo-Igov.JPG?width=500&amp;height=500" }
            },
            Actions = new List<TimelineEventActionModel>() {
                new TimelineEventActionModel() { text = "More info about New York City", url="https://en.wikipedia.org/wiki/New_York_City" }
            }
        });

        events.Add(new TimelineEventModel()
        {
            Title = "Malta, a Country of Knights",
            Subtitle = "My second trip this year",
            Description = "Third event description.",
            EventDate = new System.DateTime(2015, 5, 25),
            Images = new List<TimelineEventImageModel>() {
                new TimelineEventImageModel() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Malta/Bibliotheca-National-Library_Marie-Lan-Nguyen.JPG?width=500&amp;height=500" }
            },
            Actions = new List<TimelineEventActionModel>() {
                new TimelineEventActionModel() { text = "More info about Malta", url="https://en.wikipedia.org/wiki/Malta" }
            }
        });

        {% if site.core %}
        return Json(events);{% else %}
        return Json(events, JsonRequestBehavior.AllowGet);{% endif %}
    }
}
```
```Model
public class TimelineEventModel
{
    public string Title { get; set; }
    public string Subtitle { get; set; }
    public string Description { get; set; }

    public DateTime EventDate { get; set; }

    public List<TimelineEventImageModel> Images { get; set; }
    public List<TimelineEventActionModel> Actions { get; set; }
}

public class TimelineEventImageModel
{
    public string src { get; set; } // this field name must be "src"
}
public class TimelineEventActionModel
{
    public string text { get; set; } // this field name must be "text"
    public string url { get; set; } // this field name must be "url"
}
```

## Functionality and Features

* [Orientation]({%slug orientation_htmlhelpers_timeline_aspnetcore %})
* [Actions]({%slug actions_htmlhelpers_timeline_aspnetcore %})
* [Images]({%slug images_htmlhelpers_timeline_aspnetcore %})
* [Templates]({%slug templates_htmlhelpers_timeline_aspnetcore %})

## Referencing Existing Instances

To access an existing Timeline instance, use the `.data()` jQuery method, executed by the jQuery object of the originating element. Once you have the reference, you can use the [Timeline client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/timeline#methods).

```HtmlHelper
    @(Html.Kendo().Timeline<MyApp.Models.TimelineEventModel>()
        .Name("Timeline")
        .DataDateField("EventDate")
        .DataDescriptionField("Description")
        .DataSubTitleField("Subtitle")
        .DataTitleField("Title")
        .DataImagesField("Images")
        .DataActionsField("Actions")
        .Orientation("horizontal")
        .DataSource(dt => dt.Read("GetTimelineData", "Timeline")) // see the first example in this article for a sample data source
    )

    <button onclick="buttonClick();">Go to next event</button>

    <script>
        function buttonClick() {
            var timeline = $("#Timeline").data("kendoTimeline");
            timeline.next();
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-timeline name="Timeline"
                    orientation="horizontal"
                    datadatefield="EventDate"
                    datatitlefield="Title"
                    datasubtitlefield="Subtitle"
                    datadescriptionfield="Description"
                    dataactionsfield="Actions"
                    dataimagesfield="Images">
        <datasource>
            <transport>
                <read url="@Url.Action("GetTimelineData","Timeline")" />
            </transport>
            <schema>
                <model>
                    <fields>
                        <field name="EventDate" type="date"></field>
                        <field name="Title" type="string"></field>
                        <field name="Subtitle" type="string"></field>
                        <field name="Description" type="string"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
    </kendo-timeline>

    <button onclick="buttonClick();">Go to next event</button>

    <script>
        function buttonClick() {
            var timeline = $("#Timeline").data("kendoTimeline");
            timeline.next();
        }
    </script>
```
{% endif %}

## Next Steps
* [Getting Started with the Timeline]({% slug aspnetcore_timeline_getting_started %})
* [Basic Usage of the Timeline for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timeline/index)
* [Timeline Events]({% slug events_timeline_aspnetcore %})

## See Also

* [Basic Usage of the Timeline (Demo)](https://demos.telerik.com/{{ site.platform }}/timeline/index)
{% if site.core %}
* [Basic Usage of the Timeline TagHelper (Demo)](https://demos.telerik.com/aspnet-core/timeline/tag-helper)
* [Timeline in Razor Pages]({% slug razorpages_timelinehelper_aspnetcore %})
{% endif %}
* [Using the Events of the Timeline (Demo)](https://demos.telerik.com/{{ site.platform }}/timeline/events)
* [Applying the Timeline API (Demo)](https://demos.telerik.com/{{ site.platform }}/timeline/api)
* [JavaScript API Reference of the Timeline](https://docs.telerik.com/kendo-ui/api/javascript/ui/timeline)

