---
title: Shared DataSource Binding
page_title: Binding to a Shared DataSource
description: "Learn how to bind the Telerik UI Timeline HtmlHelper for {{ site.framework }} widget to a shared data source."
slug: shared_datasource_timeline_aspnetcore
position: 7
---

# Binding to a Shared DataSource

The Telerik UI Timeline HtmlHelper for {{ site.framework }} widget could be bound to a shared data source. Whenever a change external to the Timeline is present, the widget's data source and UI will be automatically updated.

For a runnable example, refer to the [demo on binding to a shared data source](https://demos.telerik.com/{{ site.platform }}/timeline/shared).

The following example demonstrates how to bind two {{ site.product }} widgets to the same data source. Changes done from one of the widgets is automatically reflected in the data source and UI of the other widget.

```
    @(Html.Kendo().DataSource<Kendo.Mvc.Examples.Models.TimelineEventModel>()
        .Name("sharedDataSource")
        .Custom(dataSource => dataSource
        .Transport(tr=>tr.Read(read => read.Action("GetEvents", "TimelineEvents")))
        )
    )

    @(Html.Kendo().Timeline<Kendo.Mvc.Examples.Models.TimelineEventModel>()
        .Name("Timeline")
        .DataDateField("EventDate")
        .DataDescriptionField("Description")
        .DataSubtitleField("Subtitle")
        .DataTitleField("Title")
        .DataImagesField("Images")
        .DataActionsField("Actions")
        .Orientation(TimelineOrientation.Vertical)
        .AlternatingMode()
        .CollapsibleEvents()
        .DataSource("sharedDataSource")
    )

    @(Html.Kendo().DropDownList()
        .Name("titles")
        .DataTextField("Title")
        .DataValueField("Title")
        .DataSource("sharedDataSource")
        .OptionLabel("Select an item...")
        .Value("Barcelona & Tenerife")
    )
```

## See Also

* [Bindig to a Shared DataSource (Demo)](https://demos.telerik.com/{{ site.platform }}/timeline/shared)
* [JavaScript API Reference of the Timeline](https://docs.telerik.com/kendo-ui/api/javascript/ui/timeline)
