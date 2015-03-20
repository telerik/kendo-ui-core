---
title: Overview
page_title: How to use the ListView PHP class, server-side wrapper for Kendo UI ListView widget
description: Learn how to bind Kendo UI ListView for PHP, handle Kendo UI ListView Events, access an existing listview.
---

# ListView

The Kendo ListView for PHP is a server-side wrapper for the [Kendo UI ListView](/api/web/listview) widget.

## Getting Started

There are two ways to bind Kendo ListView for PHP:

* [local](/php/widgets/listview/local-binding) - the listview is bound to PHP array
* [remote](/php/widgets/listview/remote-binding) - the listview makes AJAX requests and is bound to JSON result

Here is how to configure the listview for local binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create an array which to which the listview will be bound to

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
4. Prepare ListView item template

		<script type="text/x-kendo-tmpl" id="template">
    		<div class="product">
        		<img src="../../content/web/foods/#:ProductID#.jpg" alt="#:ProductName# image" />
        		<h3>#:ProductName#</h3>
        		<p>#:kendo.toString(UnitPrice, "c")#</p>
    		</div>
		</script>

5. Create a [listview](/api/wrappers/php/Kendo/UI/ListView), configure its [template](/api/wrappers/php/Kendo/UI/ListView#template) and set its [data source](/api/wrappers/php/Kendo/UI/ListView#datasource).

        <?php        
        $listview = new \Kendo\UI\ListView('listview');		
        $listview->templateId('template')
             ->dataSource($dataSource);
        ?>

6. Optionally you can configure the [tagName](/api/wrappers/php/Kendo/UI/ListView#tagname) which is used to create an element which will contain all listivew items once the listview is bound. By default `div` element will be created.

		<?php
		$listview->tagName('ul');
		?>

7. Output the listview by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $listview->render();
        ?>

## Getting Client-side Reference

You can reference the clien-side Kendo ListView instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/listview#methods) to control its behavior.


### Example

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

## Handling Events

You can subscribe to all listview [events](/api/web/listview#events).

### Example - subscribing by specifying JavaScript function name

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

### Example - providing inline JavaScript code

    <?php
    $listview = new \Kendo\UI\ListView('listview');

    // Provide inline JavaScript code that will handle the 'dataBound' event of the listview
    $listview->dataBound('function() { /* Handle the dataBound event */ }');

    echo $listview->render();
    ?>
