---
title: Overview
page_title: Overview | Grid PHP Class
description: "Get started with the Grid PHP class in Kendo UI."
slug: overview_grid_uiforphp
position: 1
---

# Grid PHP Class Overview

The Kendo UI Grid for PHP is a server-side wrapper for the [Kendo UI Grid](/api/javascript/ui/grid) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI Grid for PHP:

* [Locally]({% slug localbinding_grid_uiforphp %})&mdash;Local binding binds the Grid to a PHP array.
* [Remotely]({% slug remotebinding_grid_uiforphp %})&mdash;During remote binding the Grid makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Grid for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the Grid will be bound.

###### Example

        <?php
        $data = array(
            array('name' => 'John Doe', 'age' => 32),
            array('name' => 'Jane Doe', 'age' => 29)
        );
        ?>

**Step 3** Create a [`DataSource`](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>

**Step 4** Create a [Grid](/api/php/Kendo/UI/Grid), configure its [columns](/api/php/Kendo/UI/Grid#addcolumn) and set its [`dataSource`](/api/php/Kendo/UI/Grid#datasource).

###### Example

        <?php
        $nameColumn = new \Kendo\UI\GridColumn();
        $nameColumn->field('name');

        $ageColumn = new \Kendo\UI\GridColumn();
        $ageColumn->field('age');

        $grid = new \Kendo\UI\Grid('grid');
        $grid->addColumn($nameColumn, $ageColumn)
             ->dataSource($dataSource);
        ?>

**Step 5** Output the Grid by echoing the result of the `render` method.

###### Example

        <?php
        echo $grid->render();
        ?>

## Event Handling

You can subscribe to all Grid [events](/api/javascript/ui/grid#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

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

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

        <?php
        $grid = new \Kendo\UI\Grid('grid');

        // Provide inline JavaScript code that will handle the 'dataBound' event of the grid
        $grid->dataBound('function() { /* Handle the dataBound event */ }');

        echo $grid->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You can reference the client-side Kendo UI Grid instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Grid API](/api/javascript/ui/grid#methods) to control its behavior.

###### Example

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

## See Also

Other articles on Telerik UI for PHP and on the Grid:

* [Local Binding of the Grid PHP Class]({% slug localbinding_grid_uiforphp %})
* [Remote Binding of the Grid PHP Class]({% slug remotebinding_grid_uiforphp %})
* [Editing of the Grid PHP Class]({% slug editing_grid_uiforphp %})
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
