---
title: Overview
page_title: Overview | MaskedTextBox PHP Class
description: "Get started with the MaskedTextBox PHP class in Kendo UI."
slug: overview_maskedtextbox_uiforphp
position: 1
---

# MaskedTextBox PHP Class Overview

The Kendo UI MaskedTextBox for PHP is a server-side wrapper for the [Kendo UI MaskedTextBox](/api/javascript/ui/maskedtextbox) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI MaskedTextBox for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [MaskedTextBox](/api/php/Kendo/UI/MaskedTextBox).

###### Example

        <?php
        $maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');
        $maskedtextbox->mask("(000) 000-0000")
                      ->value("(123) 345-6789");
        ?>

**Step 3** Output the MaskedTextBox by echoing the result of the `render` method.

###### Example

        <?php
        echo $maskedtextbox->render();
        ?>

## Functionalities

### Define Mask Values

The MaskedTextBox has [a list of predefined mask rules]({% slug overview_kendoui_maskedtextbox_widget %}#configuration-Rules), which can be used to compose the mask of the widget.

The example below demonstrates how to set a set a `zip code` mask (Web Forms).

###### Example

        <?php
        $maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');
        $maskedtextbox->mask("00000-9999");
        echo $maskedtextbox->render();
        ?>

> **Important**
>
> If no mask is defined, the widget will allow any input.

### Customize Mask Rules

The MaskedTextBox enables you to define custom mask rules if none of the predefined ones is sufficient. To add a custom rule, use the `rules` method.

The example below demonstrates how to define a custom rule for the `-` and `+` symbols.

###### Example

        <?php
        $rules = array('~' => '/[+-]/');

        $maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');
        $maskedtextbox->rules($rules);
        $maskedtextbox->mask("~0000");
        echo $maskedtextbox->render();
        ?>

> **Important**
>
> The widget supports [JavaScript Reguler Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) defined as a string or a JavaScript function.

## Event Handling

You can subscribe to all MaskedTextBox [events](/api/javascript/ui/maskedtextbox#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');

        // The 'maskedtextbox' JavaScript function will handle the 'change' event of the maskedtextbox
        $maskedtextbox->change('maskedtextbox_change');

        echo $maskedtextbox->render();
        ?>
        <script>
        function maskedtextbox_change() {
            // Handle the change event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');

        // Provide inline JavaScript code that will handle the 'change' event of the maskedtextbox
        $maskedtextbox->change('function() { /* Handle the change event */ }');

        echo $maskedtextbox->render();
        ?>
<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing MaskedTextBox instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [MaskedTextBox API](/api/javascript/ui/maskedtextbox#methods) to control its behavior.

###### Example

        <?php
        $maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');
        echo $maskedtextbox->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the maskedtextbox
            var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox")
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the MaskedTextBox:

* [Overview of the Kendo UI MaskedTextBox Widget]({% slug overview_kendoui_maskedtextbox_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
