---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI CheckBoxGroup component for {{ site.framework }}."
slug: events_checkboxgroup_aspnetcore
position: 4
---

# Events

The Telerik UI CheckBoxGroup for {{ site.framework }} exposes multiple [events](/api/kendo.mvc.ui.fluent/checkboxgroupeventbuilder) that allow you to control and customize the behavior of the component.

For a complete example of the basic CheckBoxGroup events, refer to the [demo on using the events of the CheckBoxGroup](https://demos.telerik.com/{{ site.platform }}/checkboxgroup/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().CheckBoxGroup()
        .Name("checkboxgroup")
        .Items(i =>
        {
            i.Add().Label("Day pack").Value("1");
            i.Add().Label("Hiking poles").Value("2");
            i.Add().Label("Hiking boots").Value("3");
            i.Add().Label("UV protection sunglass").Value("4");
            i.Add().Label("Trousers").Value("5").Enabled(false);
        })
        .Value(new string[] { "1", "2" })
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
    <script>
        function onSelect() {
            // Handle the select event.
        }

        function onChange() {
            // Handle the change event.
        }
    </script>

    <kendo-checkboxgroup name="checkboxgroup"
                         value="value"
                         on-change="onChange"
                         on-select="onSelect">
        <kendo-checkboxgroup-items>
            <kendo-checkboxgroup-item label="Day pack"
                                      value="1">
            </kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item label="Hiking poles"
                                      value="2">
            </kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item label="Hiking boots"
                                      value="3">
            </kendo-checkboxgroup-item>
        </kendo-checkboxgroup-items>
    </kendo-checkboxgroup>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().CheckBoxGroup()
        .Name("checkboxgroup")
        .Items(i =>
        {
            i.Add().Label("Day pack").Value("1");
            i.Add().Label("Hiking poles").Value("2");
            i.Add().Label("Hiking boots").Value("3");
            i.Add().Label("UV protection sunglass").Value("4");
            i.Add().Label("Trousers").Value("5").Enabled(false);
        })
        .Value(new string[] { "1", "2" })
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
    <kendo-checkboxgroup name="checkboxgroup"
                         value="value"
                         on-change="onChange"
                         on-select="onSelect">
        <kendo-checkboxgroup-items>
            <kendo-checkboxgroup-item label="Day pack"
                                      value="1">
            </kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item label="Hiking poles"
                                      value="2">
            </kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item label="Hiking boots"
                                      value="3">
            </kendo-checkboxgroup-item>
        </kendo-checkboxgroup-items>
    </kendo-checkboxgroup>
```
{% endif %}

## Next Steps

* [Using the CheckBoxGroup Events (Demo)](https://demos.telerik.com/{{ site.platform }}/checkboxgroup/events)

## See Also

* [Using the API of the CheckBoxGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/checkboxgroup/api)
* [Server-Side API of the CheckBoxGroup](/api/checkboxgroup)
* [Client-Side API of the CheckBoxGroup](https://docs.telerik.com/kendo-ui/api/javascript/ui/checkboxgroup)
