---
title: Overview
page_title: Overview | Sortable JSP Tag
description: "Get started with the Sortable JSP tag in Kendo UI."
slug: overview_sortable_uiforjsp
position: 1
---

# Sortable JSP Tag Overview

The Sortable JSP tag is a server-side wrapper for the [Kendo UI Sortable](/api/javascript/ui/sortable) widget.

## Getting Started

### The Basics

Unlike most of the server-side wrappers, the Kendo UI Sortable does not render HTML markup. The Sortable should be initialized for already existing DOM element.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Sortable.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {
            return "web/sortable/index";
        }

**Step 3** Add kendo taglib mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a sortable tag (use the element with `sortable-basic` id and initialize Sortable instance for it).

###### Example

    <kendo:sortable name="#sortable-basic" hint="hint" placeholder="placeholder">
    </kendo:sortable>

**Step 5** Add the HTML markup from which the widget will be initialized and define the hint/placeholder functions.

###### Example

    <ul id="sortable-basic">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

    <script>
        function hint(element) {
            return element.clone().addClass("hint");
        }

        function placeholder(element) {
            return element.clone().addClass("placeholder").text("drop here");
        }
    </script>

### Hint Disabling

The Kendo UI Sortable widget can operate without a hint. To disable the hint, set it to an empty function via [`jQuery.noop`](http://api.jquery.com/jQuery.noop/).

###### Example

    <kendo:sortable name="#sortable-basic" hint="noHint">
    </kendo:sortable>

    <script>
        var noHint = $.noop;
    </script>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Sortable](/api/javascript/ui/sortable#events) by the handler name.

###### Example

    <kendo:sortable name="#sortable-basic" start="onStart" change="onChange">
    </kendo:sortable>

    <ul id="sortable-basic">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

    <script>
        function onStart(e) {
            //handle event
        }

        function onChange(e) {
            //handle event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing Sortable instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Sortable API](/api/javascript/ui/sortable#methods) to control its behavior.

###### Example

    // Put this after your Kendo Sortable tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the sortable is used to get its client-side instance
        var sortable = $("#sortable-basic").data("kendoSortable");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the Sortable:

* [Overview of the Kendo UI Sortable Widget]({% slug overview_kendoui_sortable_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
