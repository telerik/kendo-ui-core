<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'), true);

    if (isset($request['id'])) {
        $employeeId = $request['id'];
    } else {
        $employeeId = null;
    }

    $db = new PDO('sqlite:..//sample.db');

    $sql = 'SELECT m.*, '
        . '(SELECT COUNT(*) FROM EmployeeDirectory x WHERE x.ReportsTo=m.EmployeeID) as HasEmployees '
        . 'FROM EmployeeDirectory m '
        . 'WHERE ReportsTo is ?';

    $statement = $db->prepare($sql);

    $statement->execute(array($employeeId));

    $data = $statement->fetchAll(PDO::FETCH_ASSOC);

    // iterate over data to set computed keys
    $employees = array();

    foreach ($data as $employee) {
        $employee["HasEmployees"] = $employee["HasEmployees"] != 0;
        $employees[] = $employee;
    }

    echo json_encode($employees);

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('remote-data-binding.php')
     ->contentType('application/json')
     ->type('POST');

$transport ->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$firstNameField = new \Kendo\Data\DataSourceSchemaModelField('FirstName');
$firstNameField->type('string');

$lastNameField = new \Kendo\Data\DataSourceSchemaModelField('LastName');
$lastNameField->type('string');

$positionField = new \Kendo\Data\DataSourceSchemaModelField('Position');
$positionField->type('string');

$extensionField = new \Kendo\Data\DataSourceSchemaModelField('Extension');
$extensionField->type('number');

$employeeIDField = new \Kendo\Data\DataSourceSchemaModelField('EmployeeID');
$employeeIDField->type('number');

$parentIdField = new \Kendo\Data\DataSourceSchemaModelField('parentId');
$parentIdField->from("ReportsTo")
    ->nullable(true)
    ->type('number');

$hasChildrenField = new \Kendo\Data\DataSourceSchemaModelField('hasChildren');
$hasChildrenField->from("HasEmployees")
    ->type('boolean');

$model->id("EmployeeID")
    ->addField($employeeIDField)
    ->addField($parentIdField)
    ->addField($hasChildrenField)
    ->addField($firstNameField)
    ->addField($lastNameField)
    ->addField($positionField)
    ->addField($extensionField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->model($model);

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->schema($schema);

$treeList = new \Kendo\UI\TreeList('treelist');

$firstName = new \Kendo\UI\TreeListColumn();
$firstName->field('FirstName')
        ->width(250)
        ->title('First Name');

$lastName = new \Kendo\UI\TreeListColumn();
$lastName->field('LastName')
        ->title('Last Name');

$position = new \Kendo\UI\TreeListColumn();
$position->field('Position');

$extensionField = new \Kendo\UI\TreeListColumn();
$extensionField->field('Extension')
        ->title('Ext')
        ->format('{0:#}')
        ->width(200);

$treeList->addColumn($firstName, $lastName, $position, $extensionField)
     ->dataSource($dataSource);

?>

<?php
echo $treeList->render();
?>

<?php require_once '../include/footer.php'; ?>
