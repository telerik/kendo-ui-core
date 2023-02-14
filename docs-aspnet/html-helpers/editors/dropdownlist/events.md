---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI DropDownList component for {{ site.framework }}."
slug: events_dropdownlist_aspnetcore
position: 7
---

# Events

The Telerik UI DropDownList for {{ site.framework }} exposes multiple [events](/api/Kendo.Mvc.UI.Fluent/DropDownListEventBuilder) that allow you to control and customize the behavior of the component.

For a complete example of the basic DropDownList events, refer to the [demo on using the events of the DropDownList](https://demos.telerik.com/{{ site.platform }}/dropdownlist/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .DataTextField("Text")
        .DataValueField("Value")
        .BindTo(new List<SelectListItem>() {
            new SelectListItem() {
                Text = "Item1", Value = "1"
            },
            new SelectListItem() {
                Text = "Item2", Value = "2"
            },
            new SelectListItem() {
                Text = "Item3", Value = "3"
            }
        })
        .Events(e => e
            .Select("onSelect")
            .Change("onChange")
        )
    )
    <script>
        function onSelect() {
            // Handle the select event.
        }

        function onChange() {
            // Handle the change event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    @{
        var data = new List<SelectListItem>() {
            new SelectListItem() {
                Text = "Item1", Value = "1"
            },
            new SelectListItem() {
                Text = "Item2", Value = "2"
            },
            new SelectListItem() {
                Text = "Item3", Value = "3"
            }
        };
    }

    <script>
        function onSelect() {
            // Handle the select event.
        }

        function onChange() {
            // Handle the change event.
        }
    </script>

    <kendo-dropdownlist name="dropdownlist"
        datatextfield="Text"
        datavaluefield="Value"
        bind-to="data"
        on-select="onSelect"
        on-change="onChange">
    </kendo-dropdownlist>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .DataTextField("Text")
        .DataValueField("Value")
        .BindTo(new List<SelectListItem>() {
            new SelectListItem() {
                Text = "Item1", Value = "1"
            },
            new SelectListItem() {
                Text = "Item2", Value = "2"
            },
            new SelectListItem() {
                Text = "Item3", Value = "3"
            }
        })
        .Events(e => e
            .Select(@<text>
                function() {
                    // Handle the select event inline.
                }
            </text>)
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    @{
        var data = new List<SelectListItem>() {
            new SelectListItem() {
                Text = "Item1", Value = "1"
            },
            new SelectListItem() {
                Text = "Item2", Value = "2"
            },
            new SelectListItem() {
                Text = "Item3", Value = "3"
            }
        };
    }

    <kendo-dropdownlist name="dropdownlist"
        datatextfield="Text"
        datavaluefield="Value"
        bind-to="data"
        on-select="function() {
            // Handle the select event inline.
        }"
        on-change="function() {
            // Handle the change event inline.
        }">
    </kendo-dropdownlist>
```
{% endif %}

## Next Steps

* [Using the DropDownList Events (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/events)

## See Also

* [Using the API of the DropDownList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/api)
* [Server-Side API of the DropDownList](/api/dropdownlist)
* [Client-Side API of the DropDownList](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
