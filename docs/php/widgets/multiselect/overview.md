---
title: Overview
page_title: How to use the MultiSelect PHP class, server-side wrapper for Kendo UI MultiSelect widget
description: Learn how to bind Kendo UI MultiSelect for PHP, handle Kendo UI MultiSelect Events, access an existing multiselect.
---

# MultiSelect

The Kendo MultiSelect for PHP is a server-side wrapper for the [Kendo UI MultiSelect](/api/web/multiselect) widget.

## Getting Started

There are two ways to bind Kendo MultiSelect for PHP:

* [local](/php/widgets/multiselect/local-binding) - the multiselect is bound to PHP array
* [remote](/php/widgets/multiselect/remote-binding) - the multiselect makes AJAX requests and is bound to JSON result

Here is how to configure the multiselect for local binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create an array which to which the multiselect will be bound to

        <?php
        $data = array(
            array('name' => 'John Doe', 'age' => 32),
            array('name' => 'Jane Doe', 'age' => 29),
            array('name' => 'Jane Doe', 'age' => 27)
        );
        ?>
3. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data):

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>
4. Create a [multiselect](/api/wrappers/php/Kendo/UI/MultiSelect).

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);

        $multiSelect = new \Kendo\UI\MultiSelect('MultiSelect');
        $multiSelect->dataSource($dataSource);
        $multiSelect->dataTextField('name');
        $multiSelect->dataValueField('age');
        $multiSelect->value(array(27, 29));
        ?>
5. Output the multiselect by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $multiSelect->render();
        ?>
## Pre-select values on initial loading

When deffered binding (autoBind: false) is used you will need to specify a list of data items instead of just list of strings.
This functionality is supported in Q1 SP1 2013 release and later versions of Kendo UI.

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);

        $multiSelect = new \Kendo\UI\MultiSelect('MultiSelect');
        $multiSelect->dataSource($dataSource);
        $multiSelect->dataTextField('name');
        $multiSelect->dataValueField('age');
        $multiSelect->autoBind(false);
        $multiSelect->value(array(
            array('name' => 'John Doe', 'age' => 32),
            array('name' => 'Jane Doe', 'age' => 29)
        ));
        ?>
## Getting Client-side Reference

You can reference the client-side Kendo MultiSelect instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/multiselect#methods) to control its behavior.


### Example

    <?php
    $multiSelect = new \Kendo\UI\MultiSelect('multiselect');
    echo $multiSelect->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the multiselect
        var multiselect = $("#multiselect").data("kendoMultiSelect")
    });
    </script>

## Handling Events

You can subscribe to all multiselect [events](/api/web/multiselect#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $multiSelect = new \Kendo\UI\MultiSelect('multiselect');

    // The 'multiselect_change' JavaScript function will handle the 'change' event of the multiselect
    $multiSelect->change('multiselect_change');

    echo $multiSelect->render();
    ?>
    <script>
    function multiselect_change() {
        // Handle the change event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $multiSelect = new \Kendo\UI\MultiSelect('multiselect');

    // Provide inline JavaScript code that will handle the 'change' event of the multiselect
    $multiSelect->change('function() { /* Handle the change event */ }');

    echo $multiSelect->render();
    ?>
