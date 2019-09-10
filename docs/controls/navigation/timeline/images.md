---
title: Images
page_title: jQuery TimeLine Documentation | Images | Kendo UI
description: "Adding images in the Kendo UI jQuery TimeLine card."
slug: images_kendoui_timeline_widget
position: 15
---

# Images

The TimeLine can render an `<img />` tag for the first item from the `images` collection in its data source. Its `src` attribute will be set to the value of the `src` field of the image literal.

The example below shows how you can use a field with a specific name to provide an image for the events.

>tip If you want to show more than one image, you need to customize the [template of the TimeLine](templates).


```
<div id="timeline"></div>
<script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            dataImagesField: "tripImage", // the name of the field that holds an array with the event image as its element
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
            description: "First event description.",
            date: new Date(2015, 6, 25),
            title: "Summer trip in Europe",
            subtitle: "Barcelona, Tenerife, Malta",
            tripImage: [
                {
                    src: "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500"
                }
            ]
        },
        {
            description: "The second event description.",
            date: new Date(2018, 1, 27),
            title: "United States East Coast Tour",
            subtitle: "A short visit",
            tripImage: [
                {
                    src: "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/United-States/Boston-Old-South-Church_Ivo-Igov.JPG?width=500&amp;height=500"
                }
            ]
        }
    ];
</script>
```


## See Also


* [Templates in the TimeLine]({% slug templates_kendoui_timeline_widget %}).
* [JavaScript API Reference of the TimeLine](/api/javascript/ui/timeline)
