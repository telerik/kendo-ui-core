<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:..//sample.db');

    echo json_encode($result->read('Orders', array('ShipName', 'Freight' => array('type' => 'number') , 'OrderDate', 'OrderID', 'ShipCity'), $request));

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('remote-data-binding.php')
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

$orderFilterableCell = new \Kendo\UI\GridColumnFilterableCell();
$orderFilterableCell->showOperators(false);

$orderFilterable = new \Kendo\UI\GridColumnFilterable();
$orderFilterable->cell($orderFilterableCell);

$orderID = new \Kendo\UI\GridColumn();
$orderID->field('OrderID')
            ->width(220)
            ->filterable($orderFilterable)
            ->title('Order ID');

$shipNameFilterableCell = new \Kendo\UI\GridColumnFilterableCell();
$shipNameFilterableCell->operator("contains");

$shipNameFilterable = new \Kendo\UI\GridColumnFilterable();
$shipNameFilterable->cell($shipNameFilterableCell);

$shipName = new \Kendo\UI\GridColumn();
$shipName->field('ShipName')
          ->width(500)
          ->filterable($shipNameFilterable)
          ->title('Ship Name');

$freightFilterableCell = new \Kendo\UI\GridColumnFilterableCell();
$freightFilterableCell->operator("gte");

$freightFilterable = new \Kendo\UI\GridColumnFilterable();
$freightFilterable->cell($freightFilterableCell);

$freight = new \Kendo\UI\GridColumn();
$freight->field('Freight')
          ->width(250)
          ->filterable($freightFilterable)
          ->title('Freight');

$orderDate = new \Kendo\UI\GridColumn();
$orderDate->field('OrderDate')
          ->format('{0:MM/dd/yyyy}')
          ->title('OrderDate');


$gridFilterable = new \Kendo\UI\GridFilterable();
$gridFilterable->mode("row");

$grid->addColumn($orderID, $shipName, $freight, $orderDate)
     ->dataSource($dataSource)
     ->sortable(true)
     ->filterable($gridFilterable)
     ->pageable(true);

echo $grid->render();
?>

<?php require_once '../include/footer.php'; ?>
