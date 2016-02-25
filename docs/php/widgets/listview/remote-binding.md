---
title: Remote Binding
page_title: Remote Binding | ListView PHP Class
description: "Bind Kendo UI ListView PHP class to JSON."
slug: remotebinding_listview_uiforphp
position: 3
---

# Remote Binding

This article shows how to bind Kendo UI ListView for PHP to a JSON response. Remote binding means that all data operations&mdash;paging, sorting, filtering, etc.&mdash;happen on the server side.

## Bind to PDO-Returned Arrays

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ListView for PHP for remote binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [`DataSource`](/api/php/Kendo/Data/DataSource) and configure it.

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

**Step 3** Create a ListView, configure its `template` and set its `dataSource`.

###### Example

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
			 ->pageable(true)
             ->dataSource($dataSource);

        ?>

**Step 4** Output the ListView by echoing the result of the `render` method.

###### Example

        <?php
        echo $listview->render();
        ?>

### JSON-Returning File Creation

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
		$statement->execute();
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

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations. The `DataSourceResult` can also perform paging, sorting, filtering, grouping and aggregate calculations on the server side by generating SQL executed via PDO. It is distributed with the Telerik UI for PHP demos and can be found in the `/wrappers/php/lib/` directory of the Telerik UI for PHP distribution.

> **Important**
>
> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP demos (`/wrappers/php/sample.db`).

First, configure a Kendo UI ListView for PHP binding and then implement the remote service which will return JSON.

### Configuration (DataSourceResult)

Below are listed the steps for you to follow when configuring the Grid for remote binding, using `DataSourceResult`.

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
                   ->serverPaging(true);
        ?>

**Step 3** Create a ListView, configure its `template` and set its `dataSource`.

###### Example

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
			 ->pageable(true)
             ->dataSource($dataSource);

        ?>

**Step 4** Output the ListView by echoing the result of the `render` method.

###### Example

        <?php
        echo $listview->render();
        ?>

### JSON-Returning File Creation (DataSourceResult)

**Step 1** Create a new PHP file called `products.php`. This file will return data in JSON format. The data source is configured to request it via the [`url`](/api/php/Kendo/Data/DataSourceTransportRead#url) setting.

**Step 2** Copy `/wrappers/php/lib/DataSourceResult.php` to your web site root and include it.

###### Example

        <?php require_once 'lib/DataSourceResult.php'; ?>

**Step 3** Read the request body and parse it as JSON. In the previous example, the Kendo UI DataSource is configured to submit its parameters as JSON via the [`parameterMap`](/api/php/Kendo/Data/DataSourceTransport#parametermap).

###### Example

        <?php
        $request = json_decode(file_get_contents('php://input'));
        ?>

**Step 4** Create a new instance of the `DataSourceResult` class and call its `read` method.

###### Example

        <?php
        $result = new DataSourceResult('sqlite:../sample.db');

        // The 'read' method accepts table name, array of columns to select and request parameters as array
        $data = $result->read('Products', array('ProductName', 'UnitPrice', 'UnitsInStock'), $request));
        ?>

**Step 5** Return the result of the `read` method as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');
        // Return JSON

        echo json_encode($data);
        ?>

##  See Also

Other articles on Telerik UI for PHP and on the ListView:

* [Overview of the ListView PHP Class]({% slug overview_listview_uiforphp %})
* [Local Binding of the ListView PHP Class]({% slug localbinding_listview_uiforphp %})
* [Editing of the ListView PHP Class]({% slug editing_listview_uiforphp %})
* [Overview of the Kendo UI ListView Widget]({% slug overview_kendoui_listview_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
