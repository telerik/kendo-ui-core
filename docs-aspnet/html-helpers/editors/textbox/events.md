---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI TextBox component for {{ site.framework }}."
slug: events_textbox_aspnetcore
position: 7
---

# Events

The Telerik UI TextBox for {{ site.framework }} exposes multiple [events](/api/Kendo.Mvc.UI.Fluent/TextBoxEventBuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic TextBox events, refer to the [demo on using the events of the TextBox](https://demos.telerik.com/{{ site.platform }}/textbox/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.


```HtmlHelper
  @(Html.Kendo().TextBox()
        .Name("textbox")
        .Events(e => e
            .Change("textbox_change")
        )
  )
```
{% if site.core %}
```TagHelper
<kendo-textbox name="textbox"
               on-change="textbox_change">
</kendo-textbox>
```
{% endif %}
```script.js
  <script>
  function textbox_change() {
      // Handle the change event.
  }
  </script>
```

## Next Steps

* [Using the TextBox Events (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/events)

## See Also

* [Using the API of the TextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/api)
* [TextBox Server-Side API](/api/textbox)
* [TextBox Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/textbox)
