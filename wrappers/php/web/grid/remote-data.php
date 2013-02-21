<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Orders', array('ShipName', 'Freight', 'OrderDate', 'OrderID', 'ShipCity'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('remote-data.php')
     ->contentType('application/json')
     ->type('POST');

$transport->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$shipNameField = new \Kendo\Data\DataSourceSchemaModelField('ShipName');
$shipNameField->type('string');

$shipCityField = new \Kendo\Data\DataSourceSchemaModelField('ShipCity');
$shipCityField->type('string');

$orderIDField = new \Kendo\Data\DataSourceSchemaModelField('OrderID');
$orderIDField->type('number');

$freightField = new \Kendo\Data\DataSourceSchemaModelField('Freight');
$freightField->type('number');

$orderDateField = new \Kendo\Data\DataSourceSchemaModelField('OrderDate');
$orderDateField->type('date');

$model->addField($shipNameField)
      ->addField($freightField)
      ->addField($orderIDField)
      ->addField($shipCityField)
      ->addField($orderDateField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->model($model)
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->pageSize(10)
           ->schema($schema)
           ->serverFiltering(true)
           ->serverSorting(true)
           ->serverPaging(true);

$grid = new \Kendo\UI\Grid('grid');

$orderID = new \Kendo\UI\GridColumn();
$orderID->field('OrderID')
            ->filterable(false)
            ->title('Order ID');

$freight = new \Kendo\UI\GridColumn();
$freight->field('Freight')
          ->format('{0:c}')
          ->title('Freight');

$orderDate = new \Kendo\UI\GridColumn();
$orderDate->field('OrderDate')
          ->width(120)
          ->format('{0:MM/dd/yyyy}')
          ->title('OrderDate');

$shipName = new \Kendo\UI\GridColumn();
$shipName->field('ShipName')
          ->width(260)
          ->title('Ship Name');

$shipCity= new \Kendo\UI\GridColumn();
$shipCity->field('ShipCity')
          ->width(150)
          ->title('Ship City');

$grid->addColumn($orderID, $freight, $orderDate, $shipName, $shipCity)
     ->dataSource($dataSource)
     ->sortable(true)
     ->filterable(true)
     ->pageable(true);

echo $grid->render();
?>

<?php require_once '../../include/footer.php'; ?>
