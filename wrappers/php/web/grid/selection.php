<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Products', array('ProductName', 'UnitPrice', 'UnitsInStock'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('selection.php')
     ->contentType('application/json')
     ->type('POST');

$transport->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->pageSize(5)
           ->serverPaging(true)
           ->serverSorting(true)
           ->schema($schema);


$productName = new \Kendo\UI\GridColumn();
$productName->field('ProductName')
            ->title('Product Name');

$unitPrice = new \Kendo\UI\GridColumn();
$unitPrice->field('UnitPrice')
          ->format('{0:c}')
          ->width(150)
          ->title('Unit Price');

$unitsInStock = new \Kendo\UI\GridColumn();
$unitsInStock->field('UnitsInStock')
          ->width(150)
          ->title('Units In Stock');
?>
   <h3>Grid with multiple row selection enabled</h3>
<?php
$grid = new \Kendo\UI\Grid('rowSelection');

$grid->addColumn($productName, $unitPrice, $unitsInStock)
     ->dataSource($dataSource)
     ->navigatable(true)
     ->scrollable(false)
     ->selectable('row multiple')
     ->sortable(true)
     ->pageable(true);

echo $grid->render();
?>

    <h3>Grid with multiple cell selection enabled</h3>

<?php

$grid = new \Kendo\UI\Grid('cellSelection');

$grid->addColumn($productName, $unitPrice, $unitsInStock)
     ->dataSource($dataSource)
     ->navigatable(true)
     ->scrollable(false)
     ->selectable('cell multiple')
     ->sortable(true)
     ->pageable(true);

echo $grid->render();
?>

<?php require_once '../../include/footer.php'; ?>
