---
title: Actions
page_title: Timeline Actions
description: "Action links in the Telerik UI Timeline HtmlHelper for {{ site.framework }}."
previous_url: /helpers/navigation/timeline/actions
slug: actions_htmlhelpers_timeline_aspnetcore
position: 3
---

# Actions

The Timeline can render links (`<a>` tags) for the items from the `Actions` collection in its data source, so the user can navigate to the specific pages.

The `href` attribute of an action will be set to the value of the `src` field of the action literal, and the text will come from the `text` field.

The example below shows how you can a few actions actions for one event.

```Razor
@(Html.Kendo().Timeline<Kendo.Mvc.Examples.Models.TimelineEventModel>()
           .Name("Timeline")
           .DataDateField("EventDate")
           .DataDescriptionField("Description")
           .DataSubTitleField("Subtitle")
           .DataTitleField("Title")
           .DataActionsField("Actions")
           .Orientation("horizontal")
           .DataSource(dt => dt.Read("GetTimelineData", "Timeline"))
)
```
```Controller
public partial class Timeline : BaseController
{
        public JsonResult GetTimelineData()
        {
            List<TimelineEventModel> events = new List<TimelineEventModel>();

            events.Add(new TimelineEventModel() {
                Title = "Summer trip in Europe",
                Subtitle = "May 15, 2015",
                Description = "Lorem ipsum dolor sit amet",
                EventDate = new System.DateTime(2015, 6, 25),
                Actions = new List<TimelineEventActionModel>() {
                    new TimelineEventActionModel() { text = "More info about Barcelona", url="https://en.wikipedia.org/wiki/Barcelona" },
                    new TimelineEventActionModel() { text = "More info about Malta", url="https://en.wikipedia.org/wiki/Malta" }
                }
            });

            events.Add(new TimelineEventModel()
            {
                Title = "United States East Coast Tour",
                Subtitle = "Feb 27, 2018",
                Description = "The second event description.",
                EventDate = new System.DateTime(2018, 1, 27),
                Actions = new List<TimelineEventActionModel>() {
                    new TimelineEventActionModel() { text = "More info about New York City", url="https://en.wikipedia.org/wiki/New_York_City" }
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

    public List<TimelineEventActionModel> Actions { get; set; }
}

public class TimelineEventActionModel
{
    public string text { get; set; } // this field name must be "text"
    public string url { get; set; } // this field name must be "url"
}
```

## See Also


* [Basic Usage of the Timeline (Demo)](https://demos.telerik.com/{{ site.platform }}/timeline/index)

