---
title: Templates
page_title: jQuery TimeLine Documentation | Templates | Kendo UI
description: "Event templates in the Kendo UI jQuery TimeLine widget allow you to customize the appearance of the cards."
slug: templates_kendoui_timeline_widget
position: 20
---

# Templates

The TimeLine lets you define your own template for rendering the events data, so you can customize it to your needs instead of using the default card.

You can find a live example in the [Templates demo of the TimeLine](https://demos.telerik.com/kendo-ui/timeline/templates).

The following example shows how you can customize the template of the timeline - to show more than one image and how you can use custom fields from your model that would not be recognized by the default template. The classes and HTML structure in this example mimic the default card template (except the custom field).

```
<div id="timeline"></div>

<script id="eventTemplate" type="text/x-kendo-template">
    <div class="k-card-header">
        <h5 class="k-card-title">#= data.title #</h5>
        <h6 class="k-card-subtitle"><strong>#= kendo.toString(data.date, "MMM d, yyyy")#</strong></h6>
    </div>
    <div class="k-card-body">
        <div class="k-card-description">
            <p>#= data.description #</p>
            <div class="imageContainer">
                # for (var i = 0; i < data.images.length; i++) { #
                <img src="#= data.images[i].src #" class="k-card-image">
                # } #
            </div>
        </div>
    </div>
    <p>I was with #=data.friends#</p>
    <div class="k-card-actions">
        <a class="k-button k-flat k-primary" href="#= data.actions[0].url #" target="_blank">#= data.actions[0].text #</a>
    </div>
</script>

<script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            eventTemplate: kendo.template($("#eventTemplate").html()),
            dateFormat: "MMMM yyyy",
            orientation: "horizontal",
            dataSource: {
                data: eventsData, // you can also use a remote data source that will return the corresponding array of JSON literals
                schema: {
                    model: {
                        fields: {
                            date: {
                                type: "date"
                            },
                        }
                    }
                }
            }
        });
    });

    var eventsData = [
        {
            description: "Lorem ipsum dolor sit amet.",
            date: new Date(2015, 6, 25),
            title: "Summer trip in Europe",
            subtitle: "Barcelona, Tenerife, Malta",
            friends: "John and Maria",
            images: [
                {
                    src: "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500"
                },
                {
                    src: "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Malta/Bibliotheca-National-Library_Marie-Lan-Nguyen.JPG?width=500&amp;height=500"
                }
            ],
            actions: [
                {
                    text: "More info about Barcelona",
                    url: "https://en.wikipedia.org/wiki/Barcelona"
                },
                {
                    text: "More info about Malta",
                    url: "https://en.wikipedia.org/wiki/Malta"
                }
            ]
        },
        {
            description: "The second event description.",
            date: new Date(2018, 1, 27),
            title: "United States East Coast Tour",
            subtitle: "Feb 27, 2018",
            friends: "Mandy",
            images: [
                {
                    src: "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/United-States/Boston-Old-South-Church_Ivo-Igov.JPG?width=500&amp;height=500"
                }
            ],
            actions: [
                {
                    text: "More info about New York City",
                    url: "https://en.wikipedia.org/wiki/New_York_City"
                }
            ]
        }
    ];
</script>
```

## See Also


* [Templates in the TimeLine (Demo)](https://demos.telerik.com/kendo-ui/timeline/templates).
* [JavaScript API Reference of the TimeLine](/api/javascript/ui/timeline)
