---
title: Overview
page_title: Overview | Sortable PHP Class
description: "Get started with the Sortable PHP class in Kendo UI."
slug: overview_sortable_uiforphp
position: 1
---

# Sortable PHP Class Overview

The Kendo UI Sortable for PHP is a server-side wrapper for the [Kendo UI Sortable](/api/javascript/ui/sortable) widget.

## Getting Started

Unlike most of the server-side wrappers, the Kendo UI Sortable one does not render HTML markup. Therefore, the Sortable should be initialized for a DOM element that already exists.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Sortable for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Sortable](/api/php/Kendo/UI/Sortable), set its container, and customize the hint and placeholder of the widget.

###### Example

        <?php
        $sortable = new \Kendo\UI\Sortable('#sortable-basic'); // select the container for the Sortable
        $sortable->hint(new \Kendo\JavaScriptFunction('hint'))
                 ->placeholder(new \Kendo\JavaScriptFunction('placeholder'));
        ?>

**Step 3** Output the Sortable by echoing the result of the `render` method.

###### Example

        <?php
        echo $sortable->render();
        ?>

**Step 4** Define the HTML markup and the hint/placeholder JavaScript functions.

###### Example

        <ul id="sortable-basic">
            <li class="sortable">Papercut <span>3:04</span></li>
            <li class="sortable">One Step Closer <span>2:35</span></li>
            <li class="sortable">With You <span>3:23</span></li>
        </ul>
        <script>
            function hint(element) {
                return element.clone().addClass("hint");
            }

            function placeholder(element) {
                return element.clone().addClass("placeholder").text("drop here");
            }
        </script>

## Event Handling

You can subscribe to all Sortable [events](/api/javascript/ui/sortable#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $sortable = new \Kendo\UI\Sortable('#sortable');

        // The 'onChange' JavaScript function will handle the 'change' event of the sortable
        $sortable->change('onChange');

        echo $sortable->render();
        ?>
        <script>
        function onChange(e) {
            // Handle the show event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $sortable = new \Kendo\UI\Sortable('#sortable');

        // Provide inline JavaScript code that will handle the 'change' event of the sortable
        $sortable->change('function(e) { /* Handle the change event */ }');

        echo $sortable->render();
        ?>

<!--*-->
## Disable Hints

The Sortable widget can operate without a hint. To disable the hint, set it to an empty function ([jQuery.noop](http://api.jquery.com/jQuery.noop/)).

###### Example

        <?php
            $sortable = new \Kendo\UI\Sortable('#sortable-basic'); // select the container for the Sortable
            $sortable->hint(new \Kendo\JavaScriptFunction('noHint'));
        ?>

        <script>
            var noHint = $.noop;
        </script>

## Reference

### Client-Side Instances

You are able to reference an existing Sortable instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Sortable API](/api/javascript/ui/sortable#methods) to control its behavior.

###### Example

        <?php
        $sortable = new \Kendo\UI\Sortable('#sortable');
        echo $sortable->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as a selector for getting sortable's element
            var sortable = $("#sortable").data("kendoSortable");
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the Sortable:

* [Overview of the Kendo UI Sortable Widget]({% slug overview_kendoui_sortable_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
