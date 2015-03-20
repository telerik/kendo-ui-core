---
title: Overview
page_title: How to use the Sortable PHP class, server-side wrapper for Kendo UI Sortable widget
description: Learn how to create Kendo UI Sortable for PHP, handle Kendo UI Sortable Events, access an existing sortable.
---

# Sortable

The Kendo Sortable for PHP is a server-side wrapper for the [Kendo UI Sortable](/api/web/sortable) widget.

## Getting Started

Unlike most of the server side wrapper the Sortable one does not render HTML mark-up. **The Sortable should be initialized for already existing DOM element.**

Here is how to configure a simple Kendo Sortable:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create a [sortable](/api/wrappers/php/Kendo/UI/Sortable), set its container and customize the hint and placeholder of the widget

        <?php
        $sortable = new \Kendo\UI\Sortable('#sortable-basic'); // select the container for the Sortable
        $sortable->hint(new \Kendo\JavaScriptFunction('hint'))
                 ->placeholder(new \Kendo\JavaScriptFunction('placeholder'));
        ?>
3. Output the sortable by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $sortable->render();
        ?>
4. Define the HTML mark-up and hint/placeholder JavaScript functions

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

## Getting Client-side Reference

You can reference the client-side Kendo Sortable instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/sortable#methods) to control its behavior.

### Example

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

## Handling Events

You can subscribe to all sortable [events](/api/web/sortable#events).

### Example - subscribing by specifying JavaScript function name

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

### Example - providing inline JavaScript code

    <?php
    $sortable = new \Kendo\UI\Sortable('#sortable');

    // Provide inline JavaScript code that will handle the 'change' event of the sortable
    $sortable->change('function(e) { /* Handle the change event */ }');

    echo $sortable->render();
    ?>

## Disabling the hint

The Sortable widget can operate without hint. To disable the hint you should set it to an empty function ([jQuery.noop](http://api.jquery.com/jQuery.noop/)).

    <?php
        $sortable = new \Kendo\UI\Sortable('#sortable-basic'); // select the container for the Sortable
        $sortable->hint(new \Kendo\JavaScriptFunction('noHint'));
    ?>
    
    <script>
        var noHint = $.noop;
    </script>

