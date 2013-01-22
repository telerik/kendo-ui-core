<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    require_once '../../lib/DataSourceResult.php';

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../northwind.db');

    header('Content-Type: application/json');

    echo json_encode($result->read('SELECT ProductName, UnitPrice from Products', $request));

    exit;
}
?>
<?php require_once '../../include/header.php' ?>

<?php require_once '../../lib/Kendo/Autoload.php' ?>
<?php
    $transport = new \Kendo\Data\DataSourceTransport();

    $read = new \Kendo\Data\DataSourceTransportRead();

    $read->url('remote-data.php')
         ->contentType('application/json')
         ->type('POST');

    $transport->read($read)
              ->parameterMap('function(data) {
                  return kendo.stringify(data);
              }');

    $schema = new \Kendo\Data\DataSourceSchema();
    $schema->data('data')
           ->total('total');

    $dataSource = new \Kendo\Data\DataSource();

    $dataSource->transport($transport)
               ->pageSize(10)
               ->schema($schema)
               ->serverSorting(true)
               ->serverPaging(true);

    $grid = new \Kendo\UI\Grid('grid');

    $productName = new \Kendo\UI\GridColumn();
    $productName->field('ProductName')
                ->title('Product Name');

    $unitPrice = new \Kendo\UI\GridColumn();
    $unitPrice->field('UnitPrice')
              ->format('{0:c}')
              ->title('Unit Price');

    $grid->addColumn($productName)
         ->addColumn($unitPrice)
         ->dataSource($dataSource)
         ->sortable(true)
         ->pageable(true);

    echo $grid->render();
?>

<?php require_once '../../include/footer.php' ?>
