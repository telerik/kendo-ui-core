---
title: Overview
page_title: Overview | Dialog PHP Class
description: "Get started with the Dialog PHP class in Kendo UI."
slug: overview_dialog_uiforphp
position: 1
---

# Dialog PHP Class Overview

The Kendo UI Dialog for PHP is a server-side wrapper for the [Kendo UI Dialog](/api/javascript/ui/dialog) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Dialog for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Dialog](/api/php/Kendo/UI/Dialog).

###### Example

        <?php
        $dialog = new \Kendo\UI\Dialog('dialog');
        $dialog->title("Software Update")
            ->width(600)
            ->closable(false)
            ->modal(false);
        ?>

**Step 3** Place the content and action buttons.

###### Example

        <?php
        $dialog = new \Kendo\UI\Dialog('dialog');

        $noAction = new \Kendo\UI\DialogAction();
        $noAction->text("NO");

        $yesAction = new \Kendo\UI\DialogAction();
        $yesAction->text("YES")
                  ->primary(true);

        $dialog->title("Software Update")                 
            ->width(600)
            ->closable(false)
            ->modal(false)
            ->addAction($noAction, $yesAction)
            ->content('Do you agree terms and conditions?');
        ?>

**Step 4** Output the Dialog by echoing the result of the `render` method.

###### Example

        <?php
        echo $dialog->render();
        ?>

## Event Handling

You can subscribe to all Dialog [events](/api/javascript/ui/dialog#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $dialog = new \Kendo\UI\Dialog('dialog');

        // The 'dialog_open' JavaScript function will handle the 'open' event of the dialog
        $dialog->open('dialog_open');

        echo $dialog->render();
        ?>
        <script>
        function dialog_open() {
            // Handle the open event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $dialog = new \Kendo\UI\Dialog('dialog');

        // Provide inline JavaScript code that will handle the 'open' event of the dialog
        $dialog->open('function() { /* Handle the open event */ }');

        echo $dialog->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

To refer to an existing Dialog instance, use [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Dialog API](/api/javascript/ui/dialog#dialog) to control its behavior.

###### Example

        <?php
        $dialog = new \Kendo\UI\Dialog('dialog');
        echo $dialog->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the Dialog
            var dialog = $("#dialog").data("kendoDialog");
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the dialog:

* [Overview of the Kendo UI Dialog Widget]({% slug overview_kendoui_dialog_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
