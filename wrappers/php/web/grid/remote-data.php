<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['CONTENT_TYPE'] == 'application/json') {

    require_once '../../lib/DataSourceResult.php';

    $result = new DataSourceResult('sqlite:../../northwind.db');

    header('Content-Type: application/json');

    echo json_encode($result->read('SELECT ProductName from Products'));

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

    $transport->read($read);

    $schema = new \Kendo\Data\DataSourceSchema();
    $schema->data('data')
           ->total('total');

    $dataSource = new \Kendo\Data\DataSource();

    $dataSource->transport($transport)
               ->pageSize(10)
               ->schema($schema)
               ->serverPaging(true);

    $grid = new \Kendo\UI\Grid('grid');

    $productName = new \Kendo\UI\GridColumn();
    $productName->field('ProductName')
                ->title('Product Name');

    $grid->addColumn($productName)
         ->dataSource($dataSource)
         ->pageable(true);

    echo $grid->render();
?>

<?php require_once '../../include/footer.php' ?>
