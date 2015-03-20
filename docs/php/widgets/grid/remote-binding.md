---
title: Remote binding
page_title: How to bind Kendo Grid for PHP to remote service which returns JSON
description: Learn how to bind Kendo UI Grid for PHP to JSON
---
# Remote Binding

This help topic shows how to bind Kendo Grid for PHP to JSON response. Remote binding means that all data operations (paging, sorting, filtering etc.)
will happen on the server-side.

> The following demos are using the sample SQLite database shipped with the Telerik UI for PHP** demos (**/wrappers/php/sample.db).

## Binding to array returned by PDO

### Configure Grid for Remote Binding

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a data source and configure it:

        <?php
        $transport = new \Kendo\Data\DataSourceTransport();

        $read = new \Kendo\Data\DataSourceTransportRead();

        // Specify the url of the PHP page which will act as the remote service
        $read->url('products.php')
             ->type('POST');

        $transport->read($read);

        // Configure the model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        $productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
        $productNameField->type('string');

        $unitPriceField = new \Kendo\Data\DataSourceSchemaModelField('UnitPrice');
        $unitPriceField->type('number');

        $unitsInStockField = new \Kendo\Data\DataSourceSchemaModelField('UnitsInStock');
        $unitsInStockField->type('number');

        $model->addField($productNameField)
              ->addField($unitPriceField)
              ->addField($unitsInStockField);

        $schema = new \Kendo\Data\DataSourceSchema();

        $schema->model($model);

        $dataSource = new \Kendo\Data\DataSource();

        // Configure data source
        $dataSource->transport($transport)
                   ->schema($schema);
        ?>
1. Create a grid, configure its columns and set its data source.

        <?php
        $grid = new \Kendo\UI\Grid('grid');

        $productNameColumn = new \Kendo\UI\GridColumn();
        $productNameColumn->field('ProductName');

        $unitPriceColumn = new \Kendo\UI\GridColumn();
        $unitPriceColumn->field('UnitPrice');

        $discontinuedColumn = new \Kendo\UI\GridColumn();
        $discontinuedColumn->field('Discontinued');

        // Configure columns, enable paging, filtering, sorting and grouping
        $grid->addColumn($productNameColumn, $unitPriceColumn, $discontinuedColumn)
             ->filterable(true)
             ->sortable(true)
             ->pageable(true)
             ->groupable(true);
        ?>
1. Output the grid by echo-ing the result of the render method.

        <?php
        echo $grid->render();
        ?>

### Create PHP file which returns JSON

1. Create a new php file called **products.php**. This file will return data in JSON format. The data source is configured to request it via the [url](/api/wrappers/php/Kendo/Data/DataSourceTransportRead#url) setting.
1. Create a PDO connection

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>
1. Retrieve all records from the `Products` table

        <?php
        $statement = $db->prepare('SELECT * FROM Products');
        $statement->execute();
        $products = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>
1. Return the records as JSON

        <?php
        // Set response content type
        header('Content-Type: application/json');
        // Return JSON

        echo json_encode($products);
        ?>

## Binding using the DataSourceResult Helper

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations.
The DataSourceResult can also perform paging, sorting, filtering, grouping and aggregate calculation on the server side by generating SQL executed via PDO.
It is distributed with the Telerik UI for PHP** demos and can be found in the **/wrappers/php/lib/** directory of the **Telerik UI for PHP distribution.

First we will configure a Kendo Grid for PHP binding and then we will implement the remote service which will return JSON.

### Configure Grid for Remote Binding (using DataSourceResult)

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a data source and configure it:

        <?php
        $transport = new \Kendo\Data\DataSourceTransport();

        $read = new \Kendo\Data\DataSourceTransportRead();

        // Specify the url of the PHP page which will act as the remote service
        $read->url('products.php')
             ->contentType('application/json')
             ->type('POST');

        // Configure the transport to send the data source parameters as JSON.
        // This is required by the DataSourceResult helper.
        $transport->read($read)
                  ->parameterMap('function(data) {
                      return kendo.stringify(data);
                  }');

        // Configure the model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        $productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
        $productNameField->type('string');

        $unitPriceField = new \Kendo\Data\DataSourceSchemaModelField('UnitPrice');
        $unitPriceField->type('number');

        $unitsInStockField = new \Kendo\Data\DataSourceSchemaModelField('UnitsInStock');
        $unitsInStockField->type('number');

        $model->addField($productNameField)
              ->addField($unitPriceField)
              ->addField($unitsInStockField);

        $schema = new \Kendo\Data\DataSourceSchema();
        // Configure the schema to accept the format returned by DataSourceResult
        $schema->model($model)
               ->data('data')
               ->errors('errors')
               ->groups('groups')
               ->aggregates('aggregates')
               ->total('total');

        $dataSource = new \Kendo\Data\DataSource();

        // Configure data source and enable server operations - paging, sorting etc.
        $dataSource->transport($transport)
                   ->pageSize(10)
                   ->schema($schema)
                   ->serverFiltering(true)
                   ->serverSorting(true)
                   ->serverGrouping(true)
                   ->serverPaging(true);
        ?>
1. Create a grid, configure its columns and set its data source.

        <?php
        $grid = new \Kendo\UI\Grid('grid');

        $productNameColumn = new \Kendo\UI\GridColumn();
        $productNameColumn->field('ProductName');

        $unitPriceColumn = new \Kendo\UI\GridColumn();
        $unitPriceColumn->field('UnitPrice');

        $discontinuedColumn = new \Kendo\UI\GridColumn();
        $discontinuedColumn->field('Discontinued');

        // Configure columns, enable paging, filtering, sorting and grouping
        $grid->addColumn($productNameColumn, $unitPriceColumn, $discontinuedColumn)
             ->filterable(true)
             ->sortable(true)
             ->pageable(true)
             ->groupable(true);
        ?>
1. Output the grid by echo-ing the result of the render method.

        <?php
        echo $grid->render();
        ?>

### Create PHP file which returns JSON (using DataSourceResult)

1. Create a new php file called **products.php**. This file will return data in JSON format. The data source is configured to request it via the [url](/api/wrappers/php/Kendo/Data/DataSourceTransportRead#url) setting.
1. Copy **/wrappers/php/lib/DataSourceResult.php** to your web site root and include it.

        <?php require_once 'lib/DataSourceResult.php'; ?>
1. Read the request body and parse it as JSON. In the previous example we configured the Kendo DataSource to submit its parameters as JSON via the [parameterMap](/api/wrappers/php/Kendo/Data/DataSourceTransport#parametermap).

        <?php
        $request = json_decode(file_get_contents('php://input'));
        ?>
1. Create a new instance of the `DataSourceResult` class and call its read method.

        <?php
        $result = new DataSourceResult('sqlite:../sample.db');

        // The 'read' method accepts table name, array of columns to select and request parameters as array
        $data = $result->read('Products', array('ProductName', 'UnitPrice', 'UnitsInStock'), $request));
        ?>
1. Return the result of the `read` method as JSON

        <?php
        // Set response content type
        header('Content-Type: application/json');

        // Return JSON
        echo json_encode($data);
        ?>
