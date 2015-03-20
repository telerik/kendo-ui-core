---
title: Remote binding
page_title: How to bind Kendo Scheduler for PHP to remote service which returns JSON
description: Learn how to bind Kendo UI Scheduler for PHP to JSON
---
# Remote Binding

This help topic shows how to bind Kendo Scheduler for PHP to JSON response.



> The following demos are using the sample SQLite database shipped with the Telerik UI for PHP demos (**/wrappers/php/sample.db**).

## Binding to array returned by PDO

### Configure Scheduler for Remote Binding

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a data source and configure it:

        <?php
        $transport = new \Kendo\Data\DataSourceTransport();

        // Configure the remote service - a PHP file called 'tasks.php'
        // The query string parameter 'type' specifies the type of CRUD operation

        $create = new \Kendo\Data\DataSourceTransportCreate();

        $create->url('tasks.php?type=create')
             ->contentType('application/json')
             ->type('POST');

        $read = new \Kendo\Data\DataSourceTransportRead();

        $read->url('tasks.php?type=read')
             ->contentType('application/json')
             ->type('POST');

        $update = new \Kendo\Data\DataSourceTransportUpdate();

        $update->url('tasks.php?type=update')
             ->contentType('application/json')
             ->type('POST');

        $destroy = new \Kendo\Data\DataSourceTransportDestroy();

        $destroy->url('tasks.php?type=destroy')
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

        $model = new \Kendo\Data\DataSourceSchemaModel();

        $taskIDField = new \Kendo\Data\DataSourceSchemaModelField('taskID');
        $taskIDField->type('number')
                    ->from('TaskID')
                    ->nullable(true);

        $titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
        $titleField->from('Title')
                ->defaultValue('No title')
                ->validation(array('required' => true));

        $startField = new \Kendo\Data\DataSourceSchemaModelField('start');
        $startField->type('date')
                ->from('Start');

        $endField = new \Kendo\Data\DataSourceSchemaModelField('end');
        $endField->type('date')
                ->from('End');

        $isAllDayField = new \Kendo\Data\DataSourceSchemaModelField('isAllDay');
        $isAllDayField->type('boolean')
                ->from('IsAllDay');

        $descriptionField = new \Kendo\Data\DataSourceSchemaModelField('description');
        $descriptionField->type('string')
                ->from('Description');

        $recurrenceIdField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceId');
        $recurrenceIdField->from('RecurrenceID');

        $recurrenceRuleField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceRule');
        $recurrenceRuleField->from('RecurrenceRule');

        $recurrenceExceptionField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceException');
        $recurrenceExceptionField->from('RecurrenceException');

        $ownerIdField = new \Kendo\Data\DataSourceSchemaModelField('ownerId');
        $ownerIdField->from('OwnerID')
                ->defaultValue(1);

        $model->id('taskID')
            ->addField($taskIDField)
            ->addField($titleField)
            ->addField($startField)
            ->addField($endField)
            ->addField($descriptionField)
            ->addField($recurrenceIdField)
            ->addField($recurrenceRuleField)
            ->addField($recurrenceExceptionField)
            ->addField($ownerIdField)
            ->addField($isAllDayField);

        $schema = new \Kendo\Data\DataSourceSchema();
        $schema ->errors('errors')
                ->model($model);

        $dataSource = new \Kendo\Data\DataSource();

        $dataSource->transport($transport)
            ->schema($schema)
            ->batch(true);
        ?>
1. Create a scheduler, configure its resources and set its data source.

        <?php
        //create Resource configuration
        $resource = new \Kendo\UI\SchedulerResource();
        $resource->field('ownerId')
            ->title('Owner')
            ->dataSource(array(
                    array('text'=> 'Alex', 'value' => 1, 'color' => '#ef701d'),
                    array('text'=> 'Bob', 'value' => 2, 'color' => '#5fb1f7'),
                    array('text'=> 'Charlie', 'value' => 3, 'color' => '#35a964')
                ));

        $scheduler = new \Kendo\UI\Scheduler('scheduler');
        $scheduler->timezone("Etc/UTC") // set timezone
            ->addResource($resource) // add resource configuration
            ->addView('day', 'week', 'month', 'agenda') // configure views
            ->dataSource($dataSource);// add dataSource
        ?>
1. Output the scheduler by echo-ing the result of the render method.

        <?php
        echo $scheduler->render();
        ?>

### Create PHP file which returns JSON

