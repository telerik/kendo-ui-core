---
title: Editing
page_title: How to perform CRUD with Kendo ListView for PHP
description: Learn how to do create, update and destroy with Kendo UI ListView for PHP
---

# Editing

This help topic shows how to persist the changes from create, update and destroy operations using Kendo UI ListView for PHP.


> The following demos are using the sample SQLite database shipped with the Telerik UI for PHP** demos (**/wrappers/php/sample.db).

## Editing with PDO

This demo shows how to use [PDO]() to perform create, update and destroy operations.

### Configure ListView for editing

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Define item template for listview:

		<!-- The following markup contains the `Add new record` button -->
		<div class="k-toolbar k-grid-toolbar">
		    <a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-add"></span>Add new record</a>
		</div>
		
		
		<!-- ListView item template -->
		<script id="list-view-template" type="text/x-kendo-template">
		    <div class="product-view">
		            <dl>
		                <dt>Product Name</dt>
		                <dd>${ProductName}</dd>
		                <dt>Unit Price</dt>
		                <dd>${kendo.toString(UnitPrice, "c")}</dd>
		                <dt>Units In Stock</dt>
		                <dd>${UnitsInStock}</dd>
		                <dt>Discontinued</dt>
		                <dd>${Discontinued}</dd>
		            </dl>
		            <div class="edit-buttons">
		                <a class="k-button k-button-icontext k-edit-button" href="\\#"><span class="k-icon k-edit"></span>Edit</a>
		                <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-delete"></span>Delete</a>
		            </div>
		        </div>
		</script>

	**Note:** Click events for elements with class name **k-edit-button** and **k-delete-button** will be automatically handled and treated by Kendo ListView as **edit** and **delete** actions.

1. Define edit template ofr listview:

		<script type="text/x-kendo-tmpl" id="editTemplate">
		<div class="product-view">
			<dl>
				<dt>Product Name</dt>
				<dd>
				    <input type="text" data-bind="value:ProductName" name="ProductName" required="required" validationMessage="required" />
				    <span data-for="ProductName" class="k-invalid-msg"></span>
				</dd>
				<dt>Unit Price</dt>
				<dd>
				    <input type="text" data-bind="value:UnitPrice" data-role="numerictextbox" data-type="number" name="UnitPrice" required="required" min="1" validationMessage="required" />
				    <span data-for="UnitPrice" class="k-invalid-msg"></span>
				</dd>
				<dt>Units In Stock</dt>
				<dd>
				    <input type="text" data-bind="value:UnitsInStock" data-role="numerictextbox" name="UnitsInStock" required="required" data-type="number" min="0" validationMessage="required" />
				    <span data-for="UnitsInStock" class="k-invalid-msg"></span>
				</dd>
				<dt>Discontinued</dt>
				<dd><input type="checkbox" name="Discontinued" data-bind="checked:Discontinued"></dd>
			</dl>
			<div class="edit-buttons">
				<a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-update"></span>Save</a>
				<a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span>Cancel</a>
			</div>
		</div>
		</script>

	**Note:** Click events for elements with class name **k-update-button** and **k-cancel-button** will be automatically handled and treated by Kendo ListView as **save** and **cancel** actions.
1. Create a data source and configure it:

        <?php
        $transport = new \Kendo\Data\DataSourceTransport();

        // Configure the remote service - a PHP file called 'products.php'
        // The query string parameter 'type' specifies the type of CRUD operation

        $create = new \Kendo\Data\DataSourceTransportCreate();

        $create->url('products.php?type=create')
               ->contentType('application/json')
               ->type('POST');

        $read = new \Kendo\Data\DataSourceTransportRead();

        $read->url('products.php?type=read')
             ->contentType('application/json')
             ->type('POST');

        $update = new \Kendo\Data\DataSourceTransportUpdate();

        $update->url('products.php?type=update')
               ->contentType('application/json')
               ->type('POST');

        $destroy = new \Kendo\Data\DataSourceTransportDestroy();

        $destroy->url('products.php?type=destroy')
                ->contentType('application/json')
                ->type('POST');

        // Configure the transport. Send all data source parameters as JSON using the parameterMap setting
        $transport->create($create)
                  ->read($read)
                  ->update($update)
                  ->destroy($destroy)
                  ->parameterMap('function(data) {
                      return kendo.stringify(data);
                  }');

        // Configure the model
        $model = new \Kendo\Data\DataSourceSchemaModel();

        $productIDField = new \Kendo\Data\DataSourceSchemaModelField('ProductID');
        $productIDField->type('number')
                       ->editable(false)
                       ->nullable(true);

        $productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
        $productNameField->type('string');     

        $unitPriceField = new \Kendo\Data\DataSourceSchemaModelField('UnitPrice');
        $unitPriceField->type('number');

        $unitsInStockField = new \Kendo\Data\DataSourceSchemaModelField('UnitsInStock');
        $unitsInStockField->type('number');

        $discontinuedField = new \Kendo\Data\DataSourceSchemaModelField('Discontinued');
        $discontinuedField->type('boolean');

        $model->id('ProductID')
              ->addField($productIDField)
              ->addField($productNameField)
              ->addField($unitPriceField)
              ->addField($unitsInStockField)
              ->addField($discontinuedField);

        $schema = new \Kendo\Data\DataSourceSchema();

        $schema->model($model);

        $dataSource = new \Kendo\Data\DataSource();

        // Configure data source - set transport, schema and enable batch mode
        $dataSource->transport($transport)
                   ->batch(true)
                   ->schema($schema);
        ?>
