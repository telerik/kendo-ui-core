---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI DropDownTree component for {{ site.framework }}."
slug: orgchart_events
position: 5
---

# Events

The OrgChart exposes a variety of [events](api/kendo.mvc.ui.fluent/orgcharteventbuilder) that you can handle and further customize the behavior of the UI component.

For a complete example on the OrgChart events, refer to the [OrgChart Events Demo](https://demos.telerik.com/{{ site.platform }}/orgchart/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().OrgChart()
      .Name("orgchart")
      .Events(e => e
            .Select("onSelect")
            .Change("onChange")
      )
    )
```
{% if site.core %}
```TagHelper
    <kendo-orgchart name="orgchart"
                    on-select="onSelect"
                    on-change="onChange">
    </kendo-orgchart>
    

```
{% endif %}
```JavaScript
    <script>
        function onSelect(e) {
            // Handle the "select" event.
        }

        function onChange(e) {
            // Handle the "change" event.
        }
    </script>
```
## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().OrgChart()
      .Name("orgchart")
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
    <kendo-orgchart name="orgchart"
                    on-select="function() {
                        // Handle the select event inline.
                    }"
                    on-change="function() {
                        // Handle the change event inline.
                    }">
    </kendo-orgchart>
    

```
{% endif %}

## Next Steps

* [Using the OrgChart Events (Demo)](https://demos.telerik.com/{{ site.platform }}/orgchart/events)

## See Also

* [Using the API of the OrgChart for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/orgchart/api)
* [Client-Side API of the OrgChart](https://docs.telerik.com/kendo-ui/api/javascript/ui/orgchart)
* [Server-Side API of the OrgChart](/api/orgchart)
