---
title: Overview
page_title: How to use the Scheudler PHP class, server-side wrapper for Kendo UI Scheudler widget
description: Learn how to bind Kendo UI Scheudler for PHP, handle Kendo UI Scheudler Events, access an existing scheduler.
---

# Scheduler

The Kendo Scheduler for PHP is a server-side wrapper for the [Kendo UI Scheduler](/api/web/scheduler) widget.



## Getting Started

There are two ways to bind Kendo Scheduler for PHP:

* [local](/php/widgets/scheduler/local-binding) - the scheduler is bound to PHP array
* [remote](/php/widgets/scheduler/remote-binding) - the scheduler makes AJAX requests and is bound to JSON result

Here is how to configure the scheduler for local binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create an array of events to which the scheduler will be bound to

        <?php
        $data = array(
             array(
                'id' => 1,
                'title' => 'Bowling tournament',
                'isAllDay' => true,
                'start' => new DateTime('2013/6/13 00:00'),
                'end' => new DateTime('2013/6/13 00:30')
            ),
            array(
                'id' => 2,
                'title' => "Alex's Birthday",
                'start' => new DateTime('2013/6/13 14:00'),
                'end' => new DateTime('2013/6/13 15:30')
            )
        );
        ?>
3. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data):

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>
4. Create a [scheduler](/api/wrappers/php/Kendo/UI/Scheduler), set initial selected [date](/api/wrappers/php/Kendo/UI/Scheduler#date) and set its [data source](/api/wrappers/php/Kendo/UI/Scheduler#datasource).

        <?php
        $scheduler = new \Kendo\UI\Scheduler('scheduler');
        $scheduler->date(new DateTime('2013/6/13'))
             ->dataSource($dataSource);
        ?>
5. Output the scheduler by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $scheduler->render();
        ?>

## Getting Client-side Reference

You can reference the clien-side Kendo Scheduler instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/scheduler#methods) to control its behavior.


### Example

    <?php
    $scheduler = new \Kendo\UI\Scheduler('eventScheduler');
    echo $scheduler->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the scheduler
        var scheduler = $("#eventScheduler").data("kendoScheduler")
    });
    </script>

## Handling Events

You can subscribe to all scheduler [events](/api/web/scheduler#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $scheduler = new \Kendo\UI\Scheduler('scheduler');

    // The 'scheduler_dataBound' JavaScript function will handle the 'dataBound' event of the scheduler
    $scheduler->dataBound('scheduler_dataBound');

    echo $scheduler->render();
    ?>
    <script>
    function scheduler_dataBound() {
        // Handle the dataBound event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $scheduler = new \Kendo\UI\Scheduler('scheduler');

    // Provide inline JavaScript code that will handle the 'dataBound' event of the scheduler
    $scheduler->dataBound('function() { /* Handle the dataBound event */ }');

    echo $scheduler->render();
    ?>
