---
title: Overview
page_title: Overview | ComboBox PHP Class
description: "Get started with the ComboBox PHP class in Kendo UI."
slug: overview_combobox_uiforphp
position: 1
---

# ComboBox PHP Class Overview

The Kendo UI ComboBox for PHP is a server-side wrapper for the [Kendo UI ComboBox](/api/javascript/ui/combobox) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI ComboBox for PHP:

* [Locally]({% slug localbinding_combobox_uiforphp %})&mdash;Local binding binds the ComboBox to a PHP array.
* [Remotely]({% slug remotebinding_combobox_uiforphp %})&mdash;During remote binding the ComboBox makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ComboBox for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the ComboBox will be bound.

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

**Step 4** Create an [ComboBox](/api/php/Kendo/UI/ComboBox), configure its [`dataTextField`](/api/php/Kendo/UI/ComboBox#datatextfield) [`dataValueField`](/api/php/Kendo/UI/ComboBox#datavaluefield) options and set its [`DataSource`](/api/php/Kendo/UI/AutoComplete#datasource).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);

        $comboBox = new \Kendo\UI\ComboBox('ComboBox');
        $comboBox->dataSource($dataSource);
        $comboBox->dataTextField('name');
        $comboBox->dataValueField('age');
        ?>

**Step 5** Output the ComboBox by echoing the result of the `render` method.

###### Example

        <?php
        echo $comboBox->render();
        ?>

## Event Handling

You can subscribe to all ComboBox [events](/api/web/combobox#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $comboBox = new \Kendo\UI\ComboBox('combobox');

        // The 'combobox_change' JavaScript function will handle the 'change' event of the combobox
        $comboBox->change('combobox_change');

        echo $comboBox->render();
        ?>
        <script>
        function combobox_change() {
            // Handle the change event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

        <?php
        $comboBox = new \Kendo\UI\ComboBox('combobox');

        // Provide inline JavaScript code that will handle the 'change' event of the combobox
        $comboBox->change('function() { /* Handle the change event */ }');

        echo $comboBox->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You can reference the client-side Kendo UI ComboBox instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [ComboBox API](/api/javascript/ui/combobox#methods) to control its behavior.

###### Example

        <?php
        $comboBox = new \Kendo\UI\ComboBox('combobox');
        echo $comboBox->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the combobox
            var combobox = $("#combobox").data("kendoComboBox")
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the ComboBox:

* [Local Binding of the ComboBox PHP Class]({% slug localbinding_combobox_uiforphp %})
* [Remote Binding of the ComboBox PHP Class]({% slug remotebinding_combobox_uiforphp %})
* [Overview of the Kendo UI ComboBox Widget]({% slug overview_kendoui_combobox_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
