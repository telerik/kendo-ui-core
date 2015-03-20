---
title: Overview
page_title: How to use the Editor PHP class, server-side wrapper for Kendo UI Editor widget
description: Getting started with Kendo UI Editor for PHP in quick steps - configure Kendo UI Editor widget and operate Kendo UI Editor events.
---

# Editor

The Kendo Editor for PHP is a server-side wrapper for the [Kendo UI Editor](/api/web/editor) widget.

## Getting Started

Here is how to configure a simple Kendo Editor:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.

2. Create a [editor](/api/wrappers/php/Kendo/UI/Editor).

        <?php
        $editor = new \Kendo\UI\Editor('editor');
        $editor->value('#ff0000');
        ?>

3. Output the editor by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $editor->render();
        ?>

## Getting the editor value on the server

The editor posts its value HTML-encoded by default.
You can either disable this functionality through the [encoded](/api/web/editor#encoded-boolean-default) configuration option,
or use [html_entity_decode](http://php.net/manual/en/function.html-entity-decode.php).

## Getting Client-side Reference

You can reference the client-side Kendo Editor instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/editor#methods) to control its behavior.


### Example

    <?php
    $editor = new \Kendo\UI\Editor('editor');
    echo $editor->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the editor
        var editor = $("#editor").data("kendoEditor")
    });
    </script>

## Handling Events

You can subscribe to all editor [events](/api/web/editor#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $editor = new \Kendo\UI\Editor('editor');

    // The 'editor_change' JavaScript function will handle the 'change' event of the editor
    $editor->change('editor_change');

    echo $editor->render();
    ?>
    <script>
    function editor_change() {
        // Handle the change event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $editor = new \Kendo\UI\Editor('editor');

    // Provide inline JavaScript code that will handle the 'change' event of the editor
    $editor->change('function() { /* Handle the change event */ }');

    echo $editor->render();
    ?>
