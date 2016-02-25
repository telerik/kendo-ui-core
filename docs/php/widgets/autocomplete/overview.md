---
title: Overview
page_title: Overview | AutoComplete PHP Class
description: "Get started with the AutoComplete PHP class in Kendo UI."
slug: overview_autocomplete_uiforphp
position: 1
---

# AutoComplete PHP Class Overview

The Kendo UI AutoComplete for PHP is a server-side wrapper for the [Kendo UI AutoComplete](/api/javascript/ui/autocomplete) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI AutoComplete for PHP:

* [Locally]({% slug localbinding_autocomplete_uiforphp %})&mdash;Local binding binds the AutoComplete to a PHP array.
* [Remotely]({% slug remotebinding_autocomplete_uiforphp %})&mdash;During remote binding the AutoComplete makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the AutoComplete will be bound.

###### Example

    <?php
    $data = array(
        array('name' => 'John Doe', 'age' => 32),
        array('name' => 'Jane Doe', 'age' => 29)
    );
    ?>

**Step 3** Create a [data source](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data).

###### Example

    <?php
    $dataSource = new \Kendo\Data\DataSource();
    $dataSource->data($data);
    ?>

**Step 4** Create an [AutoComplete](/api/php/Kendo/UI/AutoComplete), configure its [`dataTextField`](/api/php/Kendo/UI/AutoComplete#datatextfield) option and set its [`DataSource`](/api/php/Kendo/UI/AutoComplete#datasource).

###### Example

    <?php
    $dataSource = new \Kendo\Data\DataSource();
    $dataSource->data($data);

    $autoComplete = new \Kendo\UI\AutoComplete('AutoComplete');
    $autoComplete->dataSource($dataSource);
    $autoComplete->dataTextField('name');
    ?>

**Step 5** Output the AutoComplete by echoing the result of the `render` method.

###### Example

    <?php
    echo $autoComplete->render();
    ?>

## Event Handling

You can subscribe to all AutoComplete [events](/api/javascript/ui/autocomplete#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

    <?php
    $autoComplete = new \Kendo\UI\AutoComplete('autocomplete');

    // The 'autocomplete_change' JavaScript function will handle the 'change' event of the autocomplete
    $autoComplete->change('autocomplete_change');

    echo $autoComplete->render();
    ?>
    <script>
    function autocomplete_change() {
        // Handle the change event
    }
    </script>

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

    <?php
    $autoComplete = new \Kendo\UI\AutoComplete('autocomplete');

    // Provide inline JavaScript code that will handle the 'change' event of the autocomplete
    $autoComplete->change('function() { /* Handle the change event */ }');

    echo $autoComplete->render();
    ?>

<!--*-->
## Reference

### Client-Side Instances

You can reference the client-side Kendo UI AutoComplete instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [AutoComplete API](/api/javascript/ui/autocomplete#methods) to control its behavior.

###### Example

    <?php
    $autoComplete = new \Kendo\UI\AutoComplete('autocomplete');
    echo $autoComplete->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the autocomplete
        var autocomplete = $("#autocomplete").data("kendoAutoComplete")
    });
    </script>

## See Also

Other articles on Telerik UI for PHP and on the AutoComplete:

* [Local Binding of the AutoComplete PHP Class]({% slug localbinding_autocomplete_uiforphp %})
* [Remote Binding of the AutoComplete PHP Class]({% slug remotebinding_autocomplete_uiforphp %})
* [Overview of the Kendo UI AutoComplete Widget]({% slug overview_kendoui_autocomplete_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
