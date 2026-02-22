---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ScrollView component for {{ site.framework }}."
components: ["scrollview"]
slug: events_scrollview_aspnetcore
position: 5
---

# Events

You can subscribe to the following [ScrollView events](/api/kendo.mvc.ui.fluent/scrollvieweventbuilder) and further customize the functionality of the component:

* `Change`&mdash;Fires when the ScrollView page is changed.
* `Refresh`&mdash;Fires when the ScrollView refreshes.


## Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().ScrollView()
        .Name("scrollView")
        .ContentHeight("100%")
        .Items(x =>
        {
            x.Add().Content("<div class='photo photo1'></div>");
            x.Add().Content("<div class='photo photo2'></div>");
            x.Add().Content("<div class='photo photo3'></div>");
            x.Add().Content("<div class='photo photo4'></div>");
            x.Add().Content("<div class='photo photo5'></div>");
            x.Add().Content("<div class='photo photo6'></div>");
            x.Add().Content("<div class='photo photo7'></div>");
            x.Add().Content("<div class='photo photo8'></div>");
            x.Add().Content("<div class='photo photo9'></div>");
            x.Add().Content("<div class='photo photo10'></div>");
        }
        )
        .HtmlAttributes(new { style = "height:420px; width:660px; max-width: 100%; margin: auto;" })
        .Events(x=> x.Change("onChange").Refresh("onRefresh"))
    )
    
    <script>
        function onChange(e) {
            kendoConsole.log("page " + e.nextPage);
        }

        function onRefresh(e) {
            kendoConsole.log("Total: " + e.pageCount + " Current: " + e.page);
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-scrollview name="scrollView" content-height="100%"
                                        on-change="onChange" 
                                        on-refresh="onRefresh"
                                        style="height:420px; width:660px; max-width:100%; margin: auto;">
            <items>
                <scrollview-item>
                    <content>
                        <div class='photo photo1'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo2'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo3'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo4'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo5'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo6'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo7'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo8'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo9'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo10'></div>
                    </content>
                </scrollview-item>
            </items>
    </kendo-scrollview>
    <script>
        function onChange(e) {
            kendoConsole.log("page " + e.nextPage);
        }

        function onRefresh(e) {
            kendoConsole.log("Total: " + e.pageCount + " Current: " + e.page);
        }
    </script>
```
{% endif %}

## Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper

        @(Html.Kendo().ScrollView()
        .Name("scrollView")
        .ContentHeight("100%")
        .Items(x =>
        {
            x.Add().Content("<div class='photo photo1'></div>");
            x.Add().Content("<div class='photo photo2'></div>");
            x.Add().Content("<div class='photo photo3'></div>");
            x.Add().Content("<div class='photo photo4'></div>");
            x.Add().Content("<div class='photo photo5'></div>");
            x.Add().Content("<div class='photo photo6'></div>");
            x.Add().Content("<div class='photo photo7'></div>");
            x.Add().Content("<div class='photo photo8'></div>");
            x.Add().Content("<div class='photo photo9'></div>");
            x.Add().Content("<div class='photo photo10'></div>");
        }
        )
        .HtmlAttributes(new { style = "height:420px; width:660px; max-width: 100%; margin: auto;" })
        .Events(events => events
          .Change(@<text>
             function(){
                 // Handle the change event inline.
             }
            </text>)
          .Refresh(@<text>
             function(){
                 // Handle the refresh event inline.
             }
            </text>)
       )
    )
```
{% if site.core %}
```TagHelper

        <kendo-scrollview name="scrollView" content-height="100%"
                                        on-change="
                                            function(){
                                                // Handle the change event inline.
                                            }"
                                        on-refresh="
                                            function(){
                                                // Handle the refresh event inline.
                                            }"
                                        style="height:420px; width:660px; max-width:100%; margin: auto;">
            <items>
                <scrollview-item>
                    <content>
                        <div class='photo photo1'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo2'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo3'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo4'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo5'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo6'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo7'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo8'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo9'></div>
                    </content>
                </scrollview-item>
                <scrollview-item>
                    <content>
                        <div class='photo photo10'></div>
                    </content>
                </scrollview-item>
            </items>
    </kendo-scrollview>
```
{% endif %}

## See Also

* [Using the API of the ScrollView for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scrollview/api)
* [ScrollView Server-Side API](/api/scrollview)
* [ScrollView Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/scrollview)