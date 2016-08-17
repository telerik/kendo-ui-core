---
title: Overview
page_title: Overview | NumericTextBox PHP Class
description: "Get started with the NumericTextBox PHP class in Kendo UI."
slug: overview_numerictextbox_uiforphp
position: 1
---

# NumericTextBox PHP Class Overview

The Kendo UI NumericTextBox for PHP is a server-side wrapper for the [Kendo UI NumericTextBox](/api/javascript/ui/numerictextbox) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI NumericTextBox for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [NumericTextBox](/api/php/Kendo/UI/NumericTextBox).

###### Example

        <?php
        $numerictextbox = new \Kendo\UI\NumericTextBox('numerictextbox');
        $numerictextbox->min(-100)
                       ->max(100)
                       ->value(10));
        ?>

**Step 3** Output the NumericTextBox by echoing the result of the render method.

###### Example

        <?php
        echo $numerictextbox->render();
        ?>

## Event Handling

You can subscribe to all NumericTextBox [events](/api/javascript/ui/numerictextbox#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $numerictextbox = new \Kendo\UI\NumericTextBox('numerictextbox');

        // The 'numerictextbox_change' JavaScript function will handle the 'change' event of the numerictextbox
        $numerictextbox->change('numerictextbox_change');

        echo $numerictextbox->render();
        ?>
        <script>
        function numerictextbox_change() {
            // Handle the change event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $numerictextbox = new \Kendo\UI\NumericTextBox('numerictextbox');

        // Provide inline JavaScript code that will handle the 'change' event of the numerictextbox
        $numerictextbox->change('function() { /* Handle the change event */ }');

        echo $numerictextbox->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing NumericTextBox instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [NumericTextBox API](/api/javascript/ui/numerictextbox#methods) to control its behavior.

###### Example

        <?php
        $numerictextbox = new \Kendo\UI\NumericTextBox('numerictextbox');
        echo $numerictextbox->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the numerictextbox
            var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox")
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the NumericTextBox:

* [Overview of the Kendo UI NumericTextBox Widget]({% slug overview_kendoui_numerictextbox_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
