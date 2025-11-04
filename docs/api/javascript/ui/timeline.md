---
title: Timeline
page_title: Configuration, methods and events of Kendo UI Timeline
description: You will learn how to configure Timeline widget, which shows events over time.
res_type: api
component: timeline
---

# kendo.ui.Timeline

Represents the Kendo UI Timeline widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoBind `Boolean` *(default: true)*

If set to `false`, the Timeline will not bind to the data source during initialization, i.e. it will not call the [`fetch`](/api/javascript/data/datasource/methods/fetch) method of the [dataSource](/api/javascript/ui/grid/fields/datasource) instance. In such scenarios data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
dataSource instance is fired. By default, `autoBind` is set to `true` and the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.


<div class="meta-api-description">
How to configure automatic data loading in Kendo UI Timeline? Control automatic data loading and binding behavior during Timeline initialization by enabling or disabling the automatic fetch from the linked data source, managing when and how the Timeline connects to and retrieves data, preventing redundant remote requests when shared data sources are used among multiple components, configuring data binding triggers on data source change events rather than on startup, and customizing initialization data flow to optimize performance by setting whether the component loads data immediately or waits for manual or event-driven binding.
</div>

#### Example - disable automatic binding

    <div id="timeline"></div>
    <script>
    $("#timeline").kendoTimeline({
        autoBind: false,
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                    fields: {
                        date: {
                        type: "date"
                        }
                    }
                }
            }
        },
        alternatingMode: true,
        orientation: "horizontal"
    });
    </script>

### alternatingMode `Boolean`*(default: false)*

Indicates whether events should be positioned on both sides of the timeline axis. By default all events are displayed on the right side of the timeline axis.


<div class="meta-api-description">
How to enable alternating event placement on a Kendo UI Timeline control? Control the layout of timeline events by enabling or configuring alternate side placement so that events appear on both the left and right sides of the axis for improved visual distinction, side-by-side positioning, staggered chronological displays, or balanced event alignment. Adjust the positioning mode to switch between single-sided stacking and alternating arrangement along the timeline axis, supporting use cases that require symmetric event distribution, clearer event separation, or enhanced timeline readability where events need to be offset on opposing sides. Toggle this setting to enable dual-sided timeline event placement for a more dynamic, zigzag, or staggered visual presentation of sequential or parallel events, improving the clarity and aesthetic flow of time-based data.
</div>

#### Example

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        alternatingMode: true,
        orientation: "vertical"
    });
    </script>

### orientation `String`*(default: "vertical")*

Sets the orienation of the timeline axis. The widget expects "horizontal" or "vertical"


<div class="meta-api-description">
How to change the direction of events in a Kendo UI for jQuery timeline? Set, control, or configure the direction and layout of a timeline or sequence axis to display events, tasks, or items horizontally or vertically. Adjust the orientation to switch between horizontal and vertical layouts when rendering timeline components, enabling customization of event flow direction for better visualization. Enable users to specify axis alignment, direction, or layout style for sequential data display along the horizontal or vertical plane, supporting use cases like horizontal scrolling timelines or vertical chronological event stacks. Facilitate orientation switching to change how timeline entries or milestones are arranged visually, helping developers customize the timeline layout dynamically or at initialization.
</div>

#### Example - set the orientation to horizontal

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        alternatingMode: true,
        orientation: "horizontal"
    });
    </script>

### collapsibleEvents `Boolean`*(default: false)*

Enables the events in the Kendo UI Timeline to be expandable or collapsible. When enabled initially all events are collapsed.


<div class="meta-api-description">
How do I control event expansion in Kendo UI for jQuery timeline? Enable or disable the ability to expand or collapse individual timeline events, allowing users to toggle visibility of detailed event information, configure initial event states to show only summaries or full details, manage interactive event folding for cleaner views, control whether event items start minimized or fully visible, and set up user-driven expand/collapse functionality to improve timeline readability and navigation.
</div>

#### Example

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        collapsibleEvents: true,
        orientation: "vertical"
    });
    </script>

### dataActionsField `String`*(default: "actions")*

Sets the field of the data item that provides the actions information for the event.


<div class="meta-api-description">
How do I specify the field in my dataset that holds action details for timeline events in Kendo UI? Configure the field name in your dataset that holds action details or metadata for timeline events, specifying where to find arrays of action objects, commands, or interaction data associated with each event to enable accurate rendering and control of available event actions, button commands, or user interactions within timeline components.
</div>

