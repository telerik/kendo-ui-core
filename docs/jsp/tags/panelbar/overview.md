---
title: Overview
page_title: Overview | PanelBar JSP Tag
description: "Get started with the PanelBar JSP tag in Kendo UI."
slug: overview_panelbar_uiforjsp
position: 1
---

# PanelBar JSP Tag Overview

The PanelBar JSP tag is a server-side wrapper for the [Kendo UI PanelBar](/api/javascript/ui/panelbar) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI PanelBar.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = "index", method = RequestMethod.GET)
        public String index() {

            return "web/panelbar/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add the `panelbar` tag.

###### Example

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

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI PanelBar](/api/javascript/ui/panelbar#events) by the handler name.

###### Example

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

## Reference

### Existing Instances

You are able to reference an existing PanelBar instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [PanelBar API](/api/javascript/ui/panelbar#methods) to control its behavior.

###### Example

      //Put this after your Kendo PanelBar tag declaration
      <script>
      $(function() {
          // Notice that the Name() of the panelbar is used to get its client-side instance
          var panelbar = $("#panelbar").data("kendoPanelBar");
      });
      </script>

## See Also

Other articles on Telerik UI for JSP and on the PanelBar:

* [Overview of the Kendo UI PanelBar Widget]({% slug overview_kendoui_panelbar_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
