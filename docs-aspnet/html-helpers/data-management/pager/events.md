---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Pager component for {{ site.framework }}."
slug: pager_events
position: 6
---

# Events

You can subscribe to [the Pager's Change event](/api/kendo.mvc.ui.fluent/pagereventbuilder) and then use it to further customize the behavior of the Pager.

The example below demonstrates how to use the [`Change` event](/api/kendo.mvc.ui.fluent/pagereventbuilder#changesystemstring) that the Pager fire when the user interacts with it.

```HtmlHelper
	@(Html.Kendo().Pager()
		.Name("pager")
		.DataSource("dataSource1")
		.HtmlAttributes(new { style="width:850px"})
		.Events(e=>e.Change("onPagerChange"))
	)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-pager name="pager1" refresh="true" responsive="false" datasource-id="dataSource1" 
    width="850px"
    on-change="onPagerChange">
</kendo-pager>
```
{% endif %}
```JavaScript
	function onPagerChange(e){
        console.log("Pager is navigated to page "+e.sender.page());
    }
```

## Next Steps

* [API for Configuring the Pager Events](/api/kendo.mvc.ui.fluent/pagereventbuilder)

## See Also

* [Pager for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pager)