#### Example

    <div id="timeline"></div>
    <script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            dataSource: {
              data: data,
              schema: {
                model: {
                  fields: {
                    date: {
                      type: "date"
                    }
                  }
                }
              }
            },
          	dataActionsField: "actions1",
            alternatingMode: true,
            collapsibleEvents: true,
            orientation: "vertical"
        });
    });

    var data = [
      {
        "description": "Barcelona is an excellent place to discover world-class arts and culture. Bullfighting was officially banned several years ago, but the city remains rich with festivals and events. The sights in Barcelona are second to none. Don’t miss the architectural wonder, Casa Mila—otherwise known as La Pedrera. It’s a modernist apartment building that looks like something out of an expressionist painting. Make your way up to the roof for more architectural surprises. And if you like Casa Mila, you’ll want to see another one of Antoni Gaudi’s architectural masterpieces, Casa Batllo, which is located at the center of Barcelona.\r\nTenerife, one of the nearby Canary Islands, is the perfect escape once you’ve had your fill of the city. In Los Gigantes, life revolves around the marina.",
        "date": "2008-05-24T22:00:00.000Z",
        "title": "Barcelona \u0026 Tenerife",
        "subtitle": "May 25, 2008",
        "altField": "Arc de Triomf, Barcelona, Spain",
        "images": [
          {
            "src": "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500"
          }
        ],
        "actions1": [
          {
            "text": "More info about Barcelona",
            "url": "https://en.wikipedia.org/wiki/Barcelona"
          }
        ]
      }
    ]
    </script>

### dataDescriptionField `String`*(default: "description")*

Sets the field of the data item that provides the description information for the event.


<div class="meta-api-description">
How do I configure the data description field in Kendo UI for jQuery Timeline? Configure or set the property field that defines which data attribute contains the descriptive text or details for timeline events, enabling display, binding, or rendering of event descriptions in tooltips, templates, or detail views by mapping the relevant field name from your data source to control how event descriptions appear and are accessed within timeline visualizations or components.
</div>

#### Example

    <div id="timeline"></div>
    <script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            dataSource: {
              data: data,
              schema: {
                model: {
                  fields: {
                    date: {
                      type: "date"
                    }
                  }
                }
              }
            },
          	dataDescriptionField: "description1",
            alternatingMode: true,
            collapsibleEvents: true,
            orientation: "vertical"
        });
    });

    var data = [
      {
        "description1": "Barcelona is an excellent place to discover world-class arts and culture. Bullfighting was officially banned several years ago, but the city remains rich with festivals and events. The sights in Barcelona are second to none. Don’t miss the architectural wonder, Casa Mila—otherwise known as La Pedrera. It’s a modernist apartment building that looks like something out of an expressionist painting. Make your way up to the roof for more architectural surprises. And if you like Casa Mila, you’ll want to see another one of Antoni Gaudi’s architectural masterpieces, Casa Batllo, which is located at the center of Barcelona.\r\nTenerife, one of the nearby Canary Islands, is the perfect escape once you’ve had your fill of the city. In Los Gigantes, life revolves around the marina.",
        "date": "2008-05-24T22:00:00.000Z",
        "title": "Barcelona \u0026 Tenerife",
        "subtitle": "May 25, 2008",
        "altField": "Arc de Triomf, Barcelona, Spain",
        "images": [
          {
            "src": "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500"
          }
        ],
        "actions": [
          {
            "text": "More info about Barcelona",
            "url": "https://en.wikipedia.org/wiki/Barcelona"
          }
        ]
      }
    ]
    </script>

### dataDateField `String`*(default: "date")*

Sets the field of the data item that provides information when the given event happened in time.

> The value for this field should be either JavaScript Date object or serialized date.


<div class="meta-api-description">
How to set dataDateField in Kendo UI Timeline control? Control event placement on a timeline by linking each data entry to its specific date or timestamp, enabling accurate chronological rendering based on the associated date field in your dataset, whether represented as JavaScript Date objects or serialized date strings. Set, configure, or specify which data attribute defines event timing to ensure timeline events align precisely with their real-world dates, supporting queries about how to map dates to timeline positions, manage date-based sorting or filtering, and display events in proper temporal sequence. This helps with scenarios involving date field assignment, timestamp synchronization, date-driven event rendering, timeline date mapping, and data-to-time axis alignment for visualizing time series or chronological data accurately.
</div>

#### Example

    <div id="timeline"></div>

    <script>
      $(document).ready(function () {
        var dataArray = [
          { "id": 1, "title": "Bowling tournament",
           "subtitle": "Location: Sterling Lanes",
           "description": "Summer Bowling tournament in Michigan",
           "date1": "2025-06-30T21:00:00.000Z",
           "actions": [{ "text": "Visit the Bowling tournament page" }] },
          { "id": 2,
           "title": "Charlie's first football game",
           "subtitle": "Location: City Football Stadium",
           "description": "Call coach Williams",
           "date1": "2022-10-22T21:00:00.000Z" }
        ];

        $("#timeline").kendoTimeline({
          dataSource: {
            data: dataArray,
            schema: {
              model: {
                fields: {
                  date1: {
                    type: "date"
                  }
                }
              }
            }
          },
          dataDateField:"date1",
          orientation: "vertical"
        });
      });
    </script>

### dataImagesAltField `String`*(default: "altField")*

Sets the field of the data item that provides the value for the alt attribute of the images.


