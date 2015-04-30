---
title: Overview
---

# Splitter

The Splitter JSP tag is a server-side wrapper for the [Kendo UI Splitter](/api/web/splitter) widget.

## Getting Started

Here is how to configure a simple Kendo Splitter:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/splitter/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a splitter tag:

    <c:url value="/web/splitter/content/1" var="ajaxContent1" />

    <kendo:splitter name="splitter" orientation="horizontal">
        <kendo:splitter-panes>
            <kendo:splitter-pane id="left_pane" size="100px" collapsible="true">
                <p>
                    Left pane
                </p>
            </kendo:splitter-pane>
            <kendo:splitter-pane id="ajax_pane" collapsible="false" contentUrl="${ajaxContent1}"></kendo:splitter-pane>
            <kendo:splitter-pane id="right_pane" size="20%" collapsible="true">
                <p>
                    Right pane
                </p>
            </kendo:splitter-pane>
        </kendo:splitter-panes>
    </kendo:splitter>

## Accessing an Existing Splitter

You can reference an existing Splitter instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/splitter#methods) to control its behavior.

### Accessing an existing Splitter instance

    //Put this after your Kendo Splitter tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the splitter is used to get its client-side instance
        var splitter = $("#splitter").data("kendoSplitter");
    });
    </script>

## Handling Kendo UI Splitter events

You can subscribe to all [events](/api/web/splitter#events) exposed by Kendo UI Splitter:

### Subscribe by handler name

    <kendo:splitter name="splitter" orientation="horizontal" expand="splitter_expand" collapse="splitter_collapse">
        <kendo:splitter-panes>
            <kendo:splitter-pane id="left_pane" size="100px" collapsible="true">
                <p>
                    Left pane
                </p>
            </kendo:splitter-pane>
            <kendo:splitter-pane id="right_pane" size="20%" collapsible="true">
                <p>
                    Right pane
                </p>
            </kendo:splitter-pane>
        </kendo:splitter-panes>
    </kendo:splitter>

    <script>
        function splitter_expand() {
            //Handle the expand event
        }

        function splitter_collapse() {
            //Handle the collapse event
        }
    </script>
