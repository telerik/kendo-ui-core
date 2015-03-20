---
title: Overview
page_title: How to use the Gantt PHP class, server-side wrapper for Kendo UI Gantt widget
description: Learn how to bind Kendo UI Gantt for PHP, handle Kendo UI Gantt Events, access an existing gantt.
---

# Gantt

The Kendo Gantt for PHP is a server-side wrapper for the [Kendo UI Gantt](/api/web/gantt) widget.

## Getting Started

There are two ways to bind Kendo Gantt for PHP:

* [local](/php/widgets/gantt/local-binding) - the gantt is bound to PHP array
* [remote](/php/widgets/gantt/remote-binding) - the gantt makes AJAX requests and is bound to JSON result

Here is how to configure the gantt for local binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create an array of tasks to which the gantt will be bound to

        <?php
        $tasksData = array(
             array(
                'id' => 1,
                'orderId' => 0,
                'parentId' => null,
                'title' => 'Task 1',
                'percentComplete' => 0.4,
                'start' => new DateTime('2013/6/13 00:00'),
                'end' => new DateTime('2013/6/13 00:30')
            ),
            array(
                'id' => 2,
                'orderId' => 1,
                'parentId' => null,
                'title' => 'Task 2',
                'percentComplete' => 0.6,
                'start' => new DateTime('2013/6/13 14:00'),
                'end' => new DateTime('2013/6/13 15:30')
            )
        );
        ?>
1. Create an array of dependencies to which the gantt will be bound to

        <?php
        $dependenciesData = array(
             array(
                'id' => 1,
                'predecessorId' => 1,
                'successorId' => 2,
                'type' => 1
            )
        );
        ?>
1. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) for the tasks and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data):

        <?php
        $tasksDataSource = new \Kendo\Data\DataSource();
        $tasksDataSource->data($tasksData);
        ?>
1. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) for the dependencies and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data):

        <?php
        $dependenciesDataSource = new \Kendo\Data\DataSource();
        $dependenciesDataSource->data($dependenciesData);
        ?>
1. Create a [gantt](/api/wrappers/php/Kendo/UI/Gantt), set its [data source](/api/wrappers/php/Kendo/UI/Gantt#datasource) and  [dependencies data source](/api/wrappers/php/Kendo/UI/Gantt#dependencies).

        <?php
        $gantt = new \Kendo\UI\Gantt('gantt');
        $gantt->dataSource($tasksDataSource)
            ->dependencies($dependenciesDataSource);
        ?>
1. Output the gantt by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $gantt->render();
        ?>

## Getting Client-side Reference

You can reference the clien-side Kendo Gantt instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/gantt#methods) to control its behavior.

### Example

    <?php
    $gantt = new \Kendo\UI\Gantt('Gantt');
    echo $gantt->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the gantt
        var gantt = $("#Gantt").data("kendoGantt");
    });
    </script>

## Handling Events

You can subscribe to all gantt [events](/api/web/gantt#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $gantt = new \Kendo\UI\Gantt('gantt');

    // The 'gantt_dataBound' JavaScript function will handle the 'dataBound' event of the gantt
    $gantt->dataBound('gantt_dataBound');

    echo $gantt->render();
    ?>
    <script>
    function gantt_dataBound() {
        // Handle the dataBound event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $gantt = new \Kendo\UI\Gantt('gantt');

    // Provide inline JavaScript code that will handle the 'dataBound' event of the gantt
    $gantt->dataBound('function() { /* Handle the dataBound event */ }');

    echo $gantt->render();
    ?>
