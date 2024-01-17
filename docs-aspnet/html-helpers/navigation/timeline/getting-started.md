---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} Timeline component by following a complete step-by-step tutorial."
slug: aspnetcore_timeline_getting_started
position: 1
---

# Getting Started with the Timeline

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} Timeline and highlights the major steps in the configuration of the component.

You will initialize a Timeline and learn how to set its orientation. Then, you will see how to attach an event handler to the component. 
{% if site.core %}
Finally, you can run the sample code in [Telerik REPL](https://netcorerepl.telerik.com/) and continue exploring the component.{% endif %}

 ![Sample Telerik UI for {{ site.framework }} Timeline](./images/timeline-overview.png)

@[template](/_contentTemplates/core/getting-started-prerequisites.md#repl-component-gs-prerequisites)

## 1. Prepare the CSHTML File

@[template](/_contentTemplates/core/getting-started-directives.md#gs-adding-directives)

Optionally, you can structure the document by adding the desired HTML elements like headings, divs, paragraphs, and others.

```HtmlHelper
@using Kendo.Mvc.UI
<h4>Timeline with event handler</h4>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
<h4>Timeline with event handler</h4>
``` 
{% endif %}

## 2. Initialize the Timeline

Use the Timeline HtmlHelper {% if site.core %}or TagHelper{% endif %} to add the component to a page:

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the Timeline element.
* The `DataDateField()` configuration method sets the field of the data item that provides information when the given event happened in time. 
* The `DataDescriptionField()` configuration method sets the field of the data item that provides the description information for the event.
* The `DataSubtitleField()` configuration method sets the field of the data item that provides the subtitle information for the event.
* The `DataTitleField()` configuration method sets the field of the data item that provides the title information for the event.
* The `DataImagesAltField()` configuration method sets the field of the data item that provides the value for the alt attribute of the images.
* The `DataImagesField()` configuration method sets the field of the data item that provides the images information for the event.
* The `DataActionsField()` configuration method sets the field of the data item that provides the actions information for the event.
* The `Orientation()` configuration method sets the orientation of the timeline axis. The widget expects "Horizontal" or "Vertical".
* The `AlternatingMode()` configuration method indicates whether events are positioned on both sides of the timeline axis.
* The `CollapsibleEvents()` configuration method enables the events in the Kendo UI Timeline to be expandable or collapsible.

```HtmlHelper
@using Kendo.Mvc.UI
<h4>Timeline with event handler</h4>

<div id="example">
    <div class="demo-section wide">
    @(Html.Kendo().Timeline<Kendo.Mvc.Examples.Models.TimelineEventModel>()
               .Name("Timeline")
               .DataDateField("EventDate")
               .DataDescriptionField("Description")
               .DataSubtitleField("Subtitle")
               .DataTitleField("Title")
               .DataImagesAltField("AltField")
               .DataImagesField("Images")
               .DataActionsField("Actions")
               .Orientation(TimelineOrientation.Horizontal)
               .AlternatingMode()
               .CollapsibleEvents()
               .DataSource(dt => dt.Read("GetEvents", "Timeline"))
    )
    </div>
</div>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
<h4>Timeline with event handler</h4>

<div id="example">
    <div class="demo-section wide">
        <kendo-timeline name="Timeline" 
                        orientation="TimelineOrientation.Horizontal" 
                        datadatefield="EventDate" 
                        datatitlefield="Title" 
                        datasubtitlefield="Subtitle" 
                        datadescriptionfield="Description" 
                        dataactionsfield="Actions"
                        dataimagesfield="Images"
                        alternating-mode="true"
                        collapsible-events="true">
            <datasource>
                <transport>
                    <read url="@Url.Action("GetEvents", "Timeline")" />
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
    </div>
</div>
```
{% endif %}

## 3. Set the orientation of the Timeline to Vertical

The next step is to change the Orientation configuration of the Timeline to Vertical. You can do that by using the `Orientation()` configuration.

```HtmlHelper
@using Kendo.Mvc.UI
<h4>Timeline with event handler</h4>

<div id="example">
    <div class="demo-section wide">
    @(Html.Kendo().Timeline<Kendo.Mvc.Examples.Models.TimelineEventModel>()
               .Name("Timeline")
               .DataDateField("EventDate")
               .DataDescriptionField("Description")
               .DataSubtitleField("Subtitle")
               .DataTitleField("Title")
               .DataImagesAltField("AltField")
               .DataImagesField("Images")
               .DataActionsField("Actions")
               .Orientation(TimelineOrientation.Vertical)
               .AlternatingMode()
               .CollapsibleEvents()
               .DataSource(dt => dt.Read("GetEvents", "Timeline"))
    )
    </div>
</div>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
<h4>Timeline with event handler</h4>

<div id="example">
    <div class="demo-section wide">
        <kendo-timeline name="Timeline" 
                        orientation="TimelineOrientation.Vertical" 
                        datadatefield="EventDate" 
                        datatitlefield="Title" 
                        datasubtitlefield="Subtitle" 
                        datadescriptionfield="Description" 
                        dataactionsfield="Actions"
                        dataimagesfield="Images"
                        alternating-mode="true"
                        collapsible-events="true">
            <datasource>
                <transport>
                    <read url="@Url.Action("GetEvents", "Timeline")" />
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
    </div>
</div>

```
{% endif %}

## 4. Handle a Timeline Event

The Timeline exposes a `Expand()` event that you can handle and assign specific functions to the component. In this tutorial, you will use the `Expand()` event to display a message when the user expands an event of in the Timeline.

```HtmlHelper
@using Kendo.Mvc.UI
<h4>Timeline with event handler</h4>

<div id="example">
    <div class="demo-section wide">
    @(Html.Kendo().Timeline<Kendo.Mvc.Examples.Models.TimelineEventModel>()
               .Name("Timeline")
               .DataDateField("EventDate")
               .DataDescriptionField("Description")
               .DataSubtitleField("Subtitle")
               .DataTitleField("Title")
               .DataImagesAltField("AltField")
               .DataImagesField("Images")
               .DataActionsField("Actions")
               .Orientation(TimelineOrientation.Vertical)
               .AlternatingMode()
               .CollapsibleEvents()
               .DataSource(dt => dt.Read("GetEvents", "Timeline"))
               .Events(e => e.Expand("onExpand"))
    )
    </div>
</div>

<script>
    function onExpand(e){
        console.log(e.dataItem);
    }
</script>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
<h4>Timeline with event handler</h4>

<div id="example">
    <div class="demo-section wide">
        <kendo-timeline name="Timeline" 
                        orientation="TimelineOrientation.Vertical" 
                        datadatefield="EventDate" 
                        datatitlefield="Title" 
                        datasubtitlefield="Subtitle" 
                        datadescriptionfield="Description" 
                        dataactionsfield="Actions"
                        dataimagesfield="Images"
                        alternating-mode="true"
                        collapsible-events="true"
                        on-expand="onExpand">
            <datasource>
                <transport>
                    <read url="@Url.Action("GetEvents", "Timeline")" />
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
    </div>
</div>

<script>
    function onExpand(e){
        console.log(e.dataItem);
    }
</script>
```
{% endif %}

For more examples, refer to the [demo on using the events of the Timeline](https://demos.telerik.com/{{ site.platform }}/timeline/events).

## 5. (Optional) Reference Existing Timeline Instances

You can reference the Timeline instances that you have created and build on top of their existing configuration:

1. Use the `id` attribute of the component instance to establish a reference.

    ```script
    <script>
        var timeline = $("#timeline").data().kendoTimeline; // timeline is a reference to the existing timeline instance of the helper.
    </script>
    ```
1. Use the [Timeline client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/timeline#methods) to control the behavior of the widget. In this example, you will use the `open` method to open an event details of the Timeline.
    ```script
    <script>
        var timeline = $("#timeline").data().kendoTimeline; // timeline is a reference to the existing timeline instance of the helper.
        var firstEvent = timeline.element.find(".k-timeline-track-item:eq(3)");
        timeline.open(firstEvent);
    </script>
    ```
For more information on referencing specific helper instances, see the [Methods and Events]({% slug methodevents_core %}) article.

## Explore this Tutorial in REPL
You can continue experimenting with the code sample above by running it in the Telerik REPL server playground:
* [Sample code with the Timeline HtmlHelper](https://netcorerepl.telerik.com/QyuvYGlw33Kqxu7n28)
{% if site.core %}
* [Sample code with the Timeline TagHelper](https://netcorerepl.telerik.com/cyaPaGvG33ebDIUw47)
{% endif %}
## Next Steps
* [Use Templates in the Timeline]({% slug templates_htmlhelpers_timeline_aspnetcore %})
* [Use Shared DataSource for the Timeline]({% slug shared_datasource_timeline_aspnetcore %})
## See Also
* [Using the API of the Timeline for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timeline/api)
* [Client-Side API of the Timeline](https://docs.telerik.com/kendo-ui/api/javascript/ui/timeline)
* [Server-Side API of the Timeline](/api/timeline)
* [Knowledge Base Section](/knowledge-base)