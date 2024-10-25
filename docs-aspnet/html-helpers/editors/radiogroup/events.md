---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI RadioGroup component for {{ site.framework }}."
slug: events_radioGroup_aspnetcore
position: 7
---



# Events

The Telerik UI for {{ site.framework }} RadioGroup exposes multiple [events](/api/kendo.mvc.ui.fluent/radiogroupeventbuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic RadioGroup events, refer to the [demo on using the events of the RadioGroup](https://demos.telerik.com/{{ site.platform }}/radiogroup/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by handler name.

```HtmlHelper
    @(Html.Kendo().RadioGroup()
        .Name("radiogroup")
        .Items(i =>
        {
            i.Add().Label("Two bedroom apartment for multiple people").Value("1");
            i.Add().Label("Studio apartment with kitchen").Value("2");
            i.Add().Label("Double bed apartment with kids zone").Value("3");
        })
        .Value("2")
        .Events(e => e.Change("onChange"))
    )
```
{% if site.core %}
```TagHelper
        <kendo-radiogroup name="radiogroup" on-change="onChange"
                          radio-name="radiogroup"    
                          value="2">
            <kendo-radiogroup-items>
                <kendo-radiogroup-item label="Two bedroom apartment for multiple people" value="1"></kendo-radiogroup-item>
                <kendo-radiogroup-item label="Studio apartment with kitchen" value="2"></kendo-radiogroup-item>
                <kendo-radiogroup-item label="Double bed apartment with kids zone" value="3"></kendo-radiogroup-item>
            </kendo-radiogroup-items>
        </kendo-radiogroup>
```
{% endif %}
```JavaScript
    <script>
        function onChange() {
            // Handle the change event.
        }
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.

```HtmlHelper
    @(Html.Kendo().RadioGroup()
        .Name("radiogroup")
        .Events(e => e
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
    <kendo-radiogroup name="radiogroup"
     on-change="function() {
        //Handle the change event inline.
    }">
    </kendo-radiogroup>
```
{% endif %}

## Next Steps

* [Using the RadioGroup Events (Demo)](https://demos.telerik.com/{{ site.platform }}/radioGroup/events)

## See Also

* [Using the API of the RadioGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radiogroup/api)
* [RadioGroup Server-Side API](/api/radiogroup)
* [RadioGroup Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/radiogroup)
