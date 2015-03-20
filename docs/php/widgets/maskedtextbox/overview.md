---
title: Overview
page_title: How to use the MaskedTextBox PHP class, server-side wrapper for Kendo UI MaskedTextBox widget
description: Getting started with Kendo UI MaskedTextBox for PHP in quick steps - configure Kendo UI MaskedTextBox widget and operate Kendo UI MaskedTextBox events.
---

# MaskedTextBox

The Kendo MaskedTextBox for PHP is a server-side wrapper for the [Kendo UI MaskedTextBox](/api/web/maskedtextbox) widget.

## Getting Started

### Configure Kendo MaskedTextBox

Here is how to configure a simple Kendo MaskedTextBox:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.

2. Create a [maskedtextbox](/api/wrappers/php/Kendo/UI/MaskedTextBox).

        <?php
        $maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');
        $maskedtextbox->mask("(000) 000-0000")
                      ->value("(123) 345-6789");
        ?>

3. Output the maskedtextbox by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $maskedtextbox->render();
        ?>

### Define widget's mask value

The MaskedTextBox has [a list of predefined mask rules](/web/maskedtextbox/overview#predefined-mask-rules),
which can be used to compose the widget's mask.

#### WebForms - set a `zip code` mask

    <?php
    $maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');
    $maskedtextbox->mask("00000-9999");
    echo $maskedtextbox->render();
    ?>

> If no mask is defined widget will allow any input.

### Define a custom mask rule

The MaskedTextBox gives the ability to define custom mask rules if no of the predefined ones is sufficient.
To add a custom rule use the **rules** method:

#### Define a custom rule for "-" and "+" symbols

    <?php
    $rules = array('~' => '/[+-]/');

    $maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');
    $maskedtextbox->rules($rules);
    $maskedtextbox->mask("~0000");
    echo $maskedtextbox->render();
    ?>

> Widgets supports [JavaScript Reguler Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
defined as a string or JavaScript function.

## Getting Client-side Reference

You can reference the client-side Kendo MaskedTextBox instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/maskedtextbox#methods) to control its behavior.


### Example

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

## Handling Events

You can subscribe to all maskedtextbox [events](/api/web/maskedtextbox#events).

### Example - subscribing by specifying JavaScript function name

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

### Example - providing inline JavaScript code

    <?php
    $maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');

    // Provide inline JavaScript code that will handle the 'change' event of the maskedtextbox
    $maskedtextbox->change('function() { /* Handle the change event */ }');

    echo $maskedtextbox->render();
    ?>