<div class="meta-api-description">
How to set alternative text for images in Kendo UI timeline component? Configure alternative text for images within timelines by linking to a data field that supplies descriptive alt attributes, enabling accessibility improvements, SEO optimization, screen reader compatibility, and meaningful image labeling. Enable or set accessible image descriptions for timeline visuals by binding the alt text to specific data properties, ensuring that each image in the timeline component has relevant labels for assistive technologies and search engines. Control and specify the source field for image alt attributes in timeline data items to enhance usability, compliance with accessibility standards, and semantic content recognition.
</div>

#### Example

    <div id="timeline"></div>
    <script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            dataSource: {
              data: data,
              schema: {
                model: {
                  fields: {
                    date: {
                      type: "date"
                    }
                  }
                }
              }
            },
          	dataImagesAltField: "altField1",
            alternatingMode: true,
            collapsibleEvents: true,
            orientation: "vertical"
        });
    });

    var data = [
      {
        "description": "Barcelona is an excellent place to discover world-class arts and culture. Bullfighting was officially banned several years ago, but the city remains rich with festivals and events. The sights in Barcelona are second to none. Don’t miss the architectural wonder, Casa Mila—otherwise known as La Pedrera. It’s a modernist apartment building that looks like something out of an expressionist painting. Make your way up to the roof for more architectural surprises. And if you like Casa Mila, you’ll want to see another one of Antoni Gaudi’s architectural masterpieces, Casa Batllo, which is located at the center of Barcelona.\r\nTenerife, one of the nearby Canary Islands, is the perfect escape once you’ve had your fill of the city. In Los Gigantes, life revolves around the marina.",
        "date": "2008-05-24T22:00:00.000Z",
        "title": "Barcelona \u0026 Tenerife",
        "subtitle": "May 25, 2008",
        "altField1": "Arc de Triomf, Barcelona, Spain",
        "images": [
          {
            "src": "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500"
          }
        ],
        "actions": [
          {
            "text": "More info about Barcelona",
            "url": "https://en.wikipedia.org/wiki/Barcelona"
          }
        ]
      }
    ]
    </script>

### dataImagesField `String`*(default: "images")*

Sets the field of the data item that provides the images information for the event.


<div class="meta-api-description">
How to configure Kendo UI timeline to display images from a custom field in my data? Configure the event data field that holds image information to link, display, or bind image URLs, image objects, or picture references within timeline entries, enabling dynamic rendering of event visuals based on your data structure. This setting controls how images are sourced, matched, or extracted from event datasets and supports flexible mapping of image content for each timeline node or event item, facilitating integration of photos, icons, thumbnails, or custom graphics associated with events. Adjust which attribute or property your timeline utilizes to pull image resources for visual enhancement of events and enable image embedding in chronological data presentations.
</div>

#### Example

    <div id="timeline"></div>
    <script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            dataSource: {
              data: data,
              schema: {
                model: {
                  fields: {
                    date: {
                      type: "date"
                    }
                  }
                }
              }
            },
          	dataImagesField: "images1",
            alternatingMode: true,
            collapsibleEvents: true,
            orientation: "vertical"
        });
    });

    var data = [
      {
        "description": "Barcelona is an excellent place to discover world-class arts and culture. Bullfighting was officially banned several years ago, but the city remains rich with festivals and events. The sights in Barcelona are second to none. Don’t miss the architectural wonder, Casa Mila—otherwise known as La Pedrera. It’s a modernist apartment building that looks like something out of an expressionist painting. Make your way up to the roof for more architectural surprises. And if you like Casa Mila, you’ll want to see another one of Antoni Gaudi’s architectural masterpieces, Casa Batllo, which is located at the center of Barcelona.\r\nTenerife, one of the nearby Canary Islands, is the perfect escape once you’ve had your fill of the city. In Los Gigantes, life revolves around the marina.",
        "date": "2008-05-24T22:00:00.000Z",
        "title": "Barcelona \u0026 Tenerife",
        "subtitle": "May 25, 2008",
        "altField": "Arc de Triomf, Barcelona, Spain",
        "images1": [
          {
            "src": "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500"
          }
        ],
        "actions": [
          {
            "text": "More info about Barcelona",
            "url": "https://en.wikipedia.org/wiki/Barcelona"
          }
        ]
      }
    ]
    </script>

### dataSubtitleField `String`*(default: "subtitle")*

Sets the field of the data item that provides the subtitle information for the event.


<div class="meta-api-description">
How do I customize the secondary text displayed below each event in a Kendo UI for jQuery Timeline widget? Enable configuring the timeline event secondary text or subtitle by specifying which data field contains the supplementary or descriptive string to display beneath the main event title. Control, map, or bind a custom property from your data source to show additional context, detail, or explanatory text for each timeline entry, such as event subtitles, annotations, labels, or secondary information. This supports customization of timeline visual content by linking any relevant secondary textual attribute to the events for enhanced clarity, context, or hierarchical data display in diverse applications.
</div>

#### Example

    <div id="timeline"></div>
    <script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            dataSource: {
              data: data,
              schema: {
                model: {
                  fields: {
                    date: {
                      type: "date"
                    }
                  }
                }
              }
            },
          	dataSubtitleField: "subtitle1",
            alternatingMode: true,
            collapsibleEvents: true,
            orientation: "vertical"
        });
    });

    var data = [
      {
        "description": "Barcelona is an excellent place to discover world-class arts and culture. Bullfighting was officially banned several years ago, but the city remains rich with festivals and events. The sights in Barcelona are second to none. Don’t miss the architectural wonder, Casa Mila—otherwise known as La Pedrera. It’s a modernist apartment building that looks like something out of an expressionist painting. Make your way up to the roof for more architectural surprises. And if you like Casa Mila, you’ll want to see another one of Antoni Gaudi’s architectural masterpieces, Casa Batllo, which is located at the center of Barcelona.\r\nTenerife, one of the nearby Canary Islands, is the perfect escape once you’ve had your fill of the city. In Los Gigantes, life revolves around the marina.",
        "date": "2008-05-24T22:00:00.000Z",
        "title": "Barcelona \u0026 Tenerife",
        "subtitle1": "May 25, 2008",
        "altField": "Arc de Triomf, Barcelona, Spain",
        "images": [
          {
            "src": "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500"
          }
        ],
        "actions": [
          {
            "text": "More info about Barcelona",
            "url": "https://en.wikipedia.org/wiki/Barcelona"
          }
        ]
      }
    ]
    </script>

### dataTitleField `String`*(default: "title")*

Sets the field of the data item that provides the title information for the event.


<div class="meta-api-description">
How do I customize the title of each event in a Kendo UI timeline? Specify or configure which field from your dataset provides the event titles displayed on the timeline, enabling control over the label or name shown for each event by mapping the event title to a custom or specific data attribute; this setting helps customize, set, or assign the text used as the event's heading or main identifier from data items, facilitating flexible title sourcing for events in timeline visualizations or components.
</div>

#### Example

    <div id="timeline"></div>
    <script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            dataSource: {
              data: data,
              schema: {
                model: {
                  fields: {
                    date: {
                      type: "date"
                    }
                  }
                }
              }
            },
          	dataTitleField: "title1",
            alternatingMode: true,
            collapsibleEvents: true,
            orientation: "vertical"
        });
    });

    var data = [
      {
        "description": "Barcelona is an excellent place to discover world-class arts and culture. Bullfighting was officially banned several years ago, but the city remains rich with festivals and events. The sights in Barcelona are second to none. Don’t miss the architectural wonder, Casa Mila—otherwise known as La Pedrera. It’s a modernist apartment building that looks like something out of an expressionist painting. Make your way up to the roof for more architectural surprises. And if you like Casa Mila, you’ll want to see another one of Antoni Gaudi’s architectural masterpieces, Casa Batllo, which is located at the center of Barcelona.\r\nTenerife, one of the nearby Canary Islands, is the perfect escape once you’ve had your fill of the city. In Los Gigantes, life revolves around the marina.",
        "date": "2008-05-24T22:00:00.000Z",
        "title1": "Barcelona \u0026 Tenerife",
        "subtitle": "May 25, 2008",
        "altField": "Arc de Triomf, Barcelona, Spain",
        "images": [
          {
            "src": "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500"
          }
        ],
        "actions": [
          {
            "text": "More info about Barcelona",
            "url": "https://en.wikipedia.org/wiki/Barcelona"
          }
        ]
      }
    ]
    </script>

### dataSource `kendo.data.DataSource | Object`

An instance of a DataSource to which the Timeline will be bound.


<div class="meta-api-description">
How do I configure data binding for the Kendo UI Timeline component? Configure, connect, or bind the timeline view to a data source or dataset to manage, load, and display timeline items dynamically with support for sorting, filtering, data retrieval, updates, and CRUD operations; control how timeline events are sourced from backend services or in-memory data structures, enabling integration with external APIs, databases, or client-side data collections for seamless data management and synchronization within the timeline component.
</div>

#### Example

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        orientation: "vertical"
    });
    </script>

### eventTemplate `String|Function`

Specifies the template used to render the event details.


<div class="meta-api-description">
How to customize event details in Kendo UI Timeline control? Control and customize event detail rendering in a timeline by defining templates that can be set as HTML strings, compiled templates, or rendering functions receiving event data, enabling dynamic binding of event properties, flexible markup structure, tailored formatting, and personalized display of event information, allowing developers to configure how event content appears, format event fields, and integrate custom layouts or styling within a timeline view.
</div>

#### Example

    <script id="eventTemplate" type="text/x-kendo-template">
      <div class="k-card-header">
          <h5 class="k-card-title">#=data.title#</h5>
          <h6 class="k-card-subtitle">#=data.subtitle#</h6>
      </div>
      <div class="k-card-body">
          <div class="k-card-description">
          <p>#=data.description#</p>
          # var images = data.images;
          if(images && images.length > 0) { #
            <img src="#=images[0].src#" class="k-card-media">
            <img src="#=images[1].src#" class="k-card-media">
          # } #
          </div>
      </div>
    </script>

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        eventTemplate: kendo.template($("#eventTemplate").html()),
        orientation: "horizontal"
    });
    </script>

