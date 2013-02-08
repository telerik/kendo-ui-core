<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Orders', array('OrderID', 'ShipCountry', 'ShipAddress', 'ShipName', 'EmployeeID'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('column-menu.php')
     ->contentType('application/json')
     ->type('POST');

$transport->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$orderIDField = new \Kendo\Data\DataSourceSchemaModelField('OrderID');
$orderIDField->type('number');

$shipNameField = new \Kendo\Data\DataSourceSchemaModelField('ShipName');
$shipNameField->type('string');

$shipAddressField = new \Kendo\Data\DataSourceSchemaModelField('ShipAddress');
$shipAddressField->type('string');

$shipCountryField = new \Kendo\Data\DataSourceSchemaModelField('ShipCountry');
$shipCountryField->type('string');


$model->addField($orderIDField)
      ->addField($shipNameField)
      ->addField($shipAddressField)
      ->addField($shipCountryField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->model($model)
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->pageSize(30)
           ->schema($schema)
           ->serverSorting(true)
           ->serverFiltering(true)
           ->serverPaging(true);

$grid = new \Kendo\UI\Grid('grid');

$orderID = new \Kendo\UI\GridColumn();
$orderID->field('OrderID')
    ->width(130)
    ->title('Order ID');

$shipCountry = new \Kendo\UI\GridColumn();
$shipCountry->field('ShipCountry')
    ->width(160)
    ->title('Ship Country');

$shipName = new \Kendo\UI\GridColumn();
$shipName->field('ShipName')
    ->title('Ship Name')
    ->width(220);

$shipAddress = new \Kendo\UI\GridColumn();
$shipAddress->field('ShipAddress')
    ->filterable(false)
    ->title('Ship Address');


$grid->dataSource($dataSource)
    ->addColumn($orderID, $shipCountry, $shipName, $shipAddress)
    ->height(430)
    ->columnMenu(true)
    ->pageable(true)
    ->sortable(true)
    ->filterable(true);

echo $grid->render();
?>

<?php require_once '../../include/footer.php'; ?>
