---
title: Overview
---

# PanelBar

The PanelBar JSP tag is a server-side wrapper for the [Kendo UI PanelBar](/api/web/panelbar) widget.

## Getting Started

Here is how to configure a simple Kendo PanelBar:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = "index", method = RequestMethod.GET)
        public String index() {

            return "web/panelbar/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a panelbar tag:

    <kendo:panelBar name="panelBar" expandMode="single">
        <kendo:panelBar-items>
            <kendo:panelBar-item  text="My Teammates" expanded="true">
                <kendo:panelBar-item-content>
                    <img src="/image_url" alt="Andrew Fuller" />
                </kendo:panelBar-item-content>
            </kendo:panelBar-item>
            <kendo:panelBar-item  text="Projects">
                <kendo:panelBar-items>
                    <kendo:panelBar-item text="New Business Plan"/>
                    <kendo:panelBar-item text="Sales Forecasts">
                </kendo:panelBar-items>
            </kendo:panelBar-item>
            <kendo:panelBar-item text="Communication" enabled="false"/>
        </kendo:panelBar-items>
    </kendo:panelBar>

## Accessing an Existing PanelBar

You can reference an existing PanelBar instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/panelbar#methods) to control its behavior.

### Accessing an existing PanelBar instance

    //Put this after your Kendo PanelBar tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the panelbar is used to get its client-side instance
        var panelbar = $("#panelbar").data("kendoPanelBar");
    });
    </script>

## Handling Kendo UI PanelBar events

You can subscribe to all [events](/api/web/panelbar#events) exposed by Kendo UI PanelBar:

### Subscribe by handler name

    <kendo:panelBar name="panelbar" expand="panelbar_expand" collapse="panelbar_collapse">
        <kendo:panelBar-items>
            <kendo:panelBar-item text="Blog"></kendo:panelBar-item>
            <kendo:panelBar-item text="News" enabled="false"></kendo:panelBar-item>
        </kendo:panelBar-items>
    </kendo:panelBar>

    <script>
        function panelbar_expand() {
            //Handle the expand event
        }

        function panelbar_collapse() {
            //Handle the collapse event
        }
    </script>