### dateFormat  `String`*(default: "MMM d, yyyy")*

Sets the date format used to display the date in the event's label


<div class="meta-api-description">
How do I customize the date format in Kendo UI Timeline? Set or customize the display format of event dates within a timeline or calendar view by specifying date strings or patterns, enabling control over how dates are rendered inside event labels, such as month/day/year or day-month-year formats, allowing developers to configure, format, or change date appearance using common or custom date formatting tokens to match locale, user preference, or design requirements during initialization or dynamically.
</div>

#### Example

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        orientation: "vertical",
        dateFormat: "M/d/yyyy"
    });
    </script>

### eventHeight `Number`*(default: 600)*

Sets specific height for the event in horizontal mode.

> This setting is supported only in horizontal mode.


<div class="meta-api-description">
How do I adjust the height of events in a Kendo UI timeline? Adjust or customize the vertical size, height, or thickness of timeline entries or event bars when arranging events horizontally in a schedule, calendar, or chronological visualization; configure spacing, alignment, row height, or event block dimensions to improve readability, control visual density, or manage layout compactness of events displayed in a left-to-right timeline orientation where height settings dictate the sizing of individual event elements.
</div>

#### Example

    <div id="timeline"></div>
    <script>
    $("#timeline").kendoTimeline({
        dataSource: [
            {
                date: new Date(2020, 10, 10),
                title: "Barcelona \u0026 Tenerife",
                subtitle: "Spain",
                description: "The 2020 Spanish election",
                altField: "Canary Islands"
            },
            {
                date: new Date(2020, 10, 15),
                title: "United States",
                subtitle: "Elections",
                description: "The 2020 US election"
            }
        ],
        orientation: "horizontal",
        eventHeight: 400
    });
    </script>

### eventWidth `Number`*(default: 400)*

Sets specific width for the event in vertical mode.

> This method is supported only in vertical mode.


<div class="meta-api-description">
How do I set a fixed width for events in a vertically displayed Kendo UI Timeline? Adjust or set the fixed width of events in a vertically displayed timeline to control their size, spacing, and alignment, enabling customization of event appearance, layout management, and visual distribution within the vertical timeline view. This setting helps configure event block width to improve readability, prevent overlap, and maintain consistent spacing when rendering events stacked vertically.
</div>

#### Example

    <div id="timeline"></div>
    <script>
    $("#timeline").kendoTimeline({
        dataSource: [
            {
                date: new Date(2020, 10, 10),
                title: "Barcelona \u0026 Tenerife",
                subtitle: "Spain",
                description: "The 2020 Spanish election",
                altField: "Canary Islands"
            },
            {
                date: new Date(2020, 10, 15),
                title: "United States",
                subtitle: "Elections",
                description: "The 2020 US election"
            }
        ],
        orientation: "vertical",
        eventWidth: 500
    });
    </script>

### navigatable `Boolean`*(default: false)*

If set to `true`, will enable the keyboard navigation for the component.


<div class="meta-api-description">
How do I enable keyboard navigation in a Kendo UI timeline component? Enable or configure keyboard navigation and focus control within interactive timeline or event sequence components, allowing users to traverse items using arrow keys, tabbing, or standard keyboard shortcuts; set keyboard accessibility options to navigate, select, or control timeline entries efficiently through keyboard input, enhancing user interaction by supporting keyboard focus management, navigation modes, and accessible keyboard controls for sequential or temporal item browsing.
</div>

#### Example

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        orientation: "horizontal",
        navigatable: true
    });
    </script>

### showDateLabels `Boolean`*(default: true)*

If set to `false`, the event's date label will be hidden.


<div class="meta-api-description">
How to show date labels in Kendo UI for jQuery timeline? Control the visibility of event dates in a timeline or schedule by toggling the display of date labels next to each event, enabling users to show or hide date markers to simplify or clarify chronological event layouts, configure whether event timestamps or date headers appear alongside timeline entries, set boolean flags to manage the presentation of dates in chronological views, or customize the timeline interface to include or exclude date annotations for improved readability and streamlined display of time-based event data.
</div>

#### Example

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        orientation: "vertical",
        showDateLabels: false
    });
    </script>

## Methods

### expand

Expands an event.

> This method is supported only in vertical mode.


<div class="meta-api-description">
How do I programmatically expand timeline events in Kendo UI for jQuery? Control programmatic expansion of timeline events to reveal detailed content, nested information, or sub-events within a vertical timeline display, enabling dynamic opening of collapsed timeline entries through code. This functionality supports triggering expansions based on user actions, data changes, or automated workflows, facilitating interactive, adjustable timeline views by setting or toggling expanded states for specific events, controlling event visibility, and managing hierarchical timeline details within vertical layouts.
</div>

