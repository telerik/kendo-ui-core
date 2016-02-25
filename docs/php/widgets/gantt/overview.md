---
title: Overview
page_title: Overview | Gantt PHP Class
description: "Get started with the Gantt PHP class in Kendo UI."
slug: overview_gantt_uiforphp
position: 1
---

# Gantt PHP Class Overview

The Kendo UI Gantt for PHP is a server-side wrapper for the [Kendo UI Gantt](/api/javascript/ui/gantt) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI Gantt for PHP:

* [Locally]({% slug localbinding_gantt_uiforphp %})&mdash;Local binding binds the Gantt to a PHP array.
* [Remotely]({% slug remotebinding_gantt_uiforphp %})&mdash;During remote binding the Gantt makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Gantt for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the Gantt will be bound.

###### Example

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

**Step 3** Create an array of dependencies to which the Gantt will be bound.

###### Example

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

**Step 4** Create a [`DataSource`](/api/php/Kendo/Data/DataSource) for the tasks and set its [`data`](/api/php/Kendo/Data/DataSource#data).

###### Example

        <?php
        $tasksDataSource = new \Kendo\Data\DataSource();
        $tasksDataSource->data($tasksData);
        ?>

**Step 5** Create a [`DataSource`](/api/php/Kendo/Data/DataSource) for the dependencies and set its [`data`](/api/php/Kendo/Data/DataSource#data).

###### Example

        <?php
        $dependenciesDataSource = new \Kendo\Data\DataSource();
        $dependenciesDataSource->data($dependenciesData);
        ?>

**Step 6** Create a [Gantt](/api/php/Kendo/UI/Gantt), set its [`dataSource`](/api/php/Kendo/UI/Gantt#datasource), and the [`dataSource` of the dependencies](/api/php/Kendo/UI/Gantt#dependencies).

###### Example

        <?php
        $gantt = new \Kendo\UI\Gantt('gantt');
        $gantt->dataSource($tasksDataSource)
            ->dependencies($dependenciesDataSource);
        ?>

**Step 7** Output the Gantt by echoing the result of the `render` method.

###### Example

        <?php
        echo $gantt->render();
        ?>

## Event Handling

You can subscribe to all Gantt [events](/api/javascript/ui/gantt#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

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

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

    <?php
    $gantt = new \Kendo\UI\Gantt('gantt');

    // Provide inline JavaScript code that will handle the 'dataBound' event of the gantt
    $gantt->dataBound('function() { /* Handle the dataBound event */ }');

    echo $gantt->render();
    ?>

<!--*-->
## Reference

### Client-Side Instances

You can reference the client-side Kendo UI Gantt instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Gantt API](/api/javascript/ui/gantt#methods) to control its behavior.

###### Example

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

## See Also

Other articles on Telerik UI for PHP and on the Gantt:

* [Local Binding of the Gantt PHP Class]({% slug localbinding_gantt_uiforphp %})
* [Remote Binding of the Gantt PHP Class]({% slug remotebinding_gantt_uiforphp %})
* [Overview of the Kendo UI Gantt Widget]({% slug overview_kendoui_gantt_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
