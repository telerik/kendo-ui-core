<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:..//sample.db');

    echo json_encode($result->read('EmployeeDirectory', array('EmployeeID', 'ReportsTo', 'FirstName', 'LastName', 'Position', 'Phone', 'Extension' => array('type' => 'number'), 'Address'), $request));

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('index.php')
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

$phoneField = new \Kendo\Data\DataSourceSchemaModelField('Phone');
$phoneField->type('string');

$extentionField = new \Kendo\Data\DataSourceSchemaModelField('Extension');
$extentionField->type('number');

$addressField = new \Kendo\Data\DataSourceSchemaModelField('Address');
$addressField->type('string');

$employeeIDField = new \Kendo\Data\DataSourceSchemaModelField('EmployeeID');
$employeeIDField->type('number');

$parentIdField = new \Kendo\Data\DataSourceSchemaModelField('parentId');
$parentIdField->from("ReportsTo")
    ->nullable(true)
    ->type('number');

$model->id("EmployeeID")
    ->addField($employeeIDField)
    ->addField($parentIdField)
    ->addField($firstNameField)
    ->addField($lastNameField)
    ->addField($positionField)
    ->addField($phoneField)
    ->addField($extentionField)
    ->addField($addressField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->model($model);

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->schema($schema);

$treeList = new \Kendo\UI\TreeList('treelist');

$firstName = new \Kendo\UI\TreeListColumn();
$firstName->field('FirstName')
            ->title('First Name')
            ->width(220)
            ->templateId("photo-template");

$lastName = new \Kendo\UI\TreeListColumn();
$lastName->field('LastName')
            ->title('Last Name')
            ->width(160);

$position = new \Kendo\UI\TreeListColumn();
$position->field('Position');

$phone = new \Kendo\UI\TreeListColumn();
$phone->field('Phone')
            ->width(200);

$extension = new \Kendo\UI\TreeListColumn();
$extension->field('Extension')
            ->width(140);

$address = new \Kendo\UI\TreeListColumn();
$address->field('Address');

$treeList->addColumn($firstName, $lastName, $position, $phone, $extension, $address)
     ->dataSource($dataSource)
     ->sortable(true)
     ->filterable(true)
     ->attr('style', 'height:540px');

?>

<script id="photo-template" type="text/x-kendo-template">
   <div class='employee-photo'
        style='background-image: url(../content/web/treelist/people/#:data.EmployeeID#.jpg);'></div>
   <div class='employee-name'>#: FirstName #</div>
</script>

<div class="demo-section k-header">
<?php
echo $treeList->render();
?>
</div>

<style>
    .employee-photo {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-size: 40px 44px;
        background-position: center center;
        vertical-align: middle;
        line-height: 41px;
        box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);
    }

    .employee-name {
        display: inline-block;
        vertical-align: middle;
        line-height: 41px;
        padding-left: 10px;
    }
</style>

<?php require_once '../include/footer.php'; ?>
