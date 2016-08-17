---
title: Remote Binding
page_title: Remote Binding | TreeView PHP Class
description: "Bind Kendo UI TreeView PHP class to JSON."
slug: remotebinding_treeview_uiforphp
position: 3
---

# Remote Binding

This article shows how to bind Kendo UI TreeView for PHP to a JSON response. Remote binding means that the nodes, expanded by the user, will be sent to the client, loaded on demand.

> **Important**
>
> The following demos are using the sample SQLite database shipped with the Telerik UI for PHP demos (`/wrappers/php/sample.db`).

## Bind to PDO-Returned Arrays

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete for PHP for remote binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a data source and configure it.

###### Example

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

**Step 3** Create a TreeView, configure its columns and set its data source.

###### Example

        <?php
        $treeview = new \Kendo\UI\TreeView('treeview');

        $treeview->dataSource($dataSource)
                 ->dataTextField("FirstName");
        ?>

**Step 4** Output the TreeView by echoing the result of the `render` method.

###### Example

        <?php
        echo $treeview->render();
        ?>

### JSON-Returning File Creation

Below are listed the steps for you to follow when creating a PHP file which returns JSON.

**Step 1** Create a new PHP file called `employees.php`. This file will return data in JSON format. The data source is configured to request it via the [`url`](/api/php/Kendo/Data/DataSourceTransportRead#url) setting.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Retrieve all records from the **Employees** table, children of the sent `EmployeeID`. If the `parameter` is not set, retrieve only the root nodes.

###### Example

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

<!--*-->
**Step 4** Post-process the data, if necessary. In this case, the `HasEmployees` field needs to be Boolean.

###### Example

        <?php
        $employees = array();

        foreach ($data as $employee) {
            $employee["HasEmployees"] = $employee["HasEmployees"] != 0;
            $employees[] = $employee;
        }
        ?>

**Step 5** Return the records as JSON.

###### Example

        <?php
        // Set response content type
        header('Content-Type: application/json');

        // Return JSON
        echo json_encode($employees);
        ?>

## See Also

Other articles on Telerik UI for PHP and on the TreeView:

* [Overview of the TreeView PHP Class]({% slug overview_treeview_uiforphp %})
* [Local Binding of the TreeView PHP Class]({% slug localbinding_treeview_uiforphp %})
* [Overview of the Kendo UI TreeView Widget]({% slug overview_kendoui_treeview_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
