---
title: Local Binding
page_title: Local Binding | ComboBox PHP Class
description: "Bind Kendo UI ComboBox PHP class to an array of data."
slug: localbinding_combobox_uiforphp
position: 2
---

# Local Binding

This article shows how to bind Kendo UI ComboBox for PHP to a PHP [array](http://php.net/manual/en/language.types.array.php). Local binding means that filtering operation happens on the client side.

## Approaches

This PHP array can be populated from a database or declared inline (in the page).

### Bind to PDO-Returned Arrays

[PHP Data Objects (PDO)](http://www.php.net/manual/en/intro.pdo.php) is an interface for accessing various databases in PHP.

Below are listed the steps for you to follow when binding the Kendo UI AutoComplete for PHP to an array returned by PDO.

> **Important**
>
> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP demos (`/wrappers/php/sample.db`).

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Retrieve all records from the **Products** table.

###### Example

        <?php
        $statement = $db->prepare('SELECT * FROM Products');
        $products = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>

**Step 4** Create a [`dataSource`](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data) and [`schema`](/api/php/Kendo/Data/DataSource#schema). Setting the schema is required to specify the model fields. These fields are required for filtering.

###### Example

        <?php
        // Create the schema model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        // Create a field for the 'ProductName' column of the 'Products' table
        $productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
        $productNameField->type('string');

        // Create a field for the 'ProductID' column of the 'Products' table
        $productIDField = new \Kendo\Data\DataSourceSchemaModelField('ProductID');
        $productIDField->type('number');

        $model->addField($productNameField, $productIDField);

        // Create the schema
        $schema = new \Kendo\Data\DataSourceSchema();

        // Set its model
        $schema->model($model)

        // Create the data source
        $dataSource = new \Kendo\Data\DataSource();

        // Specify the schema and data
        $dataSource->data($products)
                   ->schema($schema);
        ?>

**Step 5** Create a [ComboBox](/api/php/Kendo/UI/ComboBox), configure its [`dataTextField`](/api/php/Kendo/UI/ComboBox#datatextfield) and [`dataValueField`](/api/php/Kendo/UI/ComboBox#datavaluefield) options and set its [`dataSource`](/api/php/Kendo/UI/ComboBox#datasource).

###### Example

        <?php
        $comboBox = new \Kendo\UI\ComboBox('ComboBox');
        $comboBox->dataSource($dataSource);
        $comboBox->dataTextField('ProductName');
        $comboBox->dataValueField('ProductID');
        ?>

**Step 6** Output the ComboBox by echoing the result of the `render` method.

###### Example

        <?php
        echo $comboBox->render();
        ?>

### Use DataSourceResult Helpers

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations. It is distributed with the Telerik UI for PHP demos and can be found in the `/wrappers/php/lib/` directory of the Telerik UI for PHP distribution.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Copy `/wrappers/php/lib/DataSourceResult.php` to your web site root and include it.

###### Example

        <?php require_once 'lib/DataSourceResult.php'; ?>

**Step 3** Create a new instance of the `DataSourceResult` and use its `read` method to retrieve data from the database.

###### Example

        <?php
        // The constructor accepts the PDO DSN for the target database
        $result = new DataSourceResult('sqlite:../sample.db');

        // The 'read' method accepts table name and array of columns to select.
        $data = $result->read('Products', array('ProductName'));
        // The result of the 'read' method is an array with two elements 'data' and 'total'.
        ?>

**Step 4** Configure a `dataSource` and `schema`.

###### Example

        <?php
        // Create the schema model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        // Create a field for the 'ProductName' column of the 'Products' table
        $productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
        $productNameField->type('string');

        // Create a field for the 'ProductID' column of the 'Products' table
        $productIDField = new \Kendo\Data\DataSourceSchemaModelField('ProductID');
        $productIDField->type('number');

        $model->addField($productNameField, $productIDField);

        // Create the schema
        $schema = new \Kendo\Data\DataSourceSchema();

        // Set its model and describe the data format.
        $schema->model($model)
               ->data('data')
               ->total('total');

        // Create the data source
        $dataSource = new \Kendo\Data\DataSource();

        // Specify the schema and data
        $dataSource->data($data)
                   ->schema($schema);
        ?>

**Step 5** Create an ComboBox, configure its `dataTextField` and `dataValueField`, and set its data source.

###### Example

        <?php
        $comboBox = new \Kendo\UI\ComboBox('ComboBox');
        $comboBox->dataSource($dataSource);
        $comboBox->dataTextField('ProductName');
        $comboBox->dataValueField('ProductID');
        ?>

**Step 6** Output the ComboBox by echoing the result of the `render` method.

###### Example

        <?php
        echo $comboBox->render();
        ?>

## See Also

Other articles on Telerik UI for PHP and on the ComboBox:

* [Overview of the ComboBox PHP Class]({% slug overview_combobox_uiforphp %})
* [Remote Binding of the ComboBox PHP Class]({% slug remotebinding_combobox_uiforphp %})
* [Overview of the Kendo UI ComboBox Widget]({% slug overview_kendoui_combobox_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