1. Create a new php file called **tasks.php**. This file will return data in JSON format. The data source is configured to request it via the [url](/api/wrappers/php/Kendo/Data/DataSourceTransportRead#url) setting.
1. Create a PDO connection

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>
1. Retrieve all records from the `Tasks` table

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

### Create PHP file which performs CRUD

1. Create a new php file called **tasks.php**. This file will peform CRUD operations.
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
            $createdTasks = $request->models;

            // Will store the TaskID fields of the inserted records
            $result = array();

            foreach($createdTasks as $task) {
                // Create SQL INSERT statement
                $statement = $db->prepare('INSERT INTO Tasks (Title, Start, End, IsAllDay, Description, RecurrenceID, RecurrenceRule, RecurrenceException, OwnerID) VALUES (:title, :start, :end, :isAllDay, :descrip    tion, :recurrenceID, :recurrenceRule, :recurrenceException, :ownerID)');

                // Bind parameter values
                $statement->bindValue(':title', $task->Title);
                $statement->bindValue(':start', $task->Start);
                $statement->bindValue(':end', $task->End);
                $statement->bindValue(':isAllDay', $task->IsAllDay);
                $statement->bindValue(':description', $task->Description);
                $statement->bindValue(':recurrenceID', $task->RecurrenceID);
                $statement->bindValue(':recurrenceRule', $task->RecurrenceRule);
                $statement->bindValue(':recurrenceException', $task->RecurrenceException);
                $statement->bindValue(':ownerID', $task->OwnerID);

                // Execute the statement
                $statement->execute();

                // Set TaskID to the last inserted ID (TaskID is auto-incremented column)
                $task->TaskID = $db->lastInsertId();

                // The result of the 'create' operation is all inserted tasks
                $result[] = $task;
            }
        }
        ?>
