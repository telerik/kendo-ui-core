<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:..//sample.db');

    $type = $_GET['type'];

    $columns =  array('EmployeeID', 'ReportsTo', 'FirstName', 'LastName', 'Position', 'Phone', 'Extension', 'HireDate');

    switch($type) {
        case 'create':
            $result = $result->create('EmployeeDirectory', $columns, $request->models, 'EmployeeID');
            break;
        case 'read':
            $result = $result->read('EmployeeDirectory', $columns, $request);
            break;
        case 'update':
            $result = $result->update('EmployeeDirectory', $columns, $request->models, 'EmployeeID');
            break;
        case 'destroy':
            $result = $result->destroy('EmployeeDirectory', $request->models, 'EmployeeID');
            break;
    }

    echo json_encode($result, JSON_NUMERIC_CHECK);

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$create = new \Kendo\Data\DataSourceTransportCreate();

$create->url('events.php?type=create')
     ->contentType('application/json')
     ->type('POST');

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('events.php?type=read')
     ->contentType('application/json')
     ->type('POST');

$update = new \Kendo\Data\DataSourceTransportUpdate();

$update->url('event.php?type=update')
     ->contentType('application/json')
     ->type('POST');

$destroy = new \Kendo\Data\DataSourceTransportDestroy();

$destroy->url('events.php?type=destroy')
     ->contentType('application/json')
     ->type('POST');

$transport->create($create)
          ->read($read)
          ->update($update)
          ->destroy($destroy)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$firstNameField = new \Kendo\Data\DataSourceSchemaModelField('FirstName');
$firstNameField->type('string')
            ->validation(array('required' => true));

$lastNameField = new \Kendo\Data\DataSourceSchemaModelField('LastName');
$lastNameField->type('string')
            ->validation(array('required' => true));

$extensionField = new \Kendo\Data\DataSourceSchemaModelField('Extension');
$extensionField->type('number')
            ->validation(array('required' => true, 'min' => 0));

$hireDateField = new \Kendo\Data\DataSourceSchemaModelField('HireDate');
$hireDateField->type('date');

$employeeIDField = new \Kendo\Data\DataSourceSchemaModelField('EmployeeID');
$employeeIDField->type('number')
               ->editable(false)
               ->nullable(false);

$parentIdField = new \Kendo\Data\DataSourceSchemaModelField('parentId');
$parentIdField->from("ReportsTo")
    ->nullable(true)
    ->type('number');

$model->id("EmployeeID")
    ->addField($employeeIDField)
    ->addField($parentIdField)
    ->addField($firstNameField)
    ->addField($lastNameField)
    ->addField($extensionField)
    ->addField($hireDateField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->model($model);

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
        ->batch(true)
       ->schema($schema);

$treeList = new \Kendo\UI\TreeList('treelist');

$firstName = new \Kendo\UI\TreeListColumn();
$firstName->field('FirstName')
            ->title('First Name')
            ->width(250);

$lastName = new \Kendo\UI\TreeListColumn();
$lastName->field('LastName')
            ->title('Last Name');

$hireDate = new \Kendo\UI\TreeListColumn();
$hireDate->field('HireDate')
        ->format('{0:MMMM d, yyyy}');

$command = new \Kendo\UI\GridColumn();
$command->addCommandItem('edit')
        ->addCommandItem('destroy');

$treeList->addColumn($firstName, $lastName, $hireDate, $extension, $command)
     ->dataSource($dataSource)
     ->addToolbarItem(new \Kendo\UI\TreeListToolbarItem('create'))
     ->editable(true)
     ->edit('onEdit')
     ->save('onSave')
     ->remove('onRemove')
     ->dataBinding('onDataBinding')
     ->dataBound('onDataBound')
     ->attr('style', 'height:540px');

?>

<?php
echo $treeList->render();
?>
<script>
        function onEdit(arg) {
            var model = arg.model;

            kendoConsole.log("TreeList edit: " + model.FirstName + " " + model.LastName);
        }

        function onSave(arg) {
            kendoConsole.log("TreeList save");
        }

        function onRemove(arg) {
            kendoConsole.log("TreeList remove");
        }

        function onDataBound(arg) {
            kendoConsole.log("TreeList data bound");
        }

        function onDataBinding(arg) {
            kendoConsole.log("TreeList data binding");
        }
</script>
<div class="box console-section">
    <h4>Console</h4>
    <div class="console"></div>
</div>

<?php require_once '../include/footer.php'; ?>
