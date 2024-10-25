---
title: Overview
page_title: Overview - TaskBoard PHP Class
description: "Get started with the TaskBoard PHP class in Kendo UI."
slug: overview_taskboard_uiforphp
position: 1
---

# TaskBoard PHP Class Overview

The Kendo UI TaskBoard for PHP is a server-side wrapper for the [Kendo UI TaskBoard](/api/javascript/ui/taskboard) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TaskBoard for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [TaskBoard](/api/php/Kendo/UI/TaskBoard), and configure its columns and cards data source.



        <?php
            $columnSettings = new \Kendo\UI\TaskBoardColumnSettings();
            $columnSettings->addButton("editColumn")
                        ->addButton("addCard")
                        ->addButton("deleteColumn")
                        ->width(320)
                        ->template("<span class='column-template-container'>
                                <span class='column-status'>
                                    <span class='column-badge' id='badge-#= status #'>0</span>
                                    <span class='column-text'>#: text #</span>
                                </span>
                                <span class='column-buttons'>#= buttons #</span>
                            </span>");

            $taskboard = new \Kendo\UI\TaskBoard('taskBoard');
            $taskboard->columnSettings($columnSettings)
                    ->columns(array(
                            array("text"=> "To-Do", "id" => 1, "status" => "todo"),
                            array("text"=> "In Progress", "id" => 2, "status" => "inProgress"),
                            array("text"=> "Done", "id" => 3, "status" => "done")
                    ))
                    ->dataSource(array(
                        array( "id"=> 1, "title"=> "Campaigns", "order"=> 1, "description"=> "Create a new landing page for campaign", "status"=> "todo", "color"=> "orange" ),
                        array( "id"=> 2, "title"=> "Newsletters", "order"=> 2, "description"=> "Send newsletter", "status"=> "todo", "color"=> "orange" ),
                        array( "id"=> 3, "title"=> "Ads Analytics", "order"=> 3, "description"=> "Review ads performance", "status"=> "todo", "color"=> "orange" ),
                        array( "id"=> 10, "title"=> "Customer Research", "order"=> 10, "description"=> "Refine feedback from user interviews", "status"=> "inProgress", "color"=> "blue" ),
                        array( "id"=> 11, "title"=> "Campaigns", "order"=> 11, "description"=> "Collaborate with designers on new banners", "status"=> "inProgress", "color"=> "blue" ),
                        array( "id"=> 13, "title"=> "Customer Journey", "order"=> 13, "description"=> "Review shopping cart experience", "status"=> "done", "color"=> "green" ),
                        array( "id"=> 14, "title"=> "Content", "order"=> 14, "description"=> "Publish new blogpost", "status"=> "done", "color"=> "green" ),
                        array( "id"=> 15, "title"=> "Post-Release Party", "order"=> 15, "description"=> "Plan new release celebration", "status"=> "done", "color"=> "green" )
                    ))
                    ->dataOrderField("order")
                    ->height(970)
                    ->width(1025);

        ?>

**Step 3** Output the TaskBoard by echoing the result of the `render` method.



        <?php
        echo $taskboard->render();
        ?>

## Event Handling

You can subscribe to all TaskBoard [events](/api/javascript/ui/taskboard#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.



    <?php
    $taskboard = new \Kendo\UI\TaskBoard('taskBoard');

    // The 'onDataBound' JavaScript function will handle the 'dataBound' event of the TaskBoard
    $taskboard->dataBound('onDataBound');

    echo $taskboard->render();
    ?>
    <script>
    function onDataBound(e) {
        //handle the event
    }
    </script>

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.



    <?php
    $taskboard = new \Kendo\UI\TaskBoard('taskBoard');

    // Provide inline JavaScript code that will handle the 'dataBound' event of the TaskBoard
    $taskboard->dataBound('function() { /* Handle the dataBound event */ }');

    echo $taskboard->render();
    ?>

<!--*-->
## Reference

### Client-Side Instances

To get a reference to an existing TaskBoard instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [TaskBoard client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard#methods) to control its behavior.

        <?php
        $taskboard = new \Kendo\UI\TaskBoard('taskBoard');
        echo $taskboard->render();
        ?>
        $(document).ready(function() {
            // // The constructor parameter is used as the 'id' HTML attribute of the TaskBoard
            var taskBoard = $("#taskBoard").data("kendoTaskBoard");
        });

## See Also

* [Overview of the Kendo UI TaskBoard Widget]({% slug overview_kendoui_taskboard_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
