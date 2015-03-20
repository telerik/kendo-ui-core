---
title: Remote binding
page_title: How to bind Kendo TreeView for PHP to remote service which returns JSON
description: Learn how to bind Kendo UI TreeView for PHP to JSON
---
# Remote Binding

This help topic shows how to bind Kendo TreeView for PHP to JSON response. Remote binding means that only the nodes that the user has expanded will be sent to the client, loaded on demand.

> The following demos are using the sample SQLite database shipped with the Telerik UI for PHP** demos (**/wrappers/php/sample.db).

## Binding to array returned by PDO

### Configure TreeView for Remote Binding

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.

1. Create a data source and configure it:

        <?php
        $transport = new \Kendo\Data\DataSourceTransport();

        $read = new \Kendo\Data\DataSourceTransportRead();

        $read->url('employees.php')
             ->contentType('application/json')
             ->type('POST');

        $transport->read($read)
                  ->parameterMap('function(data) {
                      return kendo.stringify(data);
                  }');

        $model = new \Kendo\Data\HierarchicalDataSourceSchemaModel();

        $model->id("EmployeeID")
              ->hasChildren("HasEmployees");

        $schema = new \Kendo\Data\HierarchicalDataSourceSchema();
        $schema->model($model);

        $dataSource = new \Kendo\Data\HierarchicalDataSource();

        $dataSource->transport($transport)
                   ->schema($schema);
        ?>

1. Create a treeview, configure its columns and set its data source.

        <?php
        $treeview = new \Kendo\UI\TreeView('treeview');

        $treeview->dataSource($dataSource)
                 ->dataTextField("FirstName");
        ?>

1. Output the treeview by echo-ing the result of the render method.

        <?php
        echo $treeview->render();
        ?>

### Create PHP file which returns JSON

1. Create a new php file called **employees.php**. This file will return data in JSON format. The data source is configured to request it via the [url](/api/wrappers/php/Kendo/Data/DataSourceTransportRead#url) setting.
1. Create a PDO connection

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>
1. Retrieve all records from the `Employees` table, children of the sent EmployeeID. If the paramater is not set, retrieve only the root nodes.

        <?php
        $request = json_decode(file_get_contents('php://input'), true);

        if (isset($request['EmployeeID'])) {
            $employeeId = $request['EmployeeID'];
        } else {
            $employeeId = null;
        }

        $sql = 'SELECT m.EmployeeID, m.FirstName, m.LastName, '
            . '(SELECT COUNT(*) FROM Employees x WHERE x.ReportsTo=m.EmployeeID) as HasEmployees '
            . 'FROM Employees m '
            . 'WHERE ReportsTo is ?';

        $statement = $db->prepare($sql);

        $statement->execute(array($employeeId));

        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>

1. Post-process the data, if necessary. In this case, the `HasEmployees` field needs to be boolean.

        <?php
        $employees = array();

        foreach ($data as $employee) {
            $employee["HasEmployees"] = $employee["HasEmployees"] != 0;
            $employees[] = $employee;
        }
        ?>

1. Return the records as JSON

        <?php
        // Set response content type
        header('Content-Type: application/json');

        // Return JSON
        echo json_encode($employees);
        ?>

