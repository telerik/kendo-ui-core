---
title: Events
page_title: Telerik UI SpeechToTextButton Documentation - Client Events
description: "Learn how to handle the events of the Telerik UI SpeechToTextButton component for {{ site.framework }}."
components: ["speechtotextbutton"]
slug: speechtotextbutton_events
position: 3
---

# Events

The Telerik UI SpeechToTextButton for {{ site.framework }} [exposes events](/api/kendo.mvc.ui.fluent/speechtotextbuttoneventbuilder) like `Start`, `End`, `Result`, and `Error`, that allow you to control the behavior of the UI component.

For a complete example on basic SpeechToTextButton events, refer to the [demo on using the events of the SpeechToTextButton](https://demos.telerik.com/{{ site.platform }}/speechtotextbutton/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
@(Html.Kendo().SpeechToTextButton()
    .Name("speechButton")
    .Events(ev => ev.Result("onResult"))
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-speechtotextbutton name="speechButton" on-result="onResult"
</kendo-speechtotextbutton>
```
{% endif %}
```JS Scripts
<script>
    function onResult(e){
        // Handle the SpeechToTextButton "Result" event that triggers when the speech recognition service returns a result (a word or phrase has been positively recognized).
    }
</script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
@(Html.Kendo().SpeechToTextButton()
    .Name("speechButton")
    .Events(e => e.Result(@<text>
        function() {
            // Handle the SpeechToTextButton "Result" event inline.
        }
        </text>)
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-speechtotextbutton name="speechButton" on-result="function() {
        // Handle the SpeechToTextButton "Result" event inline.
    }">
</kendo-speechtotextbutton>
```
{% endif %}

## Next Steps

* [Using the SpeechToTextButton Events (Demo)](https://demos.telerik.com/{{ site.platform }}/speechtotextbutton/events)

## See Also

* [Using the API of the SpeechToTextButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/speechtotextbutton/api)
* [Client-Side API of the SpeechToTextButton](https://docs.telerik.com/kendo-ui/api/javascript/ui/speechtotextbutton)
* [Server-Side API of the SpeechToTextButton](/api/speechtotextbutton)
{% if site.core %}
* [Server-Side API of the SpeechToTextButton TagHelper](/api/taghelpers/speechtotextbutton)
{% endif %}
