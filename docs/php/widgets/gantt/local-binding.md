---
title: Local binding
page_title: How to bind Kendo Gantt for PHP to PHP array
description: Learn how to bind Kendo UI Gantt for PHP to array of data
---

# Local Binding to Array

This help topic shows how to bind Kendo Gantt for PHP to a PHP [array](http://php.net/manual/en/language.types.array.php). This array
can be populated from a data base or declared inline (in the page).

## Binding to array returned by PDO

PHP Data Objects ([PDO](http://www.php.net/manual/en/intro.pdo.php)) is an interface for accessing various databases in PHP. Here is how to bind Kendo Gantt to array returned by PDO.

First we will configure a Kendo Gantt for PHP binding and then we will implement the remote service which will return JSON.


> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP** demos (**/wrappers/php/sample.db).

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a PDO connection

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>
1. Retrieve all records from the `GanttTasks` and `GanttDependencies` tables (format the Dates as UTC)

        <?php
        $statement = $db->prepare('SELECT *, strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start, strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End FROM GanttTasks');
        $statement->execute();
        $tasks = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        $statement = $db->prepare('SELECT * FROM GanttDependencies');
        $statement->execute();
        $dependencies = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>
1. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) for the tasks and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data) and [schema](/api/wrappers/php/Kendo/Data/DataSource#schema). Setting the schema is required
to specify the model fields.

        <?php
        // Create the schema model
        $taskModel = new \Kendo\Data\DataSourceSchemaModel();
        
        // Map the 'ID' column of the 'GanttTasks' table to 'id' field
        $idField = new \Kendo\Data\DataSourceSchemaModelField('id');
        $idField->type('number')
                ->from('ID')
                ->nullable(true);
        
        // Map the 'OrderID' column of the 'GanttTasks' table to 'orderId' field
        $orderIdField = new \Kendo\Data\DataSourceSchemaModelField('orderId');
        $orderIdField->from('OrderID')
                ->type('number');
        
        // Map the 'ParentID' column of the 'GanttTasks' table to 'parentId' field
        $parentIdField = new \Kendo\Data\DataSourceSchemaModelField('parentId');
        $parentIdField->from('ParentID')
                ->defaultValue(null)
                ->type('number');
        
        // Map the 'Start' column of the 'GanttTasks' table to 'start' field
        $startField = new \Kendo\Data\DataSourceSchemaModelField('start');
        $startField->from('Start')
                ->type('date');
        
        // Map the 'End' column of the 'GanttTasks' table to 'end' field
        $endField = new \Kendo\Data\DataSourceSchemaModelField('end');
        $endField->from('End')
                ->type('date');
        
        // Map the 'OrderID' column of the 'GanttTasks' table to 'orderId' field
        $titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
        $titleField->from('Title')
                ->defaultValue('')
                ->type('string');
        
        // Map the 'PercentComplete' column of the 'GanttTasks' table to 'percentComplete' field
        $percentCompleteField = new \Kendo\Data\DataSourceSchemaModelField('percentComplete');
        $percentCompleteField->from('PercentComplete')
                ->type('number');
        
        // Map the 'Summary' column of the 'GanttTasks' table to 'summary' field
        $summaryField = new \Kendo\Data\DataSourceSchemaModelField('summary');
        $summaryField->from('Summary')
                ->type('boolean');
        
        // Map the 'Expanded' column of the 'GanttTasks' table to 'expanded' field
        $expandedField = new \Kendo\Data\DataSourceSchemaModelField('expanded');
        $expandedField->from('Expanded')
                ->defaultValue(true)
                ->type('boolean');
        
        $taskModel->id('id')
            ->addField($idField)
            ->addField($parentIdField)
            ->addField($orderIdField)
            ->addField($startField)
            ->addField($endField)
            ->addField($titleField)
            ->addField($percentCompleteField)
            ->addField($summaryField)
            ->addField($expandedField);

        // Create the schema
        $tasksSchema = new \Kendo\Data\DataSourceSchema();
        
        // Set its model
        $tasksSchema->model($taskModel);
        
        // Create a data source
        $tasksDataSource = new \Kendo\Data\DataSource();
        
        // Specify the schema and data
        $tasksDataSource->data($tasks)
              ->schema($tasksSchema);
        ?>
1. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) for the dependencies and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data) and [schema](/api/wrappers/php/Kendo/Data/DataSource#schema). Setting the schema is required to specify the model fields.

        <?php
        // Create the schema model
        $dependencyModel = new \Kendo\Data\DataSourceSchemaModel();
        
        // Map the 'ID' column of the 'GanttDependencies' table to 'id' field
        $idField = new \Kendo\Data\DataSourceSchemaModelField('id');
        $idField->from('ID')
                ->type('number');
        
        // Map the 'Type' column of the 'GanttDependencies' table to 'type' field
        $typeField = new \Kendo\Data\DataSourceSchemaModelField('type');
        $typeField->from('Type')
                ->type('number');
        
        // Map the 'PredecessorID' column of the 'GanttDependencies' table to 'predecessorId' field
        $predecessorIdField = new \Kendo\Data\DataSourceSchemaModelField('predecessorId');
        $predecessorIdField->from('PredecessorID')
                ->type('number');
        
        // Map the 'SuccessorID' column of the 'GanttDependencies' table to 'successorId' field
        $successorIdField = new \Kendo\Data\DataSourceSchemaModelField('successorId');
        $successorIdField->from('SuccessorID')
                ->type('number');
        
        $dependencyModel->id('id')
            ->addField($idField)
            ->addField($typeField)
            ->addField($predecessorIdField)
            ->addField($successorIdField);
        
        // Create the schema
        $dependenciesSchema = new \Kendo\Data\DataSourceSchema();
        
        // Set its model
        $dependenciesSchema->model($dependencyModel);
        
        // Create a data source
        $dependenciesDataSource = new \Kendo\Data\DataSource();
        
        // Specify the schema and data
        $dependenciesDataSource->data($dependencies)
              ->schema($dependenciesSchema);
        ?>
1. Create a [gantt](/api/wrappers/php/Kendo/UI/Gantt) and set its [data source](/api/wrappers/php/Kendo/UI/Gantt#datasource) and  [dependencies data source](/api/wrappers/php/Kendo/UI/Gantt#dependencies).

        <?php
        $gantt = new \Kendo\UI\Gantt('gantt');
        
        $gantt->dataSource($tasksDataSource)
            ->dependencies($dependenciesDataSource);
        ?>
1. Output the gantt by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $gantt->render();
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
        $tasks = $result->read('GanttTasks', array('Title', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End', 'ID', 'OrderID', 'ParentID', 'PercentComplete', 'Summary', 'Expanded'));
        $dependencies = $result->read('GanttDependencies', array('ID', 'Type', 'PredecessorID', 'SuccessorID'));
        // The result of the 'read' method is an array with two elements 'data' and 'total'.
        ?>
1. Configure a tasks data source and schema.

        <?php
        // Create the schema model
        $taskModel = new \Kendo\Data\DataSourceSchemaModel();
        
        // Map the 'ID' column of the 'GanttTasks' table to 'id' field
        $idField = new \Kendo\Data\DataSourceSchemaModelField('id');
        $idField->type('number')
                ->from('ID')
                ->nullable(true);
        
        // Map the 'OrderID' column of the 'GanttTasks' table to 'orderId' field
        $orderIdField = new \Kendo\Data\DataSourceSchemaModelField('orderId');
        $orderIdField->from('OrderID')
                ->type('number');
        
        // Map the 'ParentID' column of the 'GanttTasks' table to 'parentId' field
        $parentIdField = new \Kendo\Data\DataSourceSchemaModelField('parentId');
        $parentIdField->from('ParentID')
                ->defaultValue(null)
                ->type('number');
        
        // Map the 'Start' column of the 'GanttTasks' table to 'start' field
        $startField = new \Kendo\Data\DataSourceSchemaModelField('start');
        $startField->from('Start')
                ->type('date');
        
        // Map the 'End' column of the 'GanttTasks' table to 'end' field
        $endField = new \Kendo\Data\DataSourceSchemaModelField('end');
        $endField->from('End')
                ->type('date');
        
        // Map the 'OrderID' column of the 'GanttTasks' table to 'orderId' field
        $titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
        $titleField->from('Title')
                ->defaultValue('')
                ->type('string');
        
        // Map the 'PercentComplete' column of the 'GanttTasks' table to 'percentComplete' field
        $percentCompleteField = new \Kendo\Data\DataSourceSchemaModelField('percentComplete');
        $percentCompleteField->from('PercentComplete')
                ->type('number');
        
        // Map the 'Summary' column of the 'GanttTasks' table to 'summary' field
        $summaryField = new \Kendo\Data\DataSourceSchemaModelField('summary');
        $summaryField->from('Summary')
                ->type('boolean');
        
        // Map the 'Expanded' column of the 'GanttTasks' table to 'expanded' field
        $expandedField = new \Kendo\Data\DataSourceSchemaModelField('expanded');
        $expandedField->from('Expanded')
                ->defaultValue(true)
                ->type('boolean');
        
        $taskModel->id('id')
            ->addField($idField)
            ->addField($parentIdField)
            ->addField($orderIdField)
            ->addField($startField)
            ->addField($endField)
            ->addField($titleField)
            ->addField($percentCompleteField)
            ->addField($summaryField)
            ->addField($expandedField);

        // Create the schema
        $tasksSchema = new \Kendo\Data\DataSourceSchema();
        
        // Set its model and describe the data format
        $tasksSchema->model($taskModel)
            ->data('data')
            ->total('total');
        
        // Create a data source
        $tasksDataSource = new \Kendo\Data\DataSource();
        
        // Specify the schema and data
        $tasksDataSource->data($tasks)
              ->schema($tasksSchema);
        ?>
1. Configure a dependencies data source and schema.

        <?php
        // Create the schema model
        $dependencyModel = new \Kendo\Data\DataSourceSchemaModel();
        
        // Map the 'ID' column of the 'GanttDependencies' table to 'id' field
        $idField = new \Kendo\Data\DataSourceSchemaModelField('id');
        $idField->from('ID')
                ->type('number');
        
        // Map the 'Type' column of the 'GanttDependencies' table to 'type' field
        $typeField = new \Kendo\Data\DataSourceSchemaModelField('type');
        $typeField->from('Type')
                ->type('number');
        
        // Map the 'PredecessorID' column of the 'GanttDependencies' table to 'predecessorId' field
        $predecessorIdField = new \Kendo\Data\DataSourceSchemaModelField('predecessorId');
        $predecessorIdField->from('PredecessorID')
                ->type('number');
        
        // Map the 'SuccessorID' column of the 'GanttDependencies' table to 'successorId' field
        $successorIdField = new \Kendo\Data\DataSourceSchemaModelField('successorId');
        $successorIdField->from('SuccessorID')
                ->type('number');
        
        $dependencyModel->id('id')
            ->addField($idField)
            ->addField($typeField)
            ->addField($predecessorIdField)
            ->addField($successorIdField);
        
        // Create the schema
        $dependenciesSchema = new \Kendo\Data\DataSourceSchema();
        
        // Set its model and describe tha data format
        $dependenciesSchema->model($dependencyModel)
            ->data('data')
            ->total('total');
        
        // Create a data source
        $dependenciesDataSource = new \Kendo\Data\DataSource();
        
        // Specify the schema and data
        $dependenciesDataSource->data($dependencies)
              ->schema($dependenciesSchema);
        ?>
1. Create a gantt and set its data source and dependencies data source.

        <?php
        $gantt = new \Kendo\UI\Gantt('gantt');
        
        $gantt->dataSource($tasksDataSource)
            ->dependencies($dependenciesDataSource);
        ?>
1. Output the gantt by echo-ing the result of the render method.

        <?php
        echo $gantt->render();
        ?>
