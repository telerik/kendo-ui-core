---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ImageEditor component for {{ site.framework }}."
slug: events_imageeditor_aspnetcore
position: 3
---

# Events

You can subscribe to [all ImageEditor events](/api/kendo.mvc.ui.fluent/imageeditoreventbuilder) and then use them to further customize the behavior of the component.

The example below demonstrates how to use the [`Execute` event](api/kendo.mvc.ui.fluent/imageeditoreventbuilder#executesystemstring) that the ImageEditor generates when the user executes a command.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().ImageEditor()
	.Name("imageEditor")
	.Height(700)
	.SaveAs(s => s.FileName("image_edited.png"))
	.ImageUrl(@Url.Content("~/shared/images/photos/sample.jpg"))
	.Events(ev => {
		ev.Execute("onExecute");
	})
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

    <h4>ImageEditor</h4>
    <kendo-imageeditor name="imageEditor" height="700" image-url="@Url.Content("~/shared/images/photos/sample.jpg")"
		on-execute="onExecute">
        <save-as file-name="image_edited.png" />
    </kendo-imageeditor>
```
{% endif %}
```JS script
	<script>	
	function onExecute(e) {
		console.log(e.command);
	}
</script>
```

## Next Steps

* [Using the ImageEditor Events (Demo)](https://demos.telerik.com/aspnet-core/imageeditor/events)

## See Also

* [Using the API of the ImageEditor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/imageeditor/api)
* [ImageEditor Server-Side API](/api/imageeditor)
* [ImageEditor Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/imageeditor)
