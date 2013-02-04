<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'), true);

    if (isset($request['EmployeeID'])) {
        $employeeId = $request['EmployeeID'];
    } else {
        $employeeId = null;
    }

    $db = new PDO('sqlite:../../northwind.db');

    $sql = 'SELECT m.EmployeeID, m.FirstName, m.LastName, m.EmployeeID, '
        . '(SELECT COUNT(*) FROM Employees x WHERE x.ReportsTo=m.EmployeeID) as HasEmployees '
        . 'FROM Employees m '
        . 'WHERE ReportsTo is ?';

    $statement = $db->prepare($sql);

    $statement->execute(array($employeeId));

    $data = $statement->fetchAll(PDO::FETCH_ASSOC);

    // iterate over data to set computed keys
    $employees = array();

    foreach ($data as $employee) {
        $employee["FullName"] = $employee["FirstName"] . " " . $employee["LastName"];
        $employee["HasEmployees"] = $employee["HasEmployees"] != 0;
        $employees[] = $employee;
    }

    echo json_encode($employees);

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

// Connecting to live service on demos.kendoui.com
// $read->url('http://demos.kendoui.com/service/Employees')
//     ->dataType('jsonp');

// Bind to self
$read->url('remote-data.php')
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

$treeview = new \Kendo\UI\TreeView('treeview');
$treeview->attr('class', 'demo-section');

$treeview->dataSource($dataSource);
$treeview->dataTextField("FullName");

echo $treeview->render();
?>

<style scoped>
    #example {
        text-align: center;
    }

    .demo-section {
        display: inline-block;
        vertical-align: top;
        width: 320px;
        height: 300px;
        text-align: left;
        margin: 0 2em;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
