---
title: Orientation
page_title: jQuery TimeLine Documentation | Orientation | Kendo UI
description: "See how to control the orientation of the TimeLine widget for jQuery by Kendo UI."
slug: orientation_kendoui_timeline_widget
position: 5
---

# Orientation

The TimeLine can render its events in a [vertical](#vertical) or [horizontal](#horizontal) list.

## Vertical

By default, the timeline is vertical, with events arranged on one side of the axis.

You can have the events render alternatingly on both sides of the axis by setting its `alterMode` option to `true`.

If you set the `collapsibleEvents` option to `true`, all events will start out collapsed (by default, all events are expanded). The user can then expand a particular event to see more than its title and subtitle.

```
<div id="timeline"></div>
<script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            orientation: "vertical", // defines the layout of the widget
            alterMode: true, // renders the events on both sides of the axis in vertical mode
            collapsibleEvents: true, // starts all events collapsed in vertical mode
            dataSource: {
                data: eventsData, // defined later in this snippet
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
    
    // the literals in this example use the default field names the widget takes
    var eventsData = [
        {
            description: "First event description.",
            date: new Date(2015, 4, 15),
            title: "Barcelona \u0026 Tenerife",
            subtitle: "May 15, 2015",
            images: [
                {
                    src: "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500"
                }
            ],
            actions: [
                {
                    text: "More info about Barcelona",
                    url: "https://en.wikipedia.org/wiki/Barcelona"
                }
            ]
        },
        {
            description: "The second event description.",
            date: new Date(2018, 1, 27),
            title: "United States East Coast Tour",
            subtitle: "Feb 27, 2018",
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
        },
        {
            description: "Third event description.",
            date: new Date(2015, 5, 25),
            subtitle: "My second trip this year",
            title: "Malta, a Country of Кnights",
            images: [
                {
                    src: "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Malta/Bibliotheca-National-Library_Marie-Lan-Nguyen.JPG?width=500&amp;height=500"
                }
            ],
            actions: [
                {
                    text: "More info about Malta",
                    url: "https://en.wikipedia.org/wiki/Malta"
                }
            ]
        }
    ];
</script>
```

## Horizontal

To use the horizontal rendering, set the `orientation` option to `horizontal`.

In the horizontal mode, the timeline renders buttons the user can click or tap to navigate between periods. There is always one rendered event below the time axis, and the user can select another to reveal its details.

The horizontal mode renders the event details on demand (only when they are selected), and is responsive (renders as many of the events as there is room on the axis for).

Alternating rendering and collapsing is not available for the events in this mode.

```
<div id="timeline"></div>
<script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            orientation: "horizontal", // defines the layout of the widget
            dataSource: {
                data: eventsData, // defined later in this snippet
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
    
    // the literals in this example use the default field names the widget takes
    var eventsData = [
        {
            description: "First event description.",
            date: new Date(2015, 4, 15),
            title: "Barcelona \u0026 Tenerife",
            subtitle: "May 15, 2015",
            images: [
                {
                    src: "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500"
                }
            ],
            actions: [
                {
                    text: "More info about Barcelona",
                    url: "https://en.wikipedia.org/wiki/Barcelona"
                }
            ]
        },
        {
            description: "The second event description.",
            date: new Date(2018, 1, 27),
            title: "United States East Coast Tour",
            subtitle: "Feb 27, 2018",
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
        },
        {
            description: "Third event descriptionm.",
            date: new Date(2015, 5, 25),
            subtitle: "My second trip this year",
            title: "Malta, a Country of Кnights",
            images: [
                {
                    src: "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Malta/Bibliotheca-National-Library_Marie-Lan-Nguyen.JPG?width=500&amp;height=500"
                }
            ],
            actions: [
                {
                    text: "More info about Malta",
                    url: "https://en.wikipedia.org/wiki/Malta"
                }
            ]
        }
    ];
</script>
```

## See Also

* [Horizontal Orientation of the TimeLine (Demo)](https://demos.telerik.com/kendo-ui/timeline/horizontal)
* [JavaScript API Reference of the TimeLine](/api/javascript/ui/timeline)

