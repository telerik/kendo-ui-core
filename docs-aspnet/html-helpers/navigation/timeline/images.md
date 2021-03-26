---
title: Images
page_title: Timeline Images
description: "Adding images in the Telerik UI Timeline HtmlHelper for {{ site.framework }}."
previous_url: /helpers/navigation/timeline/images
slug: images_htmlhelpers_timeline_aspnetcore
position: 4
---

# Images

The Timeline can render an `<img />` tag for the first item from the `Images` collection in its data source. Its `src` attribute will be set to the value of the `src` field of the image literal.

The example below shows how you can add an image for the events.

>tip If you want to show more than one image, you need to customize the [template of the Timeline](templates).


```Razor
@(Html.Kendo().Timeline<Kendo.Mvc.Examples.Models.TimelineEventModel>()
           .Name("Timeline")
           .DataDateField("EventDate")
           .DataDescriptionField("Description")
           .DataSubTitleField("Subtitle")
           .DataTitleField("Title")
           .DataImagesField("Images")
           .Orientation("vertical")
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
            EventDate = new System.DateTime(2015, 5, 25),
            Images = new List<TimelineEventImageModel>() {
                new TimelineEventImageModel() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500" }
            }
        });

        events.Add(new TimelineEventModel()
        {
            Title = "United States East Coast Tour",
            Subtitle = "Feb 27, 2018",
            Description = "The second event description.",
            EventDate = new System.DateTime(2018, 2, 27),
            Images = new List<TimelineEventImageModel>() {
                new TimelineEventImageModel() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/United-States/Boston-Old-South-Church_Ivo-Igov.JPG?width=500&amp;height=500" }
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
}

public class TimelineEventImageModel
{
    public string src { get; set; } // this field name must be "src"
}
```


## See Also


* [Templates in the Timeline]({% slug templates_htmlhelpers_timeline_aspnetcore %})
* [Basic Usage of the Timeline (Demo)](https://demos.telerik.com/{{ site.platform }}/timeline/index)
