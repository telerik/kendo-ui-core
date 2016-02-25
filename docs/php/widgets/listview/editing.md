---
title: Editing
page_title: Editing | ListView PHP Class
description: "Edit the Kendo UI ListView PHP class."
slug: editing_listview_uiforphp
position: 4
---

# Editing

This help topic shows how to persist the changes from create, update and destroy operations using Kendo UI ListView for PHP.

> **Important**
>
> The following demos are using the sample SQLite database shipped with the Telerik UI for PHP demos (`/wrappers/php/sample.db`).

## Edit with PDO

This demo shows how to use [PDO](http://www.php.net/manual/en/intro.pdo.php) to perform the create, update, and destroy data operations.

### Configurаtion

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Define the item template for the ListView.

###### Example

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

> **Important**
>
> Click events for elements with the `k-edit-button` and `k-delete-button` class names will be automatically handled and treated by the Kendo UI ListView as `edit` and `delete` actions.

**Step 3** Define the edit template for the ListView.

###### Example

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

> **Important**
>
> Click events for elements with class name **k-update-button** and **k-cancel-button** will be automatically handled and treated by Kendo ListView as **save** and **cancel** actions.

**Step 4** Create a data source and configure it.

###### Example

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

**Step 5** Create a ListView, configure its `template` and set its `dataSource`.

###### Example

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

**Step 6** Output the ListView by echoing the result of the `render` method.

###### Example

        <?php
        echo $listview->render();
        ?>

### Create PHP file which performs CRUD

**Step 1** Create a new PHP file called `products.php`. This file will perform CRUD data operations.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Read the request body and parse it as JSON. In the previous example, the Kendo UI DataSource is configured to submit its parameters as JSON via the [`parameterMap`](/api/php/Kendo/Data/DataSourceTransport#parametermap).

###### Example

        <?php
        $request = json_decode(file_get_contents('php://input'));
        ?>

**Step 4** Get the current operation type, available as the `type` query string parameter.

###### Example

        <?php
        $type = $_GET['type'];
        ?>

<!--_-->
**Step 5** Declare a variable which will be returned as a result of the operation.

###### Example

        <?php
        $result = null;
        ?>

**Step 6** Implement `create`.

###### Example

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

**Step 7** Implement `read`.

###### Example

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

**Step 8** Implement `update`.

###### Example

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

**Step 9** Implement `destroy`.

###### Example

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

**Step 10** Return the result of the operation as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');

        echo json_encode($result);
        ?>

## Use DataSourceResult Helpers

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations. The `DataSourceResult` can also perform paging, sorting, filtering, grouping and aggregate calculations on the server side by generating SQL executed via PDO. It is distributed with the Telerik UI for PHP demos and can be found in the `/wrappers/php/lib/` directory of the Telerik UI for PHP distribution.

First, configure a Kendo UI ListView for PHP binding and then implement the remote service which will return JSON.

### Configuration (DataSourceResult)

**Step 1** Follow the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript and CSS files.

**Step 2** Define the item template for the ListView.

###### Example

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

> **Important**
>
> Click events for elements with the `k-edit-button` and `k-delete-button` class name will be automatically handled and treated by the Kendo UI ListView as `edit` and `delete` actions.

**Step 3** Define the edit template for the ListView.

###### Example

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

> **Important**
>
> Click events for elements with the `k-update-button` and `k-cancel-button` class name  will be automatically handled and treated by the Kendo UI ListView as `save` and `cancel` actions.

**Step 4** Create a data source and configure it.

###### Example

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

**Step 5** Create a ListView, configure its `template` and set its `dataSource`.

###### Example

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

**Step 6** Output the ListView by echoing the result of the `render` method.

###### Example

        <?php
        echo $listview->render();
        ?>

### CRUD-Performing File Creation (DataSourceResult)

**Step 1** Create a new PHP file called `products.php`. This file will perform CRUD data operations.

**Step 2** Copy `/wrappers/php/lib/DataSourceResult.php` to your web site root and include it.

###### Example

        <?php require_once 'lib/DataSourceResult.php'; ?>

**Step 3** Read the request body and parse it as JSON. In the previous example we configured the Kendo DataSource to submit its parameters as JSON via the [parameterMap](/api/php/Kendo/Data/DataSourceTransport#parametermap).

###### Example

        <?php
        $request = json_decode(file_get_contents('php://input'));
        ?>

**Step 4** Create a new instance of the `DataSourceResult`.

###### Example

				<?php
        $result = new DataSourceResult('sqlite:../sample.db');
        ?>

**Step 5** Get the current operation type. Available as the `type` query string parameter.

###### Example

        <?php
        $type = $_GET['type'];
        ?>

<!--_-->				
**Step 6** Declare a variable which will be returned as a result of the operation.

###### Example

        <?php
        $data = null;
        ?>

**Step 7** Implement `create`.

###### Example

        <?php
        if ($type == 'create') {
            // The 'create' method of DataSourceResult accepts table name, array of column names, array of models and the name of the primary key column
            $data = $result->create('Products', array('ProductID', 'ProductName', 'UnitPrice', 'UnitsInStock', 'Discontinued'), $request->models, 'ProductID');
        }
        ?>

**Step 8** Implement `read`.

###### Example

        <?php
        if ($type == 'read') {
            // The 'read' method accepts table name, array of columns to select and request parameters as array
            $data = $result->read('Products', array('ProductID', 'ProductName', 'UnitPrice', 'UnitsInStock', 'Discontinued'), $request));
        }
        ?>

**Step 9** Implement `update`.

###### Example

        <?php
        if ($type == 'update') {
            // The 'update' method of DataSourceResult accepts table name, array of column names, array of models and the name of the primary key column
            $data = $result->update('Products', array('ProductID', 'ProductName', 'UnitPrice', 'UnitsInStock', 'Discontinued'), $request->models, 'ProductID');
        }
        ?>

**Step 10** Implement `destroy`.

###### Example

        <?php
        if ($type == 'destroy') {
            // The 'destroy' method of DataSourceResult accepts table name, array of models and the name of the primary key column
            $data = $result->update('Products', $request->models, 'ProductID');
        }
        ?>

**Step 11** Return the result of the operation as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');

        echo json_encode($data);
        ?>

## See Also

Other articles on Telerik UI for PHP and on the ListView:

* [Overview of the ListView PHP Class]({% slug overview_listview_uiforphp %})
* [Local Binding of the ListView PHP Class]({% slug localbinding_listview_uiforphp %})
* [Remote Binding of the ListView PHP Class]({% slug remotebinding_listview_uiforphp %})
* [Overview of the Kendo UI ListView Widget]({% slug overview_kendoui_listview_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
