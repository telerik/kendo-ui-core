---
title: Overview
page_title: How to use the AutoComplete PHP class, server-side wrapper for Kendo UI AutoComplete widget
description: Learn how to bind Kendo UI AutoComplete for PHP, handle Kendo UI AutoComplete Events, access an existing autocomplete.
---

# AutoComplete

The Kendo AutoComplete for PHP is a server-side wrapper for the [Kendo UI AutoComplete](/api/web/autocomplete) widget.

## Getting Started

There are two ways to bind Kendo AutoComplete for PHP:

* [local](/php/widgets/autocomplete/local-binding) - the autocomplete is bound to PHP array
* [remote](/php/widgets/autocomplete/remote-binding) - the autocomplete makes AJAX requests and is bound to JSON result

Here is how to configure the autocomplete for local binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create an array which to which the autocomplete will be bound to

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
4. Create a [autocomplete](/api/wrappers/php/Kendo/UI/AutoComplete), configure its [dataTextField](/api/wrappers/php/Kendo/UI/AutoComplete#datatextfield) option and set its [data source](/api/wrappers/php/Kendo/UI/AutoComplete#datasource).

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);

        $autoComplete = new \Kendo\UI\AutoComplete('AutoComplete');
        $autoComplete->dataSource($dataSource);
        $autoComplete->dataTextField('name');
        ?>
5. Output the autocomplete by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $autoComplete->render();
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo AutoComplete instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/autocomplete#methods) to control its behavior.


### Example

    <?php
    $autoComplete = new \Kendo\UI\AutoComplete('autocomplete');
    echo $autoComplete->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the autocomplete
        var autocomplete = $("#autocomplete").data("kendoAutoComplete")
    });
    </script>

## Handling Events

You can subscribe to all autocomplete [events](/api/web/autocomplete#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $autoComplete = new \Kendo\UI\AutoComplete('autocomplete');

    // The 'autocomplete_change' JavaScript function will handle the 'change' event of the autocomplete
    $autoComplete->change('autocomplete_change');

    echo $autoComplete->render();
    ?>
    <script>
    function autocomplete_change() {
        // Handle the change event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $autoComplete = new \Kendo\UI\AutoComplete('autocomplete');

    // Provide inline JavaScript code that will handle the 'change' event of the autocomplete
    $autoComplete->change('function() { /* Handle the change event */ }');

    echo $autoComplete->render();
    ?>
