---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ComboBox component for {{ site.framework }}."
slug: events_combobox_aspnetcore
position: 7
---

# Events

The Telerik UI ComboBox for {{ site.framework }} exposes multiple [events](/api/Kendo.Mvc.UI.Fluent/ComboBoxEventBuilder) that allow you to control and customize the behavior of the component.

For a complete example of the basic ComboBox events, refer to the [demo on using the events of the ComboBox](https://demos.telerik.com/{{ site.platform }}/combobox/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("combobox")
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

    <kendo-combobox name="combobox"
        datatextfield="Text"
        datavaluefield="Value"
        bind-to="data"
        on-select="onSelect"
        on-change="onChange">
    </kendo-combobox>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("combobox")
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

    <kendo-combobox name="combobox"
        datatextfield="Text"
        datavaluefield="Value"
        bind-to="data"
        on-select="function() {
            // Handle the select event inline.
        }"
        on-change="function() {
            // Handle the change event inline.
        }">
    </kendo-combobox>
```
{% endif %}

## Next Steps

* [Using the ComboBox Events (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/events)

## See Also

* [Using the API of the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/api)
* [Server-Side API of the ComboBox](/api/combobox)
* [Client-Side API of the ComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
