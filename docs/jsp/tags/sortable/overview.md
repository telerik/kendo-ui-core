---
title: Overview
---

# Sortable

The Sortable JSP tag is a server-side wrapper for the [Kendo UI Sortable](/api/web/sortable) widget.

## Getting Started

Unlike most of the server side wrapper the Sortable one does not render HTML mark-up. **The Sortable should be initialized for already existing DOM element.**

Here is how to configure a Kendo Sortable:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {
            return "web/sortable/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4. Add a sortable tag (use the element with `sortable-basic` id and initialize Sortable instance for it):

    <kendo:sortable name="#sortable-basic" hint="hint" placeholder="placeholder">
    </kendo:sortable>

5. Add the HTML markup from which the widget will be initialized and define the hint/placeholder functions.

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

## Accessing an Existing Sortable

You can reference an existing Sortable instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/sortable#methods) to control its behavior.

### Accessing an existing Sortable instance

    // Put this after your Kendo Sortable tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the sortable is used to get its client-side instance
        var sortable = $("#sortable-basic").data("kendoSortable");
    });
    </script>

## Handling Kendo UI Sortable events

You can subscribe to all [events](/api/web/sortable#events) exposed by Kendo UI Sortable:

### Subscribe by handler name

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

## Disabling the hint

The Sortable widget can operate without hint. To disable the hint you should set it to an empty function ([jQuery.noop](http://api.jquery.com/jQuery.noop/)).

    <kendo:sortable name="#sortable-basic" hint="noHint">
    </kendo:sortable>
    
    <script>
        var noHint = $.noop;
    </script>

