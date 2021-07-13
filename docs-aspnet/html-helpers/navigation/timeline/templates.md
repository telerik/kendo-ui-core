---
title: Templates
page_title: Timeline Templates
description: "Event templates in the Telerik UI Timeline HtmlHelper for {{ site.framework }}."
previous_url: /helpers/navigation/timeline/templates
slug: templates_htmlhelpers_timeline_aspnetcore
position: 6
---

# Templates

The Timeline lets you define your own template for rendering the events data, so you can customize it to your needs instead of using the default card.

You can find a live example in the [Templates demo of the Timeline](https://demos.telerik.com/{{ site.platform }}/timeline/templates).

The following example shows how you can customize the template of the timeline - to show more than one image and how you can use custom fields from your model that would not be recognized by the default template. The classes and HTML structure in this example mimic the default card template (except the custom field).

```Razor
@(Html.Kendo().Timeline<Kendo.Mvc.Examples.Models.TimelineEventModel>()
           .Name("Timeline")
           .EventTemplateId("eventTemplate")
           .Orientation("horizontal")
           .Dateformat("MMMM yyyy")
           .DataDateField("EventDate")
           .DataDescriptionField("Description")
           .DataSubTitleField("Subtitle")
           .DataTitleField("Title")
           .DataImagesField("Images")
           .DataActionsField("Actions")
           .DataSource(dt => dt.Read("GetTimelineData", "Timeline"))
)

<script id="eventTemplate" type="text/x-kendo-template">
    <div class="k-card-header">
        <h5 class="k-card-title">#= data.Title #</h5>
        <h6 class="k-card-subtitle"><strong>#= kendo.toString(data.EventDate, "MMM d, yyyy")#</strong></h6>
    </div>
    <div class="k-card-body">
        <div class="k-card-description">
            <p>#= data.Description #</p>
            <div class="imageContainer">
                # for (var i = 0; i < data.Images.length; i++) { #
                    <img src="#= data.Images[i].src #" class="k-card-image">
                # } #
            </div>
        </div>
    </div>
    <p>I was with #=data.Friends#</p>
    <div class="k-card-actions">
        <a class="k-button k-flat k-primary" href="#= data.Actions[0].url #" target="_blank">#= data.Actions[0].text #</a>
    </div>
</script>
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
            EventDate = new System.DateTime(2015, 5, 25),
            Friends = "John and Maria",
            Images = new List<TimelineEventImageModel>() {
                new TimelineEventImageModel() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500" },
                new TimelineEventImageModel() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Malta/Bibliotheca-National-Library_Marie-Lan-Nguyen.JPG?width=500&amp;height=500" }
            },
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
            EventDate = new System.DateTime(2018, 2, 27),
            Friends = "Mandy",
            Images = new List<TimelineEventImageModel>() {
                new TimelineEventImageModel() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/United-States/Boston-Old-South-Church_Ivo-Igov.JPG?width=500&amp;height=500" }
            },
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

    public string Friends { get; set; }

    public List<TimelineEventImageModel> Images { get; set; }
    public List<TimelineEventActionModel> Actions { get; set; }
}

public class TimelineEventImageModel
{
    public string src { get; set; }
}
public class TimelineEventActionModel
{
    public string text { get; set; }
    public string url { get; set; }
}
```

## See Also


* [Templates in the Timeline (Demo)](https://demos.telerik.com/{{ site.platform }}/timeline/templates)
* [JavaScript API Reference of the Timeline](https://docs.telerik.com/kendo-ui/api/javascript/ui/timeline)
