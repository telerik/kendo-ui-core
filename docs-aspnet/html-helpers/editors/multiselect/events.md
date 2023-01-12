---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI MultiSelect component for {{ site.framework }}."
slug: events_multiselect_aspnetcore
position: 7
---

# Events

The Telerik UI MultiSelect for {{ site.framework }} exposes multiple [events](/api/Kendo.Mvc.UI.Fluent/MultiSelectEventBuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic MultiSelect events, refer to the [demo on using the events of the MultiSelect](https://demos.telerik.com/{{ site.platform }}/multiselect/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("multiselect_select")
            .Change("multiselect_change")
        )
    )
    <script>
        function multiselect_select() {
            // Handle the select event.
        }

        function multiselect_change() {
            // Handle the change event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    @{
        var multiSelect_data = new string[] { "Item1", "Item2", "Item3" };
    }

    <kendo-multiselect name="multiselect"
                       on-select="multiselect_select"
                       on-change="multiselect_change"
                       bind-to="multiSelect_data">
    </kendo-multiselect>
    <script>
        function multiselect_select() {
            // Handle the select event.
        }

        function multiselect_change() {
            // Handle the change event.
        }
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
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
        var multiSelect_data = new string[] { "Item1", "Item2", "Item3" };
    }

    <kendo-multiselect name="multiselect"
                       on-select="function() {
                           // Handle the select event inline.
                       }"
                       on-change="function() {
                          // Handle the change event inline.
                       }"
                       bind-to="multiSelect_data">
    </kendo-multiselect>
```
{% endif %}

## Next Steps

* [Using the MultiSelect Events (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/events)

## See Also

* [Using the API of the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/api)
* [MultiSelect Server-Side API](/api/multiselect)
* [MultiSelect Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
