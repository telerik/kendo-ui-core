---
title: Overview
page_title: Overview | Scheduler PHP Class
description: "Get started with the Scheduler PHP class in Kendo UI."
slug: overview_scheduler_uiforphp
position: 1
---

# Scheduler PHP Class Overview

The Kendo UI Scheduler for PHP is a server-side wrapper for the [Kendo UI Scheduler](/api/javascript/ui/scheduler) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI Scheduler for PHP:

* [Locally]({% slug localbinding_autocomplete_uiforphp %})&mdash;Local binding binds the Scheduler to a PHP array.
* [Remotely]({% slug remotebinding_autocomplete_uiforphp %})&mdash;During remote binding the Scheduler makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Scheduler for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the Scheduler will be bound.

###### Example

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

**Step 3** Create a [data source](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>

**Step 4** Create a [Scheduler](/api/php/Kendo/UI/Scheduler), set the initial selected [`date`](/api/php/Kendo/UI/Scheduler#date) and its [`dataSource`](/api/php/Kendo/UI/Scheduler#datasource).

###### Example

        <?php
        $scheduler = new \Kendo\UI\Scheduler('scheduler');
        $scheduler->date(new DateTime('2013/6/13'))
             ->dataSource($dataSource);
        ?>

**Step 5** Output the Scheduler by echoing the result of the `render` method.

###### Example

        <?php
        echo $scheduler->render();
        ?>

## Event Handling

You can subscribe to all Scheduler [events](/api/javascript/ui/scheduler#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

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

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

        <?php
        $scheduler = new \Kendo\UI\Scheduler('scheduler');

        // Provide inline JavaScript code that will handle the 'dataBound' event of the scheduler
        $scheduler->dataBound('function() { /* Handle the dataBound event */ }');

        echo $scheduler->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You can reference the client-side Kendo UI Scheduler instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Scheduler API](/api/javascript/ui/scheduler#methods) to control its behavior.

###### Example

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

## See Also

Other articles on Telerik UI for PHP and on the Scheduler:

* [Local Binding of the Scheduler PHP Class]({% slug localbinding_scheduler_uiforphp %})
* [Remote Binding of the Scheduler PHP Class]({% slug remotebinding_scheduler_uiforphp %})
* [Overview of the Kendo UI Scheduler Widget]({% slug overview_kendoui_scheduler_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
