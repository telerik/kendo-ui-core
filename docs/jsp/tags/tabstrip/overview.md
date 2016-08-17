---
title: Overview
page_title: Overview | TabStrip JSP Tag
description: "Get started with the TabStrip JSP tag in Kendo UI."
slug: overview_tabstrip_uiforjsp
position: 1
---

# TabStrip JSP Tag Overview

The TabStrip JSP tag is a server-side wrapper for the [Kendo UI TabStrip](/api/javascript/ui/tabstrip) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TabStrip.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.

###### Example

        @RequestMapping(value = "index", method = RequestMethod.GET)
        public String index() {

            return "web/tabstrip/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `tabstrip` tag.

###### Example

        <kendo:tabStrip name="tabstrip">
            <kendo:tabStrip-items>
                <kendo:tabStrip-item text="Paris" selected="true">
                    <kendo:tabStrip-item-content>
                        <div class="weather">
                            <h2>17<span>&ordm;C</span></h2>
                            <p>Rainy weather in Paris.</p>
                        </div>
                        <span class="rainy">&nbsp;</span>
                    </kendo:tabStrip-item-content>
                </kendo:tabStrip-item>
                <kendo:tabStrip-item text="New York">
                    <kendo:tabStrip-item-content>
                        <div class="weather">
                            <h2>29<span>&ordm;C</span></h2>
                            <p>Sunny weather in New York.</p>
                        </div>
                        <span class="sunny">&nbsp;</span>
                    </kendo:tabStrip-item-content>
                </kendo:tabStrip-item>
            </kendo:tabStrip-items>
        </kendo:tabStrip>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI TabStrip](/api/javascript/ui/tabstrip#events) by the handler name.

###### Example

    <kendo:tabStrip name="tabstrip" select="tabstrip_select">
        <kendo:tabStrip-items>
            <kendo:tabStrip-item text="Paris" selected="true"></kendo:tabStrip-item>
            <kendo:tabStrip-item text="New York"></kendo:tabStrip-item>
        </kendo:tabStrip-items>
    </kendo:tabStrip>

    <script>
        function tabstrip_select() {
            //Handle the select event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing TabStrip instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [TabStrip API](/api/javascript/ui/tabstrip#methods) to control its behavior.

###### Example

    //Put this after your Kendo TabStrip tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the tabstrip is used to get its client-side instance
        var tabstrip = $("#tabstrip").data("kendoTabStrip");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the TabStrip:

* [Overview of the Kendo UI TabStrip Widget]({% slug overview_kendoui_tabstrip_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
