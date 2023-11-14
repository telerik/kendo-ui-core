---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI SplitButton component for {{ site.framework }}."
slug: events_splitbutton_aspnetcore
position: 7
---

# Events

The SplitButton exposes a [`Click()` event](/api/kendo.mvc.ui.fluent/splitbuttoneventbuilder) that you can handle. 

For a complete example on basic SplitButton events, refer to the [demo on using the events of the SplitButton](https://demos.telerik.com/{{ site.platform }}/splitbutton/events).

```HtmlHelper
    @(Html.Kendo().SplitButton()
         .Name("sampleSplitButton")
         .Text("Sample Split Button")
         .Events(ev => ev.Click("onClick"))
         .Items(items =>
          {
              items.Add().Id("item1").Text("Action 1");
              items.Add().Id("item2").Text("Action 2");
          }
         )
)
```
{% if site.core %}
```TagHelper
<kendo-splitbutton name="sampleSplitButton" text="Sample Split Button" on-click="onClick">
    <splitbutton-items>
        <item id="item1" text="Action 1"></item>
        <item id="item2" text="Action 2"></item>
    </splitbutton-items>
</kendo-splitbutton>
```
{% endif %}
```script
	<script>
		function onClick() {
			alert('SplitButton clicked!')
		}
	</script>
```

## Next Steps

* [Using the SplitButton Events (Demo)](https://demos.telerik.com/aspnet-core/splitbutton/events)

## See Also

* [Using the API of the SplitButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/splitbutton/api)
* [SplitButton Server-Side API](/api/splitbutton)
* [SplitButton Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/splitbutton)
