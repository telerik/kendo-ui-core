---
title: Local binding
page_title: How to bind Kendo ComboBox for PHP to PHP array
description: Learn how to bind Kendo UI ComboBox for PHP to array of data
---

# Local Binding to Array

This help topic shows how to bind Kendo ComboBox for PHP to a PHP [array](http://php.net/manual/en/language.types.array.php). This array
can be populated from a data base or declared inline (in the page). Local binding means that filtering operation will happen on the client-side.

## Binding to array returned by PDO

PHP Data Objects ([PDO](http://www.php.net/manual/en/intro.pdo.php)) is an interface for accessing various databases in PHP. Here is how to bind Kendo ComboBox to array
returned by PDO.

> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP** demos (**/wrappers/php/sample.db).

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a PDO connection

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>
1. Retrieve all records from the `Products` table

        <?php
        $statement = $db->prepare('SELECT * FROM Products');
        $products = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>
1. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data) and [schema](/api/wrappers/php/Kendo/Data/DataSource#schema). Setting the schema is required
to specify the model fields. Those fields are required for filtering.

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
4. Create a [combobox](/api/wrappers/php/Kendo/UI/ComboBox), configure its [dataTextField](/api/wrappers/php/Kendo/UI/ComboBox#datatextfield) and
[dataValueField](/api/wrappers/php/Kendo/UI/ComboBox#datavaluefield) options and set its [data source](/api/wrappers/php/Kendo/UI/ComboBox#datasource).

        <?php
        $comboBox = new \Kendo\UI\ComboBox('ComboBox');
        $comboBox->dataSource($dataSource);
        $comboBox->dataTextField('ProductName');
        $comboBox->dataValueField('ProductID');
        ?>
5. Output the combobox by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $comboBox->render();
        ?>


## Using the DataSourceResult Helper

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations.
It is distributed with the Telerik UI for PHP** demos and can be found in the **/wrappers/php/lib/** directory of the **Telerik UI for PHP distribution.

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Copy **/wrappers/php/lib/DataSourceResult.php** to your web site root and include it.

        <?php require_once 'lib/DataSourceResult.php'; ?>
1. Create a new instance of the DataSourceResult and use its read method to retrieve data from the database.

        <?php
        // The constructor accepts the PDO DSN for the target database
        $result = new DataSourceResult('sqlite:../sample.db');

        // The 'read' method accepts table name and array of columns to select.
        $data = $result->read('Products', array('ProductName'));
        // The result of the 'read' method is an array with two elements 'data' and 'total'.
        ?>
1. Configure a data source and schema.

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
1. Create an combobox, configure its dataTextField, dataValueField and set its data source.

        <?php
        $comboBox = new \Kendo\UI\ComboBox('ComboBox');
        $comboBox->dataSource($dataSource);
        $comboBox->dataTextField('ProductName');
        $comboBox->dataValueField('ProductID');
        ?>
1. Output the combobox by echo-ing the result of the render method.

        <?php
        echo $comboBox->render();
        ?>