#### Parameters

##### event `String | Element | jQuery`

A string, a DOM element, or a jQuery object which represents the event. A string is treated as a jQuery selector.

#### Example - expand the first event

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        collapsibleEvents: true,
        orientation: "vertical"
    });

    var timeline = $("#timeline").data().kendoTimeline;
    var firstEvent = timeline.element.find(".k-timeline-event:eq(0)");
    timeline.expand(firstEvent);
    </script>

### collapse

Collapse an event.

> This method is supported only in vertical mode.


<div class="meta-api-description">
How can I programmatically collapse expanded events in a vertical Kendo UI Timeline? Control how to programmatically hide or minimize expanded timeline events, collapsing detailed views or visual nodes on vertical timelines by invoking a collapse action or method. Enable closing or retracting event expansions triggered by user clicks, code commands, or interactive gestures, specifically managing timeline item visibility, folding, or contraction in vertical layouts while noting that collapsing functionality does not apply or work in horizontal timeline orientations. This supports scenarios where developers need to automate hiding event details, toggle visibility states, or manage timeline event expansions and collapses through code in vertically oriented timeline components.
</div>

#### Parameters

##### event `String | Element | jQuery`

A string, a DOM element, or a jQuery object which represents the event. A string is treated as a jQuery selector.

#### Example - expand the first event

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        collapsibleEvents: true,
        orientation: "vertical"
    });

    var timeline = $("#timeline").data().kendoTimeline;
    var firstEvent = timeline.element.find(".k-timeline-event:eq(0)");
    timeline.expand(firstEvent);
    setTimeout(function() {
        timeline.collapse(firstEvent);
    });
    </script>

### open

Open event details.

> This method is supported only in horizontal mode.


<div class="meta-api-description">
How do I programmatically open an event's detail panel in a Kendo UI Timeline? Invoke a function to programmatically reveal, display, or show detailed information, full event data, or expanded content for a specific timeline entry or event within a horizontal timeline interface; enable opening, toggling, or activating an event’s detail panel dynamically at runtime to access comprehensive event metadata, timeline event details, or additional event descriptions, supporting interactive, controlled, or automated views of timeline events after component initialization.
</div>

#### Parameters

##### event `String | Element | jQuery`

A string, a DOM element, or a jQuery object which represents the event. A string is treated as a jQuery selector.

#### Example - expand the first event

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        orientation: "horizontal"
    });

    var timeline = $("#timeline").data().kendoTimeline;
    var firstEvent = timeline.element.find(".k-timeline-track-item:eq(3)");
    timeline.open(firstEvent);
    </script>

### destroy

