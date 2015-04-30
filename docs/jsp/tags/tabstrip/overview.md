---
title: Overview
---

# TabStrip

The TabStrip JSP tag is a server-side wrapper for the [Kendo UI TabStrip](/api/web/tabstrip) widget.

## Getting Started

Here is how to configure a simple Kendo TabStrip:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = "index", method = RequestMethod.GET)
        public String index() {

            return "web/tabstrip/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a tabstrip tag:

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

## Accessing an Existing TabStrip

You can reference an existing TabStrip instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/tabstrip#methods) to control its behavior.

### Accessing an existing TabStrip instance

    //Put this after your Kendo TabStrip tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the tabstrip is used to get its client-side instance
        var tabstrip = $("#tabstrip").data("kendoTabStrip");
    });
    </script>

## Handling Kendo UI TabStrip events

You can subscribe to all [events](/api/web/tabstrip#events) exposed by Kendo UI TabStrip:

### Subscribe by handler name

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
