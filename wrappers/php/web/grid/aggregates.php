<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Products', array('ProductName', 'UnitPrice', 'UnitsInStock', 'UnitsOnOrder'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('aggregates.php')
     ->contentType('application/json')
     ->type('POST');

$transport ->read($read)
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$schema = new \Kendo\Data\DataSourceSchema();
$schema->data('data')
       ->errors('errors')
       ->groups('groups')
       ->aggregates('aggregates')
       ->total('total');

$productNameCount = new \Kendo\Data\DataSourceAggregateItem();
$productNameCount->field("ProductName")
                 ->aggregate("count");

$unitsOnOrderAvg = new \Kendo\Data\DataSourceAggregateItem();
$unitsOnOrderAvg->field("UnitsOnOrder")
                ->aggregate("average");

$unitsInStockMin = new \Kendo\Data\DataSourceAggregateItem();
$unitsInStockMin->field("UnitsInStock")
                ->aggregate("min");

$unitsInStockMax = new \Kendo\Data\DataSourceAggregateItem();
$unitsInStockMax->field("UnitsInStock")
                ->aggregate("max");

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->pageSize(7)
           ->serverPaging(true)
           ->serverSorting(true)
           ->serverGrouping(true)
           ->serverFiltering(true)
           ->serverAggregates(true)
           ->addAggregateItem($productNameCount, $unitsOnOrderAvg, $unitsInStockMin, $unitsInStockMax)
           ->schema($schema);

$grid = new \Kendo\UI\Grid('grid');

$productName = new \Kendo\UI\GridColumn();
$productName->field('ProductName')
            ->footerTemplate('Total Count: #=count#')
            ->title('Product Name');

$unitPrice = new \Kendo\UI\GridColumn();
$unitPrice->field('UnitPrice')
          ->format('{0:c}')
          ->width(150)
          ->title('Unit Price');

$unitsInStock = new \Kendo\UI\GridColumn();
$unitsInStock->field('UnitsInStock')
          ->width(150)
          ->footerTemplate('<div>Min: #= min #</div><div>Max: #= max #</div>')
          ->title('Units In Stock');

$unitsOnOrder = new \Kendo\UI\GridColumn();
$unitsOnOrder->field('UnitsOnOrder')
          ->width(150)
          ->footerTemplate('Average: #=average#')
          ->title('Units On Order');

$grid->addColumn($productName, $unitPrice, $unitsOnOrder, $unitsInStock)
     ->dataSource($dataSource)
     ->scrollable(false)
     ->sortable(true)
     ->filterable(true)
     ->pageable(true);

echo $grid->render();
?>

<?php require_once '../../include/footer.php'; ?>
