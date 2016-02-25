---
title: Overview
page_title: Overview | TreeList PHP Class
description: "Get started with the TreeList PHP class in Kendo UI."
slug: overview_treelist_uiforphp
position: 1
---

# TreeList PHP Class Overview

The Kendo UI TreeList for PHP is a server-side wrapper for the [Kendo UI TreeList](/api/javascript/ui/editor) widget.

## Getting Started

### The Basics

There are three ways to bind a Kendo UI TreeList for PHP:

* [Locally](/api/php/Kendo/UI/TreeList#methods-dataBinding)&mdash;Local binding binds the TreeList to a PHP array.
* [Remotely, loading all items](/api/php/Kendo/UI/TreeList#methods-dataBinding)&mdash;During the remote loading of all items the TreeList makes a single AJAX request that fetches all elements, and is bound to the JSON result.
* [Remotely, loading on demand](/api/php/Kendo/UI/TreeList#methods-dataBinding)&mdash;During the remote loading on demand the TreeList makes AJAX requests when the user expands an item, and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TreeList for PHP for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the [TreeList](/api/php/Kendo/UI/TreeList) will be bound.

###### Example

        <?php
        $data = array(
            array('name' => 'John Doe', 'age' => 32, 'parentId' => null),
            array('name' => 'Jane Doe', 'age' => 29, 'parentId' => null)
        );
        ?>

**Step 3** Create a [`dataSource`](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>

**Step 4** Create a [TreeList](/api/php/Kendo/UI/TreeList), configure its [columns](/api/php/Kendo/UI/TreeList#addcolumn) and set its [`dataSource`](/api/php/Kendo/UI/TreeList#datasource).

###### Example

        <?php
        $nameColumn = new \Kendo\UI\TreeListColumn();
        $nameColumn->field('name');

        $ageColumn = new \Kendo\UI\TreeListColumn();
        $ageColumn->field('age');

        $treelist = new \Kendo\UI\TreeList('treelist');
        $treelist->addColumn($nameColumn, $ageColumn)
             ->dataSource($dataSource);
        ?>

**Step 5** Output the TreeList by echoing the result of the `render` method.

###### Example

        <?php
        echo $treelist->render();
        ?>

## Event Handling

You can subscribe to all TreeList [events](/api/javascript/ui/treelist#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

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

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $treelist = new \Kendo\UI\TreeList('treelist');

        // Provide inline JavaScript code that will handle the 'dataBound' event of the treelist
        $treelist->dataBound('function() { /* Handle the dataBound event */ }');

        echo $treelist->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing TreeList instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [TreeList API](/api/javascript/ui/treelist#methods) to control its behavior.

###### Example

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

## See Also

Other articles on Telerik UI for PHP and on the TreeList:

* [Overview of the Kendo UI TreeList Widget]({% slug overview_kendoui_treelist_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
