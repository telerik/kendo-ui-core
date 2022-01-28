---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Timeline for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_taghelpers_timeline_aspnetcore
position: 1
---

# Timeline Overview

The Telerik UI Timeline TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Timeline widget.

The Timeline widget displays a collection of events and their data in a chronological succession for each year.

You can scroll through the events and collapse/expand them. The events order can be vertical or horizontal, and you can customize their templates, as well as respond to events and use API control the widget behavior. You can also control the format of the rendered date for the event. If you provide a list of actions, they will be rendered as links after the description and images.

* [Demo page for the Timeline](https://demos.telerik.com/aspnet-core/timeline/tag-helper)

## Initializing the Timeline

The following example demonstrates how to define the Timeline by using the Timeline TagHelper. Note the tabs for the controller and model code that show how to feed data to the widget.

```Razor
<kendo-timeline name="timeline" orientation="horizontal" datadatefield="EventDate" datatitlefield="Title" datasubtitlefield="Subtitle" datadescriptionfield="Description" dataactionsfield="Actions" dataimagesfield="Images">
    <datasource>
        <transport>
            <read url="/Timeline/GetTimelineData" />
        </transport>
        <schema>
            <model>
                <fields>
                    <field name="EventDate" type="date"></field>
                </fields>
            </model>
        </schema>
    </datasource>
</kendo-timeline>
```
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
            Title = "Malta, a Country of Кnights",
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

        return Json(events);
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




## See Also

* [Basic Usage of the Timeline TagHelper (Demo)](https://demos.telerik.com/aspnet-core/timeline/tag-helper)