1. Implement 'read':

        <?php
        if ($type == 'read') {
            $statement = $db->prepare('SELECT *, strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start, strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End FROM Tasks');
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        ?>
1. Implement 'update':

        <?php
        if ($type == 'update') {
            // in batch mode the updated records are available in the 'models' field
            $updatedTasks = $request->models;

            foreach($updatedTasks as $task) {
                // Create UPDATE SQL statement
                $statement = $db->prepare('UPDATE Tasks SET Title = :title, Start = :start, End = :end, IsAllDay = :isAllDay, Description = :description, RecurrenceID = :recurrenceID, RecurrenceRule = :recurrenceR    ule, RecurrenceException = :recurrenceException, OwnerID = :ownerID WHERE TaskID = :taskID');

                // Bind parameter values
                $statement->bindValue(':title', $task->Title);
                $statement->bindValue(':start', $task->Start);
                $statement->bindValue(':end', $task->End);
                $statement->bindValue(':isAllDay', $task->IsAllDay);
                $statement->bindValue(':description', $task->Description);
                $statement->bindValue(':recurrenceID', $task->RecurrenceID);
                $statement->bindValue(':recurrenceRule', $task->RecurrenceRule);
                $statement->bindValue(':recurrenceException', $task->RecurrenceException);
                $statement->bindValue(':ownerID', $task->OwnerID);
                $statement->bindValue(':taskID', $task->TaskID);

                // Execute the statement
                $statement->execute();
            }
        }
       ?>
1. Implement 'destroy':

        <?php
        if ($type == 'destroy') {
            // in batch mode the destroyed records are available in the 'models' field
            $destroyedTasks = $request->models;

            foreach($destroyedTasks as $task) {
                // Create DELETE SQL statement
                $statement = $db->prepare('DELETE FROM Tasks WHERE TaskID = :taskID');

                // Bind parameter values
                $statement->bindValue(':taskID', $task->TaskID);

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

## Binding using the DataSourceResult Helper

The `DataSourceResult` class is a helper utility on top of PDO which simplifies common CRUD operations.
It is distributed with the Telerik UI for PHP demos and can be found in the **/wrappers/php/lib/** directory of the Telerik UI for PHP distribution.

First we will configure a Kendo Grid for PHP binding and then we will implement the remote service.

### Configure Scheduler for editing (using DataSourceResult)
1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a data source and configure it:

        <?php
        // Configure the remote service - a PHP file called 'tasks.php'
        // The query string parameter 'type' specifies the type of CRUD operation
        $transport = new \Kendo\Data\DataSourceTransport();

        $create = new \Kendo\Data\DataSourceTransportCreate();

        $create->url('tasks.php?type=create')
             ->contentType('application/json')
             ->type('POST');

        $read = new \Kendo\Data\DataSourceTransportRead();

        $read->url('tasks.php?type=read')
             ->contentType('application/json')
             ->type('POST');

        $update = new \Kendo\Data\DataSourceTransportUpdate();

        $update->url('tasks.php?type=update')
             ->contentType('application/json')
             ->type('POST');

        $destroy = new \Kendo\Data\DataSourceTransportDestroy();

        $destroy->url('tasks.php?type=destroy')
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

        $taskIDField = new \Kendo\Data\DataSourceSchemaModelField('taskID');
        $taskIDField->type('number')
                    ->from('TaskID')
                    ->nullable(true);

        $titleField = new \Kendo\Data\DataSourceSchemaModelField('title');
        $titleField->from('Title')
                ->defaultValue('No title')
                ->validation(array('required' => true));

        $startField = new \Kendo\Data\DataSourceSchemaModelField('start');
        $startField->type('date')
                ->from('Start');

        $endField = new \Kendo\Data\DataSourceSchemaModelField('end');
        $endField->type('date')
                ->from('End');

        $isAllDayField = new \Kendo\Data\DataSourceSchemaModelField('isAllDay');
        $isAllDayField->type('boolean')
                ->from('IsAllDay');

        $descriptionField = new \Kendo\Data\DataSourceSchemaModelField('description');
        $descriptionField->type('string')
                ->from('Description');

        $recurrenceIdField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceId');
        $recurrenceIdField->from('RecurrenceID');

        $recurrenceRuleField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceRule');
        $recurrenceRuleField->from('RecurrenceRule');

        $recurrenceExceptionField = new \Kendo\Data\DataSourceSchemaModelField('recurrenceException');
        $recurrenceExceptionField->from('RecurrenceException');

        $ownerIdField = new \Kendo\Data\DataSourceSchemaModelField('ownerId');
        $ownerIdField->from('OwnerID')
                ->defaultValue(1);

        $model->id('taskID')
            ->addField($taskIDField)
            ->addField($titleField)
            ->addField($startField)
            ->addField($endField)
            ->addField($descriptionField)
            ->addField($recurrenceIdField)
            ->addField($recurrenceRuleField)
            ->addField($recurrenceExceptionField)
            ->addField($ownerIdField)
            ->addField($isAllDayField);

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
1. Create a scheduler, configure its resources and set its data source.

        <?php
        //create Resource configuration
        $resource = new \Kendo\UI\SchedulerResource();
        $resource->field('ownerId')
            ->title('Owner')
            ->dataSource(array(
                    array('text'=> 'Alex', 'value' => 1, 'color' => '#ef701d'),
                    array('text'=> 'Bob', 'value' => 2, 'color' => '#5fb1f7'),
                    array('text'=> 'Charlie', 'value' => 3, 'color' => '#35a964')
                ));

        $scheduler = new \Kendo\UI\Scheduler('scheduler');
        $scheduler->timezone("Etc/UTC") // set timezone
            ->addResource($resource) // add resource configuration
            ->addView('day', 'week', 'month', 'agenda') // configure views
            ->dataSource($dataSource);// add dataSource
        ?>
1. Output the scheduler by echo-ing the result of the render method.

        <?php
        echo $scheduler->render();
        ?>

### Create PHP file which performs CRUD (using DataSourceResult)

1. Create a new php file called **tasks.php**. This file will peform CRUD operations.
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
            $data = $result->create('Tasks',
                array('TaskID', 'Title', 'Start', 'End', 'IsAllDay', 'Description', 'RecurrenceID', 'RecurrenceRule', 'RecurrenceException', 'OwnerID'),
                $request->models, 'TaskID');
        }
        ?>
1. Implement 'read':

        <?php
        if ($type == 'read') {
            // The 'read' method accepts table name, array of columns to select and request parameters as array
            $data = $result->read('Tasks',
                    array('TaskID', 'Title', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End', 'IsAllDay', 'Description', 'RecurrenceID', 'RecurrenceRule', 'RecurrenceException', 'OwnerID'), $request));
        }
        ?>
1. Implement 'update':

        <?php
        if ($type == 'update') {
            // The 'update' method of DataSourceResult accepts table name, array of column names, array of models and the name of the primary key column
            $data = $result->update('Tasks',
                array('TaskID', 'Title', 'Start', 'End', 'IsAllDay', 'Description', 'RecurrenceID', 'RecurrenceRule', 'RecurrenceException', 'OwnerID'),
                $request->models, 'TaskID');
        }
        ?>
1. Implement 'destroy':

        <?php
        if ($type == 'destroy') {
            // The 'destroy' method of DataSourceResult accepts table name, array of models and the name of the primary key column
            $data = $result->update('Tasks', $request->models, 'TaskID');
        }
        ?>
1. Return the result of the operation as JSON

        <?php
        // Set response content type
        header('Content-Type: application/json');

        echo json_encode($data);
        ?>
