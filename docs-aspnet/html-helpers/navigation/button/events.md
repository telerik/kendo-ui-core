---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Button component for {{ site.framework }}."
slug: events_button_aspnetcore
position: 7
---

# Events

The Button exposes a [`Click()` event](/api/Kendo.Mvc.UI.Fluent/ButtonEventBuilder) that you can handle. 

For a complete example on basic Button events, refer to the [demo on using the events of the Button](https://demos.telerik.com/{{ site.platform }}/button/events).

```HtmlHelper
	@(Html.Kendo().Button()
		.Name("button")
		.Content("Sample Button")
		.Events(e => e.Click("onClick"))
	)
```
{% if site.core %}
```TagHelper
<kendo-button name="textButton"
              on-click="onClick">
    Sample Button
</kendo-button>
```
{% endif %}
```script
	<script>
		function onClick() {
			alert('Button clicked!')
			window.location.href = 'https://en.wikipedia.org/';
		}
	</script>
```

## Next Steps

* [Using the Button Events (Demo)](https://demos.telerik.com/aspnet-core/button/events)

## See Also

* [Using the API of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/api)
* [Button Server-Side API](/api/button)
* [Button Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/button)
