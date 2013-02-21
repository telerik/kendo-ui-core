<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Orders', array('ShipCountry', 'Freight', 'OrderDate'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('sorting.php')
     ->contentType('application/json')
     ->type('POST');

$transport->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$shipCountryField = new \Kendo\Data\DataSourceSchemaModelField('ShipCountry');
$shipCountryField->type('string');

$frieghtField = new \Kendo\Data\DataSourceSchemaModelField('Frieght');
$frieghtField->type('number');

$orderDateField = new \Kendo\Data\DataSourceSchemaModelField('OrderDate');
$orderDateField->type('date');

$model->addField($shipCountryField)
      ->addField($frieghtField)
      ->addField($orderDateField);

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->model($model)
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->pageSize(5)
           ->serverPaging(true)
           ->serverSorting(true)
           ->schema($schema);

$shipCountry = new \Kendo\UI\GridColumn();
$shipCountry->field('ShipCountry')
            ->width(300)
            ->title('Ship Country');

$freight = new \Kendo\UI\GridColumn();
$freight->field('Freight')
          ->width(300);

$orderDate = new \Kendo\UI\GridColumn();
$orderDate->field('OrderDate')
          ->format('{0:dd/MM/yyyy}')
          ->title('Order Date');
?>

   <h3>Grid with single column sorting enabled</h3>
<?php
$grid = new \Kendo\UI\Grid('rowSelection');

$sortable = new \Kendo\UI\GridSortable();
$sortable->mode('single')
    ->allowUnsort(false);

$grid->addColumn($shipCountry, $freight, $orderDate)
     ->dataSource($dataSource)
     ->navigatable(true)
     ->scrollable(false)
     ->sortable($sortable)
     ->pageable(true);

echo $grid->render();
?>

    <h3>Grid with multiple column sorting enabled</h3>
<?php

$grid = new \Kendo\UI\Grid('cellSelection');

$sortable = new \Kendo\UI\GridSortable();
$sortable->mode('multiple')
    ->allowUnsort(true);

$grid->addColumn($shipCountry, $freight, $orderDate)
     ->dataSource($dataSource)
     ->navigatable(true)
     ->scrollable(false)
     ->selectable('cell multiple')
     ->sortable($sortable)
     ->pageable(true);

echo $grid->render();
?>

<?php require_once '../../include/footer.php'; ?>
