---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Breadcrumb component for {{ site.framework }}."
slug: events_breadcrumb
position: 7
---

# Events

The Breadcrumb [exposes `Click()` and `Change()` events](/api/Kendo.Mvc.UI.Fluent/BreadcrumbEventBuilder) that you can handle to customize the functions of the component.

For a complete example on basic Breadcrumb events, refer to the [demo on using the events of the Breadcrumb](https://demos.telerik.com/{{ site.platform }}/breadcrumb/events).

```HtmlHelper
@(Html.Kendo().Breadcrumb()
        .Name("breadcrumb")
        .Events(e => 
                e.Click("onClick")
                .Change("onChange"))
        .Items(items =>
        {
            items.Add()
                    .Type(BreadcrumbItemType.RootItem)
                    .Href("https://demos.telerik.com/aspnet-core/")
                    .Text("All Components")
                    .ShowText(true)
                    .Icon("home")
                    .ShowIcon(true);
            items.Add()
                    .Type(BreadcrumbItemType.Item)
                    .Href("/breadcrumb")
                    .Text("Breadcrumb")
                    .ShowText(true);
            items.Add()
                    .Type(BreadcrumbItemType.Item)
                    .Href("/events")
                    .Text("Events")
                    .ShowText(true);
        })
)

<script>
    function onClick(e) {
        console.log("Clicked. :: target: " + e.item.text + ". Type :: " + e.item.type);
    }

    function onChange(e) {
        console.log("Changed. New Value :: " + e.value);
    }

</script>
```
{% if site.core %}
```tagHelpers
<kendo-breadcrumb name="breadcrumb"
                on-change="onChange"
                on-click="onClick">
    <kendo-breadcrumb-items>
        <kendo-breadcrumb-item type="BreadcrumbItemType.RootItem" text="All Components" href="https://demos.telerik.com/kendo-ui/" show-text="true" icon="home" show-icon="true"></kendo-breadcrumb-item>
        <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Breadcrumb" href="/breadcrumb"></kendo-breadcrumb-item>
        <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Tag Helper" href="/tag-helper"></kendo-breadcrumb-item>
    </kendo-breadcrumb-items>
</kendo-breadcrumb>

<script>
    function onClick(e) {
        kendoConsole.log("Clicked. :: target: " + e.item.text + ". Type :: " + e.item.type);
    }

    function onChange(e) {
        kendoConsole.log("Changed. New Value :: " + e.value);
    }

</script>
```
{% endif %}

## Next Steps

* [Using the Breadcrumb Events (Demo)](https://demos.telerik.com/aspnet-core/breadcrumb/events)
* [API for Configuring Breadcrumb events](/api/Kendo.Mvc.UI.Fluent/BreadcrumbEventBuilder)

## See Also

* [Using the API of the Breadcrumb HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/breadcrumb/api)
* [Breadcrumb Server-Side API](/api/breadcrumb)
* [Breadcrumb Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/breadcrumb)
