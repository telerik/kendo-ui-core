---
title: Overview
page_title: Overview | Editor PHP Class
description: "Get started with the Editor PHP class in Kendo UI."
slug: overview_editor_uiforphp
position: 1
---

# Editor PHP Class Overview

The Kendo UI Editor for PHP is a server-side wrapper for the [Kendo UI Editor](/api/javascript/ui/editor) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Editor for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an [Editor](/api/javascript/ui/editor).

###### Example

        <?php
        $editor = new \Kendo\UI\Editor('editor');
        $editor->value('#ff0000');
        ?>

**Step 3** Output the Editor by echoing the result of the `render` method.

###### Example

        <?php
        echo $editor->render();
        ?>

## Event Handling

You can subscribe to all Editor [events](/api/javascript/ui/editor#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

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

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $editor = new \Kendo\UI\Editor('editor');

        // Provide inline JavaScript code that will handle the 'change' event of the editor
        $editor->change('function() { /* Handle the change event */ }');

        echo $editor->render();
        ?>

<!--*-->
## Reference

### Server-Side Value

The Editor posts its value HTML-encoded by default. You can either disable this functionality through the [`encoded`](/api/javascript/ui/editor#encoded-boolean-default) configuration option, or use [`html_entity_decode`](http://php.net/manual/en/function.html-entity-decode.php).

### Client-Side Instances

You are able to reference an existing Editor instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Editor API](/api/javascript/ui/editor#methods) to control its behavior.

###### Example

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

## See Also

Other articles on Telerik UI for PHP and on the Editor:

* [Overview of the Kendo UI Editor Widget]({% slug overview_kendoui_editor_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
