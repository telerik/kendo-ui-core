---
title: Overview
page_title: How to use the Grid PHP class, server-side wrapper for Kendo UI Grid widget
description: Learn how to bind Kendo UI Grid for PHP, handle Kendo UI Grid Events, access an existing grid.
---

# Grid

The Kendo Grid for PHP is a server-side wrapper for the [Kendo UI Grid](/api/web/grid) widget.

## Getting Started

There are two ways to bind Kendo Grid for PHP:

* [local](/php/widgets/grid/local-binding) - the grid is bound to PHP array
* [remote](/php/widgets/grid/remote-binding) - the grid makes AJAX requests and is bound to JSON result

Here is how to configure the grid for local binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create an array which to which the grid will be bound to

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
4. Create a [grid](/api/wrappers/php/Kendo/UI/Grid), configure its [columns](/api/wrappers/php/Kendo/UI/Grid#addcolumn) and set its [data source](/api/wrappers/php/Kendo/UI/Grid#datasource).

        <?php
        $nameColumn = new \Kendo\UI\GridColumn();
        $nameColumn->field('name');

        $ageColumn = new \Kendo\UI\GridColumn();
        $ageColumn->field('age');

        $grid = new \Kendo\UI\Grid('grid');
        $grid->addColumn($nameColumn, $ageColumn)
             ->dataSource($dataSource);
        ?>
5. Output the grid by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $grid->render();
        ?>

## Getting Client-side Reference

You can reference the clien-side Kendo Grid instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/grid#methods) to control its behavior.


### Example

    <?php
    $grid = new \Kendo\UI\Grid('productGrid');
    echo $grid->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the grid
        var grid = $("#productGrid").data("kendoGrid")
    });
    </script>

## Handling Events

You can subscribe to all grid [events](/api/web/grid#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $grid = new \Kendo\UI\Grid('grid');

    // The 'grid_dataBound' JavaScript function will handle the 'dataBound' event of the grid
    $grid->dataBound('grid_dataBound');

    echo $grid->render();
    ?>
    <script>
    function grid_dataBound() {
        // Handle the dataBound event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $grid = new \Kendo\UI\Grid('grid');

    // Provide inline JavaScript code that will handle the 'dataBound' event of the grid
    $grid->dataBound('function() { /* Handle the dataBound event */ }');

    echo $grid->render();
    ?>
