---
title: Overview
page_title: How to use the DropDownList PHP class, server-side wrapper for Kendo UI DropDownList widget
description: Learn how to bind Kendo UI DropDownList for PHP, handle Kendo UI DropDownList Events, access an existing dropdownlist.
---

# DropDownList

The Kendo DropDownList for PHP is a server-side wrapper for the [Kendo UI DropDownList](/api/web/dropdownlist) widget.

## Getting Started

There are two ways to bind Kendo DropDownList for PHP:

* [local](/php/widgets/dropdownlist/local-binding) - the dropdownlist is bound to PHP array
* [remote](/php/widgets/dropdownlist/remote-binding) - the dropdownlist makes AJAX requests and is bound to JSON result

Here is how to configure the dropdownlist for local binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create an array which to which the dropdownlist will be bound to

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
4. Create a [dropdownlist](/api/wrappers/php/Kendo/UI/DropDownList), configure its [dataTextField](/api/wrappers/php/Kendo/UI/DropDownList#datatextfield) and
[dataValueField](/api/wrappers/php/Kendo/UI/DropDownList#datavaluefield) options and set its [data source](/api/wrappers/php/Kendo/UI/DropDownList#datasource).

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);

        $dropdownlist = new \Kendo\UI\DropDownList('DropDownList');
        $dropdownlist->dataSource($dataSource);
        $dropdownlist->dataTextField('name');
        $dropdownlist->dataValueField('age');
        ?>
5. Output the dropdownlist by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $dropdownlist->render();
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo DropDownList instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/dropdownlist#methods) to control its behavior.


### Example

    <?php
    $dropdownlist = new \Kendo\UI\DropDownList('dropdownlist');
    echo $dropdownlist->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the dropdownlist
        var dropdownlist = $("#dropdownlist").data("kendoDropDownList")
    });
    </script>

## Handling Events

You can subscribe to all dropdownlist [events](/api/web/dropdownlist#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $dropdownlist = new \Kendo\UI\DropDownList('dropdownlist');

    // The 'dropdownlist_change' JavaScript function will handle the 'change' event of the dropdownlist
    $dropdownlist->change('dropdownlist_change');

    echo $dropdownlist->render();
    ?>
    <script>
    function dropdownlist_change() {
        // Handle the change event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $dropdownlist = new \Kendo\UI\DropDownList('dropdownlist');

    // Provide inline JavaScript code that will handle the 'change' event of the dropdownlist
    $dropdownlist->change('function() { /* Handle the change event */ }');

    echo $dropdownlist->render();
    ?>