Prepares the Timeline for safe removal from the DOM. Detaches all event handlers and removes the `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widgets.

> The `destroy` method does not remove the `Timeline` element from the DOM.


<div class="meta-api-description">
How do I properly destroy a Kendo UI for jQuery timeline component to prevent memory leaks? Control the complete cleanup and disposal process of a timeline component by detaching event listeners, unbinding data attributes to prevent memory leaks, and cascading destruction through child UI elements to fully release resources before manual DOM element removal. Configure teardown routines, enable comprehensive unbinding of event handlers, data detachment, and resource deallocation for timeline-based interfaces, ensuring proper lifecycle management, memory optimization, and preventing memory leaks in complex UI hierarchies. This method is essential for developers needing to programmatically manage and destroy timeline components, trigger cleanup sequences, or implement custom DOM manipulations while maintaining application stability and performance.
</div>

#### Example

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        collapsibleEvents: true,
        orientation: "vertical"
    });

    var timeline = $("#timeline").data().kendoTimeline;
    timeline.destroy();
    </script>

### next

Switches to the next portion of events with animation.

> This method is supported only in horizontal mode.


<div class="meta-api-description">
How to programmatically advance to the next event set in a Kendo UI Timeline control? Control or trigger the horizontal timeline navigation by moving to the next set or group of events with smooth animated transitions, enabling programmatic advancement or linking navigation buttons to shift the timeline forward. This method handles advancing to the subsequent visible event segment, supports next-step navigation in horizontal layout only, and ensures seamless scrolling effects when stepping through timeline event groups. Adjust, enable, or automate horizontal timeline progression, skipping forward through event clusters with built-in animation while ignoring vertical orientations.
</div>

#### Example

    <div id="timeline" style="width: 520px;"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        orientation: "horizontal"
    });

    var timeline = $("#timeline").data().kendoTimeline;
    timeline.next();
    </script>

### previous

Switches to the previous portion of events with animation.

> This method is supported only in horizontal mode.


<div class="meta-api-description">
How to programmatically navigate to previous page in Kendo UI Timeline widget? Navigate backward or scroll left through the timeline events with a smooth animated transition, enabling programmatic control to move the visible view to the prior segment of events or page back one step horizontally, updating the displayed content dynamically while triggering animation effects and adjusting the visible event range for seamless horizontal timeline navigation and pagination.
</div>

#### Example

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        orientation: "horizontal"
    });

    var timeline = $("#timeline").data().kendoTimeline;
    timeline.previous();
    </script>

### redraw

Redraws the Timeline widget.


<div class="meta-api-description">
How to manually refresh Kendo UI timeline display after changing data or options? Trigger a full visual refresh and layout recalculation of the timeline display without resetting the entire component state, enabling updates after dynamic changes to data, options, or container dimensions that won’t automatically refresh the view, supporting manual control over re-rendering, repainting, or recalculating timeline visuals, forcing the timeline to update its rendering, recomputing sizes and positions, or applying new configurations programmatically to ensure the displayed timeline remains current and accurately laid out after modifications.
</div>

#### Example

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        orientation: "horizontal"
    });

    var timeline = $("#timeline").data().kendoTimeline;

    setTimeout(() => {
      var newWidth = timeline.element.width() / 2;
      timeline.element.width(newWidth);
      timeline.redraw();
    }, 2000);
    </script>

### setDataSource

Sets the DataSource of an existing Timeline and rebinds it.


<div class="meta-api-description">
How to dynamically change data in a Kendo UI timeline widget using setDataSource? Update or change the data collection feeding a timeline visualization dynamically by setting a new data source, enabling refresh and rebinding of the displayed items without recreating the entire component. Configure, switch, replace, or update the timeline's underlying data provider at runtime to reflect new datasets, adjust displayed events or entries, and reload content seamlessly while maintaining the existing timeline structure and state. Manage and control data inputs, refresh visible timeline elements, and bind alternative or updated data streams on the fly to ensure real-time updates or context changes within timeline views.
</div>

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example


    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        orientation: "horizontal"
    });

    var timeline = $("#timeline").data().kendoTimeline;
    timeline.setDataSource(new kendo.data.DataSource({
        data: [ {"id":1,"title":"First event","subtitle":"Location: First event location","description":"First event description","date": new Date(2025, 6, 30),"actions":[{"text":"First event action"}] }, {"id":2,"title":"Second event","subtitle":"Location: Second event location","description":"Second event description","date": new Date(2026, 6, 30),"actions":[{"text":"Second event action"}] }]
    }));
    </script>

## Events

### change

Fires when a new event is opened.

> This event is supported only in horizontal mode.


<div class="meta-api-description">
How do I detect when an item is selected on a Kendo UI timeline widget? Detect when a user selects, opens, or activates an item on a horizontal timeline to trigger actions like loading event details, updating UI elements, focusing on the chosen entry, synchronizing application state, fetching related data remotely, tracking user interaction patterns, or displaying expanded information panels dynamically when timeline entries change.
</div>

#### Event Data

##### e.sender `kendo.ui.Timeline`

The widget instance which fired the event.

##### e.dataItem `kendo.data.Model`

The data item for the selected event.

##### e.eventContainer `jQuery`

The container element that will load the event details.

##### e.preventDefault `Function`

If invoked, prevents the change action.

#### Example - hooking up to the change event

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        orientation: "horizontal",
        change: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("eventContainer ", e.eventContainer, "data: ", e.dataItem);
        //handle event
        }
    });
    </script>

### dataBound

Fires when the Timeline is bound to data.


<div class="meta-api-description">
When is the dataBound event triggered in Kendo UI Timeline component? Trigger actions or run custom code after a dynamic timeline or scheduling component completes loading, data binding, and rendering from local or remote data sources, enabling updates to user interface elements, layout adjustments, or any post-processing logic once all timeline items are fully loaded and displayed, responding to events that signal completion of asynchronous data fetches, refreshes, or UI redraws to ensure synchronization with the final data state.
</div>

#### Example

    <div id="timeline"></div>
    <script>
    $("#timeline").kendoTimeline({
        dataSource: [
            {
                date: new Date(2020, 10, 10),
                title: "Barcelona \u0026 Tenerife",
                subtitle: "Spain",
                description: "The 2020 Spanish election"
            },
            {
                date: new Date(2020, 10, 15),
                title: "United States",
                subtitle: "Elections",
                description: "The 2020 US election"
            }
        ],
        dataBound: function(e) {
            console.log("Timeline data bound");
        }
    });
    </script>

#### Event Data

##### e.sender `kendo.ui.Timeline`

The widget instance which fired the event.

### expand

Fires when an event is going to be expanded.

> This event is supported only in vertical mode.


<div class="meta-api-description">
How to handle expansion in Kendo UI timeline component? Detect, handle, or respond to the moment before an item or event expands in a vertical timeline interface by triggering custom logic such as preload operations, lazy content fetching, UI updates, state changes, or data preparation for detailed views, enabling developers to configure, intercept, or control expansion behavior, perform asynchronous loading, manage component state transitions, and optimize user interaction prior to event expansion within timeline components supporting vertical layouts.
</div>

#### Event Data

##### e.sender `kendo.ui.Timeline`

The widget instance which fired the event.

##### e.dataItem `kendo.data.Model`

The data item asociated with the event that is going to be expanded.

##### e.preventDefault `Function`

If invoked, prevents the expand action.

#### Example - hooking up to the expand event

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        collapsibleEvents: true,
        orientation: "vertical",
        expand: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("data: ", e.dataItem);
            //handle event
        }
    });
    </script>

### collapse

Fires when an event is going to be collapsed.

> This event is supported only in vertical mode.


<div class="meta-api-description">
What event is triggered when a timeline entry collapses in Kendo UI for jQuery? Detect and handle the moment a timeline entry is about to close, collapse, or fold, enabling execution of pre-collapse actions, state updates, or synchronization with connected elements before the item shrinks or hides its detailed content. Triggered specifically when an expandable timeline element in vertical orientation is collapsing, this event provides access to event details allowing developers to intercept, inspect, and respond to impending collapses through custom logic or inter-component communication, useful for managing UI transitions, data consistency, or conditional rendering just prior to collapsing timeline nodes.
</div>

#### Event Data

##### e.sender `kendo.ui.Timeline`

The widget instance which fired the event.

##### e.dataItem `kendo.data.Model`

The data item asociated with the event that is going to be expanded.

##### e.preventDefault `Function`

If invoked, prevents the collapse action.

#### Example - hooking up to the collapse event

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        collapsibleEvents: true,
        orientation: "vertical",
        collapse: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("data: ", e.dataItem);
            //handle event
        }
    });

    var timeline = $("#timeline").data().kendoTimeline;
    var firstEvent = timeline.element.find(".k-timeline-event:eq(0)");
    timeline.expand(firstEvent);
    </script>

### actionClick

Fires when an action for an event is clicked.


<div class="meta-api-description">
How to handle click event on action elements in Kendo UI for jQuery Timeline? Detect and respond to user clicks on interactive action elements tied to timeline events, enabling developers to capture and handle click events for tasks such as opening event details, initiating editing modes, deleting items, triggering custom workflows, or updating application state and UI. Enable interception of action clicks to control event-driven behaviors, customize navigation flows, perform data manipulations, override default interactions, or integrate custom logic when users interact with timeline event controls. This functionality supports configuring event listeners, managing click handlers, and executing conditional responses to user interactions within timeline components.
</div>

#### Event Data

##### e.sender `kendo.ui.Timeline`

The widget instance which fired the event.

##### e.dataItem `kendo.data.Model`

The data item asociated with the action that is clicked.

##### e.element `jQuery`

The action DOM element that is clicked.

#### Example - hooking up to the actionClick event

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        collapsibleEvents: true,
        orientation: "vertical",
        actionClick: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("data: ", e.dataItem);
            //handle event
        }
    });
    </script>

### navigate

Fires when the left or right arrow is clicked.


<div class="meta-api-description">
How to handle navigation actions in Kendo UI for jQuery Timeline component? Detect and respond to user navigation actions such as clicking left or right arrows to move or scroll through a timeline or date range, enabling dynamic updates like loading additional content, adjusting visible time intervals, synchronizing with other UI elements, or triggering events when users advance or rewind the timeline view, control timeline navigation behavior, handle directional input for timeline movement, react to navigation controls, and implement custom logic on timeline step changes or shifts.
</div>

#### Event Data

##### e.sender `kendo.ui.Timeline`

The widget instance which fired the event.

##### e.action `String`

next or previous values depending whether user is trying to load next or previous portion of events.

##### e.preventDefault `Function`

If invoked, prevents the navigate action.

#### Example - hooking up to the navigate event

    <div id="timeline"></div>

    <script>

    $("#timeline").kendoTimeline({
        dataSource: {
            data:[ {"id":1,"title":"Bowling tournament","subtitle":"Location: Sterling Lanes","description":"Summer Bowling tournament in Michigan","date":"2025-06-30T21:00:00.000Z","actions":[{"text":"Visit the Bowling tournament page"}] },
                    {"id":2,"title":"Charlie's first football game","subtitle":"Location: City Football Stadium","description":"Call coach Williams","date":"2022-10-22T21:00:00.000Z"},
                    {"id":3,"title":"Alex's Birthday","subtitle":"Location: Alex's House","description":"Buy birthday cake and some fruits","date":"2010-01-09T22:00:00.000Z","images":[{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/4.jpg"},{"src":"https://demos.telerik.com/kendo-ui/content/web/foods/16.jpg"}]},
                    {"id":4,"title":"Vacation in Mexico","subtitle": "Location: Cabo San Lucas","description":"Check-in for the flight","date":"2017-12-24T22:00:00.000Z"}],
            schema: {
                model: {
                fields: {
                    date: {
                    type: "date"
                    }
                }
                }
            }
        },
        collapsibleEvents: true,
        orientation: "horizontal",
        navigate: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("action: ", e.action);
            //handle event
        }
    });
    </script>
