---
title: Local Binding
page_title: Local Binding | TreeView PHP Class
description: "Bind Kendo UI TreeView PHP class to an array of data."
slug: localbinding_treeview_uiforphp
position: 2
---

# Local Binding

This article shows how to bind Kendo UI TreeView for PHP to a PHP [array](http://php.net/manual/en/language.types.array.php). Local binding means that the TreeView data will be initially available on the client and will not be requested per level.

## Approaches

This PHP array can be populated from a database or declared inline (in the page).

### Bind to PDO-Returned Arrays

[PHP Data Objects (PDO)](http://www.php.net/manual/en/intro.pdo.php) is an interface for accessing various databases in PHP.

Below are listed the steps for you to follow when binding the Kendo UI TreeView for PHP to an array returned by PDO.

> **Important**
>
> The following demo is using the sample SQLite database shipped with the Telerik UI for PHP demos (`/wrappers/php/sample.db`).

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a PDO connection.

###### Example

        <?php
        $db = new PDO('sqlite:../sample.db');
        ?>

**Step 3** Retrieve all records from the **Employees** table.

###### Example

        <?php
        $statement = $db->prepare('SELECT EmployeeID, FirstName, ReportsTo FROM Employees');
        $statement->execute();
        $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
        ?>

**Step 4** Convert the table rows into hierarchical data.

###### Example

        <?php
        function toHierarchy($rows, $idField = 'id', $foreignKey = 'parent') {
            $hash = array();

            $result = array();

            // hash to rows by id
            foreach ($rows as $row) {
                $hash[$row[$idField]] = $row;
            }

            foreach ($hash as &$row) {
                $parentId = $row[$foreignKey];

                if (!is_null($parentId)) {
                    // add items field, if not available
                    if (!in_array('items', $hash[$parentId])) {
                        $hash[$parentId] = $hash[$parentId] + array('items' => array());
                    }

                    // add row to parent item
                    $hash[$parentId]['items'][] =& $row;
                }
            }

            foreach ($hash as &$row) {
                $parentId = $row[$foreignKey];

                if (is_null($parentId)) {
                    $result[] =& $row;
                }
            }

            return $result;
        }

        $data = toHierarchy($rows, 'EmployeeID', 'ReportsTo');
        ?>

**Step 5** Create a [data source](/api/php/Kendo/Data/DataSource) and set its [`data`](/api/php/Kendo/Data/DataSource#data).

###### Example

        <?php
        $dataSource = new \Kendo\Data\DataSource();

        $dataSource->data($data);
        ?>

**Step 6** Create a [TreeView](/api/php/Kendo/UI/TreeView), configure its [`dataTextField`](/api/php/Kendo/UI/TreeView#dataTextField) and set its [`dataSource`](/api/php/Kendo/UI/TreeView#datasource).

###### Example

        <?php
        $treeview = new \Kendo\UI\TreeView('treeview');

        $treeview
            ->dataTextField('FirstName')
            ->dataSource($dataSource);

        ?>

**Step 7** Output the TreeView by echoing the result of the `render` method.

###### Example

        <?php
        echo $treeview->render();
        ?>

## See Also

Other articles on Telerik UI for PHP and on the TreeView:

* [Overview of the TreeView PHP Class]({% slug overview_treeview_uiforphp %})
* [Remote Binding of the TreeView PHP Class]({% slug remotebinding_treeview_uiforphp %})
* [Overview of the Kendo UI TreeView Widget]({% slug overview_kendoui_treeview_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