1. Create a listview, configure its templates and set its data source.

		<!-- The following markup contains the `Add new record` button -->
		<div class="k-toolbar k-grid-toolbar">
    		<a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-add"></span>Add new record</a>
		</div>

        <?php
        $listview = new \Kendo\UI\ListView('listView');
    	$listview->dataSource($dataSource)
	             ->templateId('template')
	             ->editTemplateId('editTemplate')
	             ->pageable(true);   
        ?>
1. Output the listview by echo-ing the result of the render method.

        <?php
        echo $listview->render();
        ?>

### Create PHP file which performs CRUD

1. Create a new php file called **products.php**. This file will peform CRUD operations.
1. Create a PDO connection

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>
1. Read the request body and parse it as JSON. In the previous example we configured the Kendo DataSource to submit its parameters as JSON via the [parameterMap](/api/wrappers/php/Kendo/Data/DataSourceTransport#parametermap).

        <?php
        $request = json_decode(file_get_contents('php://input'));
        ?>
1. Get the current operation type. Available as the `type` query string parameter.

        <?php
        $type = $_GET['type'];
        ?>
1. Declare variable which will be returned as result of the operation

        <?php
        $result = null;
        ?>
1. Implement 'create':

        <?php
        if ($type == 'create') {
            // In batch mode the inserted records are available in the 'models' field
            $createdProducts = $request->models;

            // Will store the ProductID fields of the inserted records
            $result = array();

            foreach($createdProducts as $product) {
                // Create SQL INSERT statement
                $statement = $db->prepare('INSERT INTO Products (ProductName, UnitPrice, UnitsInStock, Discontinued) VALUES (:productName, :unitPrice, :unitsInStock, :discontinued)');

                // Bind parameter values
                $statement->bindValue(':productName', $product->ProductName);
                $statement->bindValue(':unitPrice', $product->UnitPrice);
                $statement->bindValue(':unitsInStock', $product->UnitsInStock);
                $statement->bindValue(':discontinued', $product->Discontinued);

                // Execute the statement
                $statement->execute();

                // Set ProductID to the last inserted ID (ProductID is auto-incremented column)
                $product->ProductID = $db->lastInsertId();

                // The result of the 'create' operation is all inserted products
                $result[] = $product;
            }
        }
        ?>
1. Implement 'read':

        <?php
        if ($type == 'read') {
            // Create SQL SELECT statement
            $statement = $db->prepare('SELECT * FROM Products');

            // Execute the statement
            $statement->execute();

            // The result of the 'read' operation is all products from the Products table
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        ?>
1. Implement 'update':

        <?php
        if ($type == 'update') {
            // in batch mode the updated records are available in the 'models' field
            $updatedProducts = $request->models;

            foreach($updatedProducts as $product) {
                // Create UPDATE SQL statement
                $statement = $db->prepare('UPDATE Products SET ProductName = :productName, UnitPrice = :unitPrice, UnitsInStock = :unitsInStock, Discontinued = :discontinued WHERE ProductID = :productID');

                // Bind parameter values
                $statement->bindValue(':productID', $product->ProductID);
                $statement->bindValue(':productName', $product->ProductName);
                $statement->bindValue(':unitPrice', $product->UnitPrice);
                $statement->bindValue(':unitsInStock', $product->UnitsInStock);
                $statement->bindValue(':discontinued', $product->Discontinued);

                // Execute the statement
                $statement->execute();
            }
        }
        ?>
1. Implement 'destroy':

        <?php
        if ($type == 'destroy') {
            // in batch mode the destroyed records are available in the 'models' field
            $destroyedProducts = $request->models;

            foreach($destroyedProducts as $product) {
                // Create DELETE SQL statement
                $statement = $db->prepare('DELETE FROM Products WHERE ProductID = :productID');

                // Bind parameter values
                $statement->bindValue(':productID', $product->ProductID);

                // Execute the statement
                $statement->execute();
            }
        }
        ?>
1. Return the result of the operation as JSON

        <?php
        // Set response content type
        header('Content-Type: application/json');

        echo json_encode($result);
        ?>

## Editing with the DataSourceResult Helper

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations.
The DataSourceResult can also perform paging, sorting, filtering, grouping and aggregate calculation on the server side by generating SQL executed via PDO.
It is distributed with the Telerik UI for PHP** demos and can be found in the **/wrappers/php/lib/** directory of the **Telerik UI for PHP distribution.

First we will configure a Kendo ListView for PHP binding and then we will implement the remote service.

### Configure ListView for editing (using DataSourceResult)
1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Define item template for listview:

		<!-- The following markup contains the `Add new record` button -->
		<div class="k-toolbar k-grid-toolbar">
		    <a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-add"></span>Add new record</a>
		</div>
		
		
		<!-- ListView item template -->
		<script id="list-view-template" type="text/x-kendo-template">
		    <div class="product-view">
		            <dl>
		                <dt>Product Name</dt>
		                <dd>${ProductName}</dd>
		                <dt>Unit Price</dt>
		                <dd>${kendo.toString(UnitPrice, "c")}</dd>
		                <dt>Units In Stock</dt>
		                <dd>${UnitsInStock}</dd>
		                <dt>Discontinued</dt>
		                <dd>${Discontinued}</dd>
		            </dl>
		            <div class="edit-buttons">
		                <a class="k-button k-button-icontext k-edit-button" href="\\#"><span class="k-icon k-edit"></span>Edit</a>
		                <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-delete"></span>Delete</a>
		            </div>
		        </div>
		</script>

	**Note:** Click events for elements with class name **k-edit-button** and **k-delete-button** will be automatically handled and treated by Kendo ListView as **edit** and **delete** actions.

1. Define edit template ofr listview:

		<script type="text/x-kendo-tmpl" id="editTemplate">
		<div class="product-view">
			<dl>
				<dt>Product Name</dt>
				<dd>
				    <input type="text" data-bind="value:ProductName" name="ProductName" required="required" validationMessage="required" />
				    <span data-for="ProductName" class="k-invalid-msg"></span>
				</dd>
				<dt>Unit Price</dt>
				<dd>
				    <input type="text" data-bind="value:UnitPrice" data-role="numerictextbox" data-type="number" name="UnitPrice" required="required" min="1" validationMessage="required" />
				    <span data-for="UnitPrice" class="k-invalid-msg"></span>
				</dd>
				<dt>Units In Stock</dt>
				<dd>
				    <input type="text" data-bind="value:UnitsInStock" data-role="numerictextbox" name="UnitsInStock" required="required" data-type="number" min="0" validationMessage="required" />
				    <span data-for="UnitsInStock" class="k-invalid-msg"></span>
				</dd>
				<dt>Discontinued</dt>
				<dd><input type="checkbox" name="Discontinued" data-bind="checked:Discontinued"></dd>
			</dl>
			<div class="edit-buttons">
				<a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-update"></span>Save</a>
				<a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span>Cancel</a>
			</div>
		</div>
		</script>

	**Note:** Click events for elements with class name **k-update-button** and **k-cancel-button** will be automatically handled and treated by Kendo ListView as **save** and **cancel** actions.
1. Create a data source and configure it:

        <?php
        // Configure the remote service - a PHP file called 'products.php'
        // The query string parameter 'type' specifies the type of CRUD operation
        $transport = new \Kendo\Data\DataSourceTransport();

        $create = new \Kendo\Data\DataSourceTransportCreate();

        $create->url('products.php?type=create')
             ->contentType('application/json')
             ->type('POST');

        $read = new \Kendo\Data\DataSourceTransportRead();

        $read->url('products.php?type=read')
             ->contentType('application/json')
             ->type('POST');

        $update = new \Kendo\Data\DataSourceTransportUpdate();

        $update->url('products.php?type=update')
             ->contentType('application/json')
             ->type('POST');

        $destroy = new \Kendo\Data\DataSourceTransportDestroy();

        $destroy->url('products.php?type=destroy')
             ->contentType('application/json')
             ->type('POST');

        // Configure the transport. Send all data source parameters as JSON using the parameterMap setting.
        $transport->create($create)
                  ->read($read)
                  ->update($update)
                  ->destroy($destroy)
                  ->parameterMap('function(data) {
                      return kendo.stringify(data);
                  }');

        $model = new \Kendo\Data\DataSourceSchemaModel();

        $productIDField = new \Kendo\Data\DataSourceSchemaModelField('ProductID');
        $productIDField->type('number')
                       ->editable(false)
                       ->nullable(true);

        $productNameField = new \Kendo\Data\DataSourceSchemaModelField('ProductName');
        $productNameField->type('string');                           

        $unitPriceField = new \Kendo\Data\DataSourceSchemaModelField('UnitPrice');
        $unitPriceField->type('number');                       

        $unitsInStockField = new \Kendo\Data\DataSourceSchemaModelField('UnitsInStock');
        $unitsInStockField->type('number');

        $discontinuedField = new \Kendo\Data\DataSourceSchemaModelField('Discontinued');
        $discontinuedField->type('boolean');

        $model->id('ProductID')
            ->addField($productIDField)
            ->addField($productNameField)
            ->addField($unitPriceField)
            ->addField($unitsInStockField)
            ->addField($discontinuedField);

        // Configure the schema to accept the format returned by DataSourceResult
        $schema = new \Kendo\Data\DataSourceSchema();
        $schema->data('data')
               ->errors('errors')
               ->model($model)
               ->total('total');

        $dataSource = new \Kendo\Data\DataSource();

        $dataSource->transport($transport)
                   ->batch(true)
                   ->schema($schema);
        ?>
1. Create a listview, configure its templates and set its data source.

        <div class="k-toolbar k-grid-toolbar">
    		<a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-add"></span>Add new record</a>
		</div>

        <?php
        $listview = new \Kendo\UI\ListView('listView');
    	$listview->dataSource($dataSource)
	             ->templateId('template')
	             ->editTemplateId('editTemplate')
	             ->pageable(true);   
        ?>
1. Output the listview by echo-ing the result of the render method.

        <?php
        echo $listview->render();
        ?>

### Create PHP file which performs CRUD (using DataSourceResult)

1. Create a new php file called **products.php**. This file will peform CRUD operations.
1. Copy **/wrappers/php/lib/DataSourceResult.php** to your web site root and include it.

        <?php require_once 'lib/DataSourceResult.php'; ?>
1. Read the request body and parse it as JSON. In the previous example we configured the Kendo DataSource to submit its parameters as JSON via the [parameterMap](/api/wrappers/php/Kendo/Data/DataSourceTransport#parametermap).

        <?php
        $request = json_decode(file_get_contents('php://input'));
        ?>
1. Create a new instance of the `DataSourceResult`.
        <?php
        $result = new DataSourceResult('sqlite:../sample.db');
        ?>
1. Get the current operation type. Available as the `type` query string parameter.

        <?php
        $type = $_GET['type'];
        ?>
1. Declare variable which will be returned as result of the operation

        <?php
        $data = null;
        ?>
1. Implement 'create':

        <?php
        if ($type == 'create') {
            // The 'create' method of DataSourceResult accepts table name, array of column names, array of models and the name of the primary key column
            $data = $result->create('Products', array('ProductID', 'ProductName', 'UnitPrice', 'UnitsInStock', 'Discontinued'), $request->models, 'ProductID');
        }
        ?>
1. Implement 'read':

        <?php
        if ($type == 'read') {
            // The 'read' method accepts table name, array of columns to select and request parameters as array
            $data = $result->read('Products', array('ProductID', 'ProductName', 'UnitPrice', 'UnitsInStock', 'Discontinued'), $request));
        }
        ?>
1. Implement 'update':

        <?php
        if ($type == 'update') {
            // The 'update' method of DataSourceResult accepts table name, array of column names, array of models and the name of the primary key column
            $data = $result->update('Products', array('ProductID', 'ProductName', 'UnitPrice', 'UnitsInStock', 'Discontinued'), $request->models, 'ProductID');
        }
        ?>
1. Implement 'destroy':

        <?php
        if ($type == 'destroy') {
            // The 'destroy' method of DataSourceResult accepts table name, array of models and the name of the primary key column
            $data = $result->update('Products', $request->models, 'ProductID');
        }
        ?>
1. Return the result of the operation as JSON

        <?php
        // Set response content type
        header('Content-Type: application/json');

        echo json_encode($data);
        ?>
