---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Timeline component for {{ site.framework }}."
slug: events_timeline_aspnetcore
position: 8
---

# Events

For a complete example on the Timeline events, refer to the [demo on using the events of the Timeline in {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/timeline/events).

You can provide an event handler through its [JavaScript function name](#handling-events-by-handler-name), or by [specifying an inline function in a template](#handling-events-by-template-delegate).

## Handling Events by Handler Name

The following example demonstrates how to subscribe to events by using a handler name.

```HtmlHelper
    @(Html.Kendo().Timeline<MyApp.Models.TimelineEventModel>()
        .Name("Timeline")
        .Events(ev =>
         {
            ev.Change("onChange");
            ev.Navigate("onNavigate");
            ev.DataBound("onDataBound");
            ev.ActionClick("onActionClick");
         })
        .DataDateField("EventDate")
        .DataDescriptionField("Description")
        .DataSubTitleField("Subtitle")
        .DataTitleField("Title")
        .DataImagesField("Images")
        .DataActionsField("Actions")
        .DataSource(dt => dt.Read("GetTimelineData", "Timeline")) // see the first example in this article for a sample data source
    )

    <script>
        function onChange(e) {
                    console.log("OnChange: " + e.dataItem.Title);
                }

                function onNavigate(e) {
                    console.log("OnNavigate: " + e.action);
                }

                function onActionClick(e) {
                    console.log("OnActionClick: " + e.element.text());
                }

                function onDataBound(e) {
                    console.log("OnDataBound: " + e.sender.dataSource.view().length);
                }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-timeline name="Timeline"
                    datadatefield="EventDate"
                    datatitlefield="Title"
                    datasubtitlefield="Subtitle"
                    datadescriptionfield="Description"
                    dataactionsfield="Actions"
                    dataimagesfield="Images"
                    on-change="onChange"
                    on-navigate="onNavigate"
                    on-data-bound="onDataBound"
                    on-action-click="onActionClick">
        <datasource>
            <transport>
                <read url="@Url.Action("GetTimelineData", "Timeline")" />
            </transport>
            <schema>
                <model>
                    <fields>
                        <field name="EventDate" type="date"></field>
                        <field name="Title" type="string"></field>
                        <field name="Subtitle" type="string"></field>
                        <field name="Description" type="string"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
    </kendo-timeline>

    <script>
        function onChange(e) {
                    console.log("OnChange: " + e.dataItem.Title);
                }

                function onNavigate(e) {
                    console.log("OnNavigate: " + e.action);
                }

                function onActionClick(e) {
                    console.log("OnActionClick: " + e.element.text());
                }

                function onDataBound(e) {
                    console.log("OnDataBound: " + e.sender.dataSource.view().length);
                }
    </script>
```
{% endif %}

## Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.

```HtmlHelper
@(Html.Kendo().Timeline<MyApp.Models.TimelineEventModel>()
    .Name("Timeline")
    .Events(e =>
        e.Change(@<text>
            function(e) {
                // Handle the Change event inline.
            }
        </text>)
       .Navigate(@<text>
            function(e) {
                // Handle the Navigate event inline.
            }
        </text>)
     )
    .DataDateField("EventDate")
    .DataDescriptionField("Description")
    .DataSubTitleField("Subtitle")
    .DataTitleField("Title")
    .DataImagesField("Images")
    .DataActionsField("Actions")
    .DataSource(dt => dt.Read("GetTimelineData", "Timeline")) // see the first example in this article for a sample data source
)
```
{% if site.core %}
```TagHelper
    <kendo-timeline name="Timeline"
                    datadatefield="EventDate"
                    datatitlefield="Title"
                    datasubtitlefield="Subtitle"
                    datadescriptionfield="Description"
                    dataactionsfield="Actions"
                    dataimagesfield="Images"
                    on-change="function(e){
                        // Handle the Change event inline.
                    }"
                    on-navigate="function(e) {
                        // Handle the Navigate event inline.
                    }">
        <datasource>
            <transport>
                <read url="@Url.Action("GetTimelineData", "Timeline")" />
            </transport>
            <schema>
                <model>
                    <fields>
                        <field name="EventDate" type="date"></field>
                        <field name="Title" type="string"></field>
                        <field name="Subtitle" type="string"></field>
                        <field name="Description" type="string"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
    </kendo-timeline>
```
{% endif %}


## See Also

* [Using the API of the Timeline for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timeline/api)
* [Timeline Server-Side API](/api/timeline)
* [Timeline Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/timeline)