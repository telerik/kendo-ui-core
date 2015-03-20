---
title: Overview
page_title: How to use the TreeList PHP class, server-side wrapper for Kendo UI TreeList widget
description: Learn how to bind Kendo UI TreeList for PHP, handle Kendo UI TreeList Events, access an existing treelist.
---

# TreeList

The Kendo TreeList for PHP is a server-side wrapper for the [Kendo UI TreeList](/api/web/treelist) widget.

## Getting Started

There are three ways to bind Kendo TreeList for PHP:

* [local](/php/widgets/treelist/local-data-binding) - the treelist is bound to PHP array
* [remote loading of all items](/php/widgets/treelist/index) - the treelist makes a single AJAX request that fetches all elements and is bound to JSON result
* [remote loading on demand](/php/widgets/treelist/remote-data-binding) - the treelist makes AJAX requests when the user expands an item and is bound to JSON result

Here is how to configure the treelist for local binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create an array which to which the treelist will be bound to

        <?php
        $data = array(
            array('name' => 'John Doe', 'age' => 32, 'parentId' => null),
            array('name' => 'Jane Doe', 'age' => 29, 'parentId' => null)
        );
        ?>
3. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data):

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>
4. Create a [treelist](/api/wrappers/php/Kendo/UI/TreeList), configure its [columns](/api/wrappers/php/Kendo/UI/TreeList#addcolumn) and set its [data source](/api/wrappers/php/Kendo/UI/TreeList#datasource).

        <?php
        $nameColumn = new \Kendo\UI\TreeListColumn();
        $nameColumn->field('name');

        $ageColumn = new \Kendo\UI\TreeListColumn();
        $ageColumn->field('age');

        $treelist = new \Kendo\UI\TreeList('treelist');
        $treelist->addColumn($nameColumn, $ageColumn)
             ->dataSource($dataSource);
        ?>
5. Output the treelist by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $treelist->render();
        ?>

## Getting Client-side Reference

You can reference the clien-side Kendo TreeList instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/treelist#methods) to control its behavior.


### Example

    <?php
    $treelist = new \Kendo\UI\TreeList('employees');
    echo $treelist->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the treelist
        var treelist = $("#employees").data("kendoTreeList")
    });
    </script>

## Handling Events

You can subscribe to all treelist [events](/api/web/treelist#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $treelist = new \Kendo\UI\TreeList('treelist');

    // The 'treelist_dataBound' JavaScript function will handle the 'dataBound' event of the treelist
    $treelist->dataBound('treelist_dataBound');

    echo $treelist->render();
    ?>
    <script>
    function treelist_dataBound() {
        // Handle the dataBound event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $treelist = new \Kendo\UI\TreeList('treelist');

    // Provide inline JavaScript code that will handle the 'dataBound' event of the treelist
    $treelist->dataBound('function() { /* Handle the dataBound event */ }');

    echo $treelist->render();
    ?>
