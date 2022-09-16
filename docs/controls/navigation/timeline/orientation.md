---
title: Orientation
page_title: jQuery Timeline Documentation | Orientation
description: "See how to control the orientation of the Timeline widget for jQuery by Kendo UI."
slug: orientation_kendoui_timeline_widget
position: 2
---

# Orientation

The Timeline can render its events in a [vertical](#vertical) or [horizontal](#horizontal) list.

## Vertical Mode

By default, the Timeline is vertical with its events arranged on one side of the axis and all events are expanded.

You can have the events render alternatingly on both sides of the axis by setting its `alterMode` option to `true`. If you set the `collapsibleEvents` option to `true`, all events will start out collapsed. The user can then expand a particular event to see more than its title and subtitle.

```
<div id="timeline"></div>
<script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            orientation: "vertical", // Define the layout of the widget.
            alterMode: true, // Render the events on both sides of the axis in the vertical mode.
            collapsibleEvents: true, // Start all collapsed events in the vertical mode.
            dataSource: {
                data: eventsData, // Defined later in this snippet.
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

    // The literals in this example use the default field names the widget takes.
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

## Horizontal Mode

To use the horizontal rendering, set the `orientation` option of the Timeline to `horizontal`.

In the horizontal mode, the Timeline renders buttons which the user can click or tap to navigate between periods. One of the events is always rendered below the time axis and the user can select another event to reveal its details.

The horizontal mode renders the event details on demand (only when they are selected) and is responsive (renders as many of the events as there is room on the axis for).

The horizontal mode does not support alternating rendering and collapsing of events.

```
<div id="timeline"></div>
<script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            orientation: "horizontal", // Defined the layout of the widget.
            dataSource: {
                data: eventsData, // Defined later in this snippet.
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

    // The literals in this example use the default field names the widget takes.
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

* [Horizontal Orientation of the Timeline (Demo)](https://demos.telerik.com/kendo-ui/timeline/horizontal)
* [JavaScript API Reference of the Timeline](/api/javascript/ui/timeline)
