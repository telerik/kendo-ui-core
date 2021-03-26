---
title: Actions
page_title: jQuery Timeline Documentation | Actions
description: "Action links in the Kendo UI jQuery Timeline widget allow you to provide extra details to the users."
slug: actions_kendoui_timeline_widget
position: 3
---

# Actions

The Timeline can render links (`<a>` tags) for the items of its `actions` collection in the data source and the user can navigate to the specific pages.

The `href` attribute of an action will be set to the value of the `url` field of the action literal and the text will come from the `text` field.

The following example demonstrates how to use a field with a specific name to provide actions for the events.

```dojo
<div id="timeline"></div>

<script>
    $(document).ready(function () {
        $("#timeline").kendoTimeline({
            dataActionsField: "linksList",
            dataSource: {
                data: eventsData, // You can also use a remote data source that will return the corresponding array of JSON literals.
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
            linksList: [
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
            linksList: [
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

* [Basic Usage of the Timeline (Demo)](https://demos.telerik.com/kendo-ui/timeline/index)
* [JavaScript API Reference of the Timeline](/api/javascript/ui/timeline)
