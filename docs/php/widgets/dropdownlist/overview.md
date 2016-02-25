---
title: Overview
page_title: Overview | DropDownList PHP Class
description: "Get started with the DropDownList PHP class in Kendo UI."
slug: overview_dropdownlist_uiforphp
position: 1
---

# DropDownList PHP Class Overview

The Kendo UI DropDownList for PHP is a server-side wrapper for the [Kendo UI DropDownList](/api/javascript/ui/dropdownlist) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI DropDownList for PHP:

* [Locally]({% slug localbinding_autocomplete_uiforphp %})&mdash;Local binding binds the DropDownList to a PHP array.
* [Remotely]({% slug remotebinding_autocomplete_uiforphp %})&mdash;During remote binding the DropDownList makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DropDownList for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the DropDownList will be bound.

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

**Step 4** Create a [DropDownList](/api/php/Kendo/UI/DropDownList), configure its [`dataTextField`](/api/php/Kendo/UI/DropDownList#datatextfield) and
[`dataValueField`](/api/php/Kendo/UI/DropDownList#datavaluefield) options, and set its [`dataSource`](/api/php/Kendo/UI/DropDownList#datasource).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);

        $dropdownlist = new \Kendo\UI\DropDownList('DropDownList');
        $dropdownlist->dataSource($dataSource);
        $dropdownlist->dataTextField('name');
        $dropdownlist->dataValueField('age');
        ?>

**Step 5** Output the DropDownList by echoing the result of the `render` method.

###### Example

        <?php
        echo $dropdownlist->render();
        ?>

## Event Handling

You can subscribe to all DropDownList [events](/api/javascript/ui/dropdownlist#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $dropdownlist = new \Kendo\UI\DropDownList('dropdownlist');

        // The 'dropdownlist_change' JavaScript function will handle the 'change' event of the dropdownlist
        $dropdownlist->change('dropdownlist_change');

        echo $dropdownlist->render();
        ?>
        <script>
        function dropdownlist_change() {
            // Handle the change event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

        <?php
        $dropdownlist = new \Kendo\UI\DropDownList('dropdownlist');

        // Provide inline JavaScript code that will handle the 'change' event of the dropdownlist
        $dropdownlist->change('function() { /* Handle the change event */ }');

        echo $dropdownlist->render();
        ?>

<!--*-->
# Reference

### Client-Side Instances

You can reference the client-side Kendo UI DropDownList instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [DropDownList API](/api/javascript/ui/dropdownlist#methods) to control its behavior.

###### Example

        <?php
        $dropdownlist = new \Kendo\UI\DropDownList('dropdownlist');
        echo $dropdownlist->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the dropdownlist
            var dropdownlist = $("#dropdownlist").data("kendoDropDownList")
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the DropDownList:

* [Local Binding of the DropDownList PHP Class]({% slug localbinding_dropdownlist_uiforphp %})
* [Remote Binding of the DropDownList PHP Class]({% slug remotebinding_dropdownlist_uiforphp %})
* [Overview of the Kendo UI DropDownList Widget]({% slug overview_kendoui_dropdownlist_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
