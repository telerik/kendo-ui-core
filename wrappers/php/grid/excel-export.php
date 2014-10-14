<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $type = $_GET['type'];
    if ($type == 'save') {
        $fileName = $_POST['fileName'];
        $contentType = $_POST['contentType'];
        $base64 = $_POST['base64'];

        $data = base64_decode($base64);

        header('Content-Type:' . $contentType);
        header('Content-Length:' . strlen($data));
        header('Content-Disposition: attachment; filename=' . $fileName);

        echo $data;
    } else {
        header('Content-Type: application/json');

        $request = json_decode(file_get_contents('php://input'));

        $result = new DataSourceResult('sqlite:..//sample.db');

        echo json_encode($result->read('Products', array('ProductName', 'UnitPrice', 'UnitsInStock', 'UnitsOnOrder'), $request), JSON_NUMERIC_CHECK);
    }

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('excel-export.php?type=read')
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

$unitsInStockCount = new \Kendo\Data\DataSourceAggregateItem();
$unitsInStockCount->field("UnitsInStock")
                ->aggregate("count");

$group = new \Kendo\Data\DataSourceGroupItem();
$group->field('UnitsInStock')
      ->addAggregate($productNameCount, $unitsOnOrderAvg, $unitsInStockMin, $unitsInStockMax, $unitsInStockCount);

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->pageSize(7)
           ->serverPaging(true)
           ->serverSorting(true)
           ->serverGrouping(true)
           ->serverFiltering(true)
           ->serverAggregates(true)
           ->addGroupItem($group)
           ->addAggregateItem($productNameCount, $unitsOnOrderAvg, $unitsInStockMin, $unitsInStockMax)
           ->schema($schema);

$grid = new \Kendo\UI\Grid('grid');

$productName = new \Kendo\UI\GridColumn();
$productName->field('ProductName')
            ->width(300)
            ->locked(true)
            ->footerTemplate('Total Count: #=count#')
            ->groupFooterTemplate('Count: #=count#')
            ->title('Product Name');

$unitPrice = new \Kendo\UI\GridColumn();
$unitPrice->field('UnitPrice')
          ->width(300)
          ->format('{0:c}')
          ->title('Unit Price');

$unitsOnOrder = new \Kendo\UI\GridColumn();
$unitsOnOrder->field('UnitsOnOrder')
          ->width(300)
          ->footerTemplate('Average: #=average#')
          ->groupFooterTemplate('Average: #=average#')
          ->title('Units On Order');


$unitsInStock = new \Kendo\UI\GridColumn();
$unitsInStock->field('UnitsInStock')
          ->width(150)
          ->footerTemplate('Min: #= min # Max: #= max #')
          ->groupHeaderTemplate('Units In Stock: #= value # (Count: #= count#)')
          ->title('Units In Stock');

$excel = new \Kendo\UI\GridExcel();
$excel->fileName('Kendo UI Grid Export.xlsx')
      ->filterable(true)
      ->proxyURL('excel-export.php?type=save');

$grid->addColumn($productName, $unitPrice, $unitsOnOrder, $unitsInStock)
     ->addToolbarItem(new \Kendo\UI\GridToolbarItem('excel'))
     ->excel($excel)
     ->attr('style', 'width: 900px')
     ->dataSource($dataSource)
     ->sortable(true)
     ->columnMenu(true)
     ->groupable(true)
     ->resizable(true)
     ->reorderable(true)
     ->filterable(true)
     ->pageable(true);

echo $grid->render();
?>

<script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>
<?php require_once '../include/footer.php'; ?>
