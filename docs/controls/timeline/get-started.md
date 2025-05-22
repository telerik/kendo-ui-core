---
title: Getting Started
page_title: jQuery TimeLine Documentation - Getting Started with the TimeLine
description: "Get started with the jQuery TimeLine by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_timeline_component
position: 2
---

# Getting Started with the TimeLine 

This guide demonstrates how to get up and running with the Kendo UI for jQuery TimeLine .

After the completion of this guide, you will achieve the following end result:

```dojo
<div id="timeline"></div>
<script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            orientation: "vertical", // Define the layout of the component.
            alterMode: true, // Render the events on both sides of the axis in the vertical mode.
            collapsibleEvents: true, // Start all collapsed events in the vertical mode.
            dataSource: timeLineDataSource
        });
    });

    // The literals in this example use the default field names the component takes.
    let eventsData = [
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
            title: "Malta, a Country of Knights",
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

    let timeLineDataSource = new kendo.data.DataSource({
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
    });
</script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component. The content of the `<div>` will be used as content for the TimeLine.

```html
    <div id="timeline"></div>
```

## 2. Specify the Data Source

In this step, you will specify a [`dataSource`](/api/javascript/ui/autocomplete/configuration/datasource) instance and pass local data to it.

```html
        // The literals in this example use the default field names the component takes.
    let eventsData = [
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
            title: "Malta, a Country of Knights",
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

    let timeLineDataSource = new kendo.data.DataSource({
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
    });
```

## 3. Initialize the TimeLine

In this step, you will initialize the TimeLine from the `<div>` element.

```dojo
<div id="timeline"></div>
<script>
        // The literals in this example use the default field names the component takes.
    let eventsData = [
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
            title: "Malta, a Country of Knights",
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

    let timeLineDataSource = new kendo.data.DataSource({
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
    });
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            dataSource: timeLineDataSource //pass the data source instance
        });
    });
</script>
```

## 4. Apply Configuration Settings

Here, you will define the `vertical` layout of the component, set the events rendering on both sides of the axis, and start all collapsed events in the vertical mode.

```dojo
<div id="timeline"></div>
<script>
    let eventsData = [
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
            title: "Malta, a Country of Knights",
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

    let timeLineDataSource = new kendo.data.DataSource({
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
    });
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            orientation: "vertical", // Define the layout of the component.
            alterMode: true, // Render the events on both sides of the axis in the vertical mode.
            collapsibleEvents: true, // Start all collapsed events in the vertical mode.
            dataSource: timeLineDataSource // Define the data source instance.
        });
    });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the TimeLine](https://demos.telerik.com/kendo-ui/timeline/index)

## See Also 

* [JavaScript API Reference of the TimeLine](/api/javascript/ui/timeline)
* [Knowledge Base Section](/knowledge-base)


