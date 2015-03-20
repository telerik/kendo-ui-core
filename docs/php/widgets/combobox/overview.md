---
title: Overview
page_title: How to use the ComboBox PHP class, server-side wrapper for Kendo UI ComboBox widget
description: Learn how to bind Kendo UI ComboBox for PHP, handle Kendo UI ComboBox Events, access an existing combobox.
---

# ComboBox

The Kendo ComboBox for PHP is a server-side wrapper for the [Kendo UI ComboBox](/api/web/combobox) widget.

## Getting Started

There are two ways to bind Kendo ComboBox for PHP:

* [local](/php/widgets/combobox/local-binding) - the combobox is bound to PHP array
* [remote](/php/widgets/combobox/remote-binding) - the combobox makes AJAX requests and is bound to JSON result

Here is how to configure the combobox for local binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create an array which to which the combobox will be bound to

        <?php
        $data = array(
            array('name' => 'John Doe', 'age' => 32),
            array('name' => 'Jane Doe', 'age' => 29)
        );
        ?>
3. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data):

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>
4. Create a [combobox](/api/wrappers/php/Kendo/UI/ComboBox), configure its [dataTextField](/api/wrappers/php/Kendo/UI/ComboBox#datatextfield) and
[dataValueField](/api/wrappers/php/Kendo/UI/ComboBox#datavaluefield) options and set its [data source](/api/wrappers/php/Kendo/UI/ComboBox#datasource).

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);

        $comboBox = new \Kendo\UI\ComboBox('ComboBox');
        $comboBox->dataSource($dataSource);
        $comboBox->dataTextField('name');
        $comboBox->dataValueField('age');
        ?>
5. Output the combobox by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $comboBox->render();
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo ComboBox instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/combobox#methods) to control its behavior.


### Example

    <?php
    $comboBox = new \Kendo\UI\ComboBox('combobox');
    echo $comboBox->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the combobox
        var combobox = $("#combobox").data("kendoComboBox")
    });
    </script>

## Handling Events

You can subscribe to all combobox [events](/api/web/combobox#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $comboBox = new \Kendo\UI\ComboBox('combobox');

    // The 'combobox_change' JavaScript function will handle the 'change' event of the combobox
    $comboBox->change('combobox_change');

    echo $comboBox->render();
    ?>
    <script>
    function combobox_change() {
        // Handle the change event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $comboBox = new \Kendo\UI\ComboBox('combobox');

    // Provide inline JavaScript code that will handle the 'change' event of the combobox
    $comboBox->change('function() { /* Handle the change event */ }');

    echo $comboBox->render();
    ?>
