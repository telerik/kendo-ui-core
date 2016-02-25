---
title: Overview
page_title: Overview | MultiSelect PHP Class
description: "Get started with the MultiSelect PHP class in Kendo UI."
slug: overview_multiselect_uiforphp
position: 1
---

# MultiSelect PHP Class Overview

The Kendo UI MultiSelect for PHP is a server-side wrapper for the [Kendo UI MultiSelect](/api/javascript/ui/multiselect) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI MultiSelect for PHP:

* [Locally]({% slug localbinding_autocomplete_uiforphp %})&mdash;Local binding binds the MultiSelect to a PHP array.
* [Remotely]({% slug remotebinding_autocomplete_uiforphp %})&mdash;During remote binding the MultiSelect makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI MultiSelect for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the MultiSelect will be bound.

###### Example

        <?php
        $data = array(
            array('name' => 'John Doe', 'age' => 32),
            array('name' => 'Jane Doe', 'age' => 29),
            array('name' => 'Jane Doe', 'age' => 27)
        );
        ?>

**Step 3** Create a [data source](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>

**Step 4** Create a [MultiSelect](/api/php/Kendo/UI/MultiSelect).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);

        $multiSelect = new \Kendo\UI\MultiSelect('MultiSelect');
        $multiSelect->dataSource($dataSource);
        $multiSelect->dataTextField('name');
        $multiSelect->dataValueField('age');
        $multiSelect->value(array(27, 29));
        ?>

**Step 5** Output the MultiSelect by echoing the result of the `render` method.

###### Example

        <?php
        echo $multiSelect->render();
        ?>

### Value Pre-Selection on Initial Loading

When deferred binding (`autoBind: false`) is used, you need to specify a list of data items instead of just a list of strings. This functionality is first supported in Kendo UI Q1 SP1 2013 release and all later versions.

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);

        $multiSelect = new \Kendo\UI\MultiSelect('MultiSelect');
        $multiSelect->dataSource($dataSource);
        $multiSelect->dataTextField('name');
        $multiSelect->dataValueField('age');
        $multiSelect->autoBind(false);
        $multiSelect->value(array(
            array('name' => 'John Doe', 'age' => 32),
            array('name' => 'Jane Doe', 'age' => 29)
        ));
        ?>

## Event Handling

You can subscribe to all MultiSelect [events](/api/javascript/ui/autocomplete#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $multiSelect = new \Kendo\UI\MultiSelect('multiselect');

        // The 'multiselect_change' JavaScript function will handle the 'change' event of the multiselect
        $multiSelect->change('multiselect_change');

        echo $multiSelect->render();
        ?>
        <script>
        function multiselect_change() {
            // Handle the change event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

        <?php
        $multiSelect = new \Kendo\UI\MultiSelect('multiselect');

        // Provide inline JavaScript code that will handle the 'change' event of the multiselect
        $multiSelect->change('function() { /* Handle the change event */ }');

        echo $multiSelect->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You can reference the client-side Kendo UI MultiSelect instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [MultiSelect API](/api/javascript/ui/multiselect#methods) to control its behavior.

###### Example

        <?php
        $multiSelect = new \Kendo\UI\MultiSelect('multiselect');
        echo $multiSelect->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the multiselect
            var multiselect = $("#multiselect").data("kendoMultiSelect")
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the MultiSelect:

* [Local Binding of the MultiSelect PHP Class]({% slug localbinding_multiselect_uiforphp %})
* [Remote Binding of the MultiSelect PHP Class]({% slug remotebinding_multiselect_uiforphp %})
* [Overview of the Kendo UI MultiSelect Widget]({% slug overview_kendoui_multiselect_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
