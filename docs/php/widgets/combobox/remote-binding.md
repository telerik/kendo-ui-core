---
title: Remote Binding
page_title: Remote Binding | ComboBox PHP Class
description: "Bind Kendo UI ComboBox PHP class to JSON."
slug: remotebinding_combobox_uiforphp
position: 3
---

# Remote Binding

This article shows how to bind Kendo UI ComboBox for PHP to a JSON response. Remote binding means that filter operations happen on the server side.

## Bind to PDO-Returned Arrays

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ComboBox for PHP for remote binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a data source and configure it.

###### Example

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

        $productIDField = new \Kendo\Data\DataSourceSchemaModelField('ProductID');
        $productIDField->type('number');

        $model->addField($productNameField, $productIDField);
        $schema = new \Kendo\Data\DataSourceSchema();

        $schema->model($model);

        $dataSource = new \Kendo\Data\DataSource();

        // Configure data source
        $dataSource->transport($transport)
                   ->schema($schema);
        ?>

**Step 3** Create a ComboBox, configure its `dataTextField` option and set its data source.

###### Example

        <?php
        $comboBox = new \Kendo\UI\ComboBox('ComboBox');
        $comboBox->dataSource($dataSource);
        $comboBox->dataTextField('ProductName');
        $comboBox->dataValueField('ProductID');
        ?>

**Step 4** Output the ComboBox by echoing the result of the `render` method.

###### Example

        <?php
        echo $comboBox->render();
        ?>

### JSON-Returning File Creation

Below are listed the steps for you to follow when creating a PHP file which returns JSON.

**Step 1** Create a new PHP file called `products.php`. This file will return data in JSON format. The data source is configured to request it via the [`url`](/api/php/Kendo/Data/DataSourceTransportRead#url) setting.

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

**Step 4** Return the records as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');
        // Return JSON

        echo json_encode($products);
        ?>

## Use DataSourceResult Helpers

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations. The `DataSourceResult` can also perform paging sorting, filtering, grouping and aggregate calculation on the server side by generating SQL executed via PDO. It is distributed with the Telerik UI for PHP demos and can be found in the `/wrappers/php/lib/` directory of the Telerik UI for PHP distribution.

> **Important**
>
> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP** demos (`/wrappers/php/sample.db`).

First, configure a Kendo UI ComboBox for PHP binding and then implement the remote service which will return JSON.

### Configuration (DataSourceResult)

Below are listed the steps for you to follow when configuring the AutoComplete for remote binding, using `DataSourceResult`.

**Step 1** Follow the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript and CSS files.

**Step 2** Create a data source and configure it.

###### Example

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

        $productIDField = new \Kendo\Data\DataSourceSchemaModelField('ProductID');
        $productIDField->type('number');

        $model->addField($productNameField, $productIDField);

        $schema = new \Kendo\Data\DataSourceSchema();
        // Configure the schema to accept the format returned by DataSourceResult
        $schema->model($model)
               ->data('data')
               ->errors('errors')
               ->total('total');

        $dataSource = new \Kendo\Data\DataSource();

        // Configure data source and enable server filtering operation.
        $dataSource->transport($transport)
                   ->schema($schema)
                   ->serverFiltering(true);
        ?>

**Step 3** Create a ComboBox, configure its `dataTextField` option and set its `dataSource`.

###### Example

        <?php
        $comboBox = new \Kendo\UI\ComboBox('ComboBox');
        $comboBox->dataSource($dataSource);
        $comboBox->dataTextField('ProductName');
        $comboBox->dataValueField('ProductID');
        ?>

**Step 4** Output the ComboBox by echoing the result of the `render` method.

###### Example

        <?php
        echo $comboBox->render();
        ?>

### JSON-Returning File Creation (DataSourceResult)

Below are listed the steps for you to follow when creating a PHP file which returns JSON, using DataSourceResult.

**Step 1** Create a new PHP file called `products.php`. This file will return data in JSON format. The data source is configured to request it via the [`url`](/api/php/Kendo/Data/DataSourceTransportRead#url) setting.

**Step 2** Copy `/wrappers/php/lib/DataSourceResult.php` to your web site root and include it.

###### Example

        <?php require_once 'lib/DataSourceResult.php'; ?>

**Step 3** Read the request body and parse it as JSON. In the previous example you configured the Kendo UI DataSource to submit its parameters as JSON via the [`parameterMap`](/api/php/Kendo/Data/DataSourceTransport#parametermap).

###### Example

        <?php
        $request = json_decode(file_get_contents('php://input'));
        ?>

**Step 4** Create a new instance of the `DataSourceResult` class and call its `read` method.

###### Example

        <?php
        $result = new DataSourceResult('sqlite:../sample.db');

        // The 'read' method accepts table name, array of columns to select and request parameters as array
        $data = $result->read('Products', array('ProductID', 'ProductName'), $request));
        ?>

**Step 5** Return the result of the `read` method as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');
        // Return JSON

        echo json_encode($data);
        ?>

## See Also

Other articles on Telerik UI for PHP and on the ComboBox:

* [Overview of the ComboBox PHP Class]({% slug overview_combobox_uiforphp %})
* [Local Binding of the ComboBox PHP Class]({% slug localbinding_combobox_uiforphp %})
* [Overview of the Kendo UI ComboBox Widget]({% slug overview_kendoui_combobox_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
