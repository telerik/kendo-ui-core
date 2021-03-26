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

### dataDescriptionField `String`*(default: "description")*

Sets the field of the data item that provides the description information for the event.

### dataDateField `String`*(default: "date")*

Sets the field of the data item that provides information when the given event happened in time.

> The value for this field should be either JavaScript Date object or serialized date.

### dataImagesAltField `String`*(default: "altField")*

Sets the field of the data item that provides the value for the alt attribute of the images.

### dataImagesField `String`*(default: "images")*

Sets the field of the data item that provides the images information for the event.

### dataSubtitleField `String`*(default: "subtitle")*

Sets the field of the data item that provides the subtitle information for the event.

### dataTitleField `String`*(default: "title")*

Sets the field of the data item that provides the title information for the event.

### dataSource `kendo.data.DataSource | Object`

An instance of a DataSource to which the Timeline will be bound.

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
            <img src="#=images[0].src#" class="k-card-image">
            <img src="#=images[1].src#" class="k-card-image">
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

### eventWidth `Number`*(default: 400)*

Sets specific width for the event in vertical mode. 

> This method is supported only in vertical mode.

### navigatable `Boolean`*(default: false)*

If set to `true`, will enable the keyboard navigation for the component.

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
          console.log("eventContainer ", e.eventContainer, "data: ", e.dataItem);
        //handle event
        }
    });
    </script>

### dataBound

Fires when the Timeline is bound to data.

#### Event Data

##### e.sender `kendo.ui.Timeline`

The widget instance which fired the event.

### expand

Fires when an event is going to be expanded.

> This event is supported only in vertical mode.

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
            console.log("data: ", e.dataItem);
            //handle event
        }
    });
    </script>

### collapse

Fires when an event is going to be collapsed.

> This event is supported only in vertical mode.

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
            console.log("data: ", e.dataItem);
            //handle event
        }
    });
    </script>

### navigate

Fires when the left or right arrow is clicked.

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
            console.log("action: ", e.action);
            //handle event
        }
    });
    </script>
