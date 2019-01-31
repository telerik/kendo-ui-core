---
title: Overview
page_title: Overview | MultiColumnComboBox PHP Class
description: "Get started with the MultiColumnComboBox PHP class in Kendo UI."
slug: overview_multicolumncombobox_uiforphp
position: 1
---

# MultiColumnComboBox PHP Class Overview

The Kendo UI MultiColumnComboBox for PHP is a server-side wrapper for the [Kendo UI MultiColumnComboBox](/api/javascript/ui/multicolumncombobox) widget.

## Getting Started

### The Basics

To bind a Kendo UI MultiColumnComboBox for PHP, use either of the following approaches:

* [Locally]({% slug localbinding_multicolumncombobox_uiforphp %})&mdash;Local binding binds the MultiColumnComboBox to a PHP array.
* [Remotely]({% slug remotebinding_multicolumncombobox_uiforphp %})&mdash;During remote binding the MultiColumnComboBox makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI MultiColumnComboBox for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the MultiColumnComboBox will be bound.

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

**Step 4** Create an [MultiColumnComboBox](/api/php/Kendo/UI/MultiColumnComboBox), configure its [`dataTextField`](/api/php/Kendo/UI/MultiColumnComboBox#datatextfield) [`dataValueField`](/api/php/Kendo/UI/MultiColumnComboBox#datavaluefield) options and set its [`DataSource`](/api/php/Kendo/UI/AutoComplete#datasource).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);

        $comboBox = new \Kendo\UI\MultiColumnComboBox('MultiColumnComboBox');
        $comboBox->dataSource($dataSource);
        $comboBox->dataTextField('name');
        $comboBox->dataValueField('age');
        ?>

**Step 5** Output the MultiColumnComboBox by echoing the result of the `render` method.

###### Example

        <?php
        echo $comboBox->render();
        ?>

## Event Handling

You can subscribe to all MultiColumnComboBox [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $comboBox = new \Kendo\UI\MultiColumnComboBox('multicolumncombobox');

        // The 'multicolumncombobox_change' JavaScript function will handle the 'change' event of the multicolumncombobox
        $comboBox->change('multicolumncombobox_change');

        echo $comboBox->render();
        ?>
        <script>
        function multicolumncombobox_change() {
            // Handle the change event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

        <?php
        $comboBox = new \Kendo\UI\MultiColumnComboBox('multicolumncombobox');

        // Provide inline JavaScript code that will handle the 'change' event of the multicolumncombobox
        $comboBox->change('function() { /* Handle the change event */ }');

        echo $comboBox->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You can reference the client-side Kendo UI MultiColumnComboBox instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [MultiColumnComboBox API](/api/javascript/ui/multicolumncombobox#methods) to control its behavior.

###### Example

        <?php
        $comboBox = new \Kendo\UI\MultiColumnComboBox('multicolumncombobox');
        echo $comboBox->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the multicolumncombobox
            var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox")
        });
        </script>

## See Also

* [Local Binding of the MultiColumnComboBox PHP Class]({% slug localbinding_multicolumncombobox_uiforphp %})
* [Remote Binding of the MultiColumnComboBox PHP Class]({% slug remotebinding_multicolumncombobox_uiforphp %})
* [Overview of the Kendo UI MultiColumnComboBox Widget]({% slug overview_kendoui_multicolumncombobox_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
