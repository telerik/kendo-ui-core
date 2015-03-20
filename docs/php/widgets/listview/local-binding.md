---
title: Local binding
page_title: How to bind Kendo ListView for PHP to PHP array
description: Learn how to bind Kendo UI ListView for PHP to array of data
---

# Local Binding to Array

This help topic shows how to bind Kendo ListView for PHP to a PHP [array](http://php.net/manual/en/language.types.array.php). This array
can be populated from a data base or declared inline (in the page). Local binding means that all data operations (paging, sorting, filtering etc.)
will happen on the client-side.

## Binding to array returned by PDO

PHP Data Objects ([PDO](http://www.php.net/manual/en/intro.pdo.php)) is an interface for accessing various databases in PHP. Here is how to bind Kendo ListView to array
returned by PDO.

> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP** demos (**/wrappers/php/sample.db).

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create a PDO connection

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

3. Retrieve all records from the `Products` table

        <?php
        $statement = $db->prepare('SELECT * FROM Products');
		$statement->execute();
        $products = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>

4. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data) and [schema](/api/wrappers/php/Kendo/Data/DataSource#schema). Setting the schema is required
to specify the model fields. Those fields are required for filtering and editing.

        <?php
        // Create the schema model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        // Create a field for the 'ProductName' column of the 'Products' table
        $productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
        $productNameField->type('string');

        // Create a field for the 'UnitPrice' column of the 'Products' table
        $unitPriceField = new \Kendo\Data\DataSourceSchemaModelField('UnitPrice');
        $unitPriceField->type('number');

        // Create a field for the 'Discontinued' column of the 'Products' table
        $discontinuedField = new \Kendo\Data\DataSourceSchemaModelField('Discontinued');
        $discontinuedField->type('boolean');

        $model->addField($productNameField, $unitPriceField, $discontinuedField);

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
5. Create a [listview](/api/wrappers/php/Kendo/UI/ListView), configure its [template](/api/wrappers/php/Kendo/UI/ListView#template) and set its [data source](/api/wrappers/php/Kendo/UI/ListView#datasource).

		<script type="text/x-kendo-tmpl" id="template">
    		<div class="product">
        		<img src="../../content/web/foods/#:ProductID#.jpg" alt="#:ProductName# image" />
        		<h3>#:ProductName#</h3>
        		<p>#:kendo.toString(UnitPrice, "c")#</p>
    		</div>
		</script>

        <?php
        $listview = new \Kendo\UI\ListView('listview');

        $listview->templateId('template')
             ->dataSource($dataSource);
        
        ?>
6. Output the listview by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $listview->render();
        ?>

## Using the DataSourceResult Helper

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations.
It is distributed with the Telerik UI for PHP** demos and can be found in the **/wrappers/php/lib/** directory of the **Telerik UI for PHP distribution.

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Copy **/wrappers/php/lib/DataSourceResult.php** to your web site root and include it.

        <?php require_once 'lib/DataSourceResult.php'; ?>
3. Create a new instance of the DataSourceResult and use its read method to retrieve data from the database.

        <?php
        // The constructor accepts the PDO DSN for the target database
        $result = new DataSourceResult('sqlite:../sample.db');

        // The 'read' method accepts table name and array of columns to select.
        $data = $result->read('Products', array('ProductName', 'UnitPrice', 'Discontinued'));
        // The result of the 'read' method is an array with two elements 'data' and 'total'.
        ?>
4. Configure a data source and schema.

        <?php
        // Create the schema model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        // Create a field for the 'ProductName' column of the 'Products' table
        $productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
        $productNameField->type('string');

        // Create a field for the 'UnitPrice' column of the 'Products' table
        $unitPriceField = new \Kendo\Data\DataSourceSchemaModelField('UnitPrice');
        $unitPriceField->type('number');

        // Create a field for the 'Discontinued' column of the 'Products' table
        $discontinuedField = new \Kendo\Data\DataSourceSchemaModelField('Discontinued');
        $discontinuedField->type('boolean');

        $model->addField($productNameField, $unitPriceField, $discontinuedField);

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
5. Create a listview, configure its template and set its data source.

        <script type="text/x-kendo-tmpl" id="template">
    		<div class="product">
        		<img src="../../content/web/foods/#:ProductID#.jpg" alt="#:ProductName# image" />
        		<h3>#:ProductName#</h3>
        		<p>#:kendo.toString(UnitPrice, "c")#</p>
    		</div>
		</script>

        <?php
        $listview = new \Kendo\UI\ListView('listview');

        $listview->templateId('template')
             ->dataSource($dataSource);
        
        ?>
6. Output the listview by echo-ing the result of the render method.

        <?php
        echo $listview->render();
        ?>
