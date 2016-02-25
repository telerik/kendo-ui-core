---
title: Overview
page_title: Overview | ListView PHP Class
description: "Get started with the ListView PHP class in Kendo UI."
slug: overview_listview_uiforphp
position: 1
---

# ListView PHP Class Overview

The Kendo UI ListView for PHP is a server-side wrapper for the [Kendo UI ListView](/api/javascript/ui/listview) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI ListView for PHP:

* [Locally]({% slug localbinding_grid_uiforphp %})&mdash;Local binding binds the ListView to a PHP array.
* [Remotely]({% slug remotebinding_grid_uiforphp %})&mdash;During remote binding the ListView makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ListView for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the ListView will be bound.

###### Example

        <?php
        $data = array(
            array('name' => 'John Doe', 'age' => 32),
            array('name' => 'Jane Doe', 'age' => 29)
        );
        ?>

**Step 3** Create a [`dataSource`](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>

**Step 4** Prepare the ListView item template.

###### Example

		<script type="text/x-kendo-tmpl" id="template">
    		<div class="product">
        		<img src="../../content/web/foods/#:ProductID#.jpg" alt="#:ProductName# image" />
        		<h3>#:ProductName#</h3>
        		<p>#:kendo.toString(UnitPrice, "c")#</p>
    		</div>
		</script>

**Step 5** Create a [ListView](/api/php/Kendo/UI/ListView), configure its [`template`](/api/php/Kendo/UI/ListView#template) and set its [`dataSource`](/api/php/Kendo/UI/ListView#datasource).

###### Example

        <?php        
        $listview = new \Kendo\UI\ListView('listview');		
        $listview->templateId('template')
             ->dataSource($dataSource);
        ?>

**Step 6** Optionally, you can configure the [`tagName`](/api/php/Kendo/UI/ListView#tagname) which is used to create an element containing all ListView items once the ListView is bound. By default, a `div` element will be created.

###### Example

		<?php
		$listview->tagName('ul');
		?>

**Step 7** Output the ListView by echoing the result of the `render` method.

###### Example

        <?php
        echo $listview->render();
        ?>

## Event Handling

You can subscribe to all ListView [events](/api/javascript/ui/listview#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

    <?php
    $listview = new \Kendo\UI\ListView('listview');

    // The 'listview_dataBound' JavaScript function will handle the 'dataBound' event of the listview
    $listview->dataBound('listview_dataBound');

    echo $listview->render();
    ?>
    <script>
    function listview_dataBound() {
        // Handle the dataBound event
    }
    </script>

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

    <?php
    $listview = new \Kendo\UI\ListView('listview');

    // Provide inline JavaScript code that will handle the 'dataBound' event of the listview
    $listview->dataBound('function() { /* Handle the dataBound event */ }');

    echo $listview->render();
    ?>

<!--*-->
## Reference

### Client-Side Instances

You can reference the client-side Kendo UI ListView instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [ListView API](/api/javascript/ui/listview#methods) to control its behavior.

###### Example

    <?php
    $listview = new \Kendo\UI\ListView('listview');
    echo $listview->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the listview
        var listview = $("#listview").data("kendoListView")
    });
    </script>

## See Also

Other articles on Telerik UI for PHP and on the ListView:

* [Local Binding of the ListView PHP Class]({% slug localbinding_listview_uiforphp %})
* [Remote Binding of the ListView PHP Class]({% slug remotebinding_listview_uiforphp %})
* [Editing of the ListView PHP Class]({% slug editing_listview_uiforphp %})
* [Overview of the Kendo UI ListView Widget]({% slug overview_kendoui_listview_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
