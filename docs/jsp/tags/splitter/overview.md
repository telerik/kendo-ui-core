---
title: Overview
page_title: Overview | Splitter JSP Tag
description: "Get started with the Splitter JSP tag in Kendo UI."
slug: overview_splitter_uiforjsp
position: 1
---

# Splitter JSP Tag Overview

The Splitter JSP tag is a server-side wrapper for the [Kendo UI Splitter](/api/javascript/ui/splitter) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Splitter.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/splitter/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `splitter` tag.

###### Example

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


## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Splitter](/api/javascript/ui/splitter#events) by the handler name.

###### Example

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

## Reference

### Existing Instances

You are able to reference an existing Splitter instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Splitter API](/api/javascript/ui/splitter#methods) to control its behavior.

###### Example

    //Put this after your Kendo Splitter tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the splitter is used to get its client-side instance
        var splitter = $("#splitter").data("kendoSplitter");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the Splitter:

* [Overview of the Kendo UI Splitter Widget]({% slug overview_kendoui_splitter_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
