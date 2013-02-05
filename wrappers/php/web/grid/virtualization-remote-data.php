<?php
require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Orders', array('OrderID', 'CustomerID', 'ShipName', 'ShipAddress', 'ShipCity', 'ShipCountry'), $request));

    exit;
}

require_once '../../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('virtualization-remote-data.php')
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
           ->pageSize(100)
           ->schema($schema)
           ->serverSorting(true)
           ->serverPaging(true);

$grid = new \Kendo\UI\Grid('grid');

$orderID = new \Kendo\UI\GridColumn();
$orderID->field('OrderID')
            ->width(60)
            ->title('Order ID');

$customerID = new \Kendo\UI\GridColumn();
$customerID->field('CustomerID')
          ->width(90)
          ->title('Customer ID');

$shipName = new \Kendo\UI\GridColumn();
$shipName->field('ShipName')
          ->width(220)
          ->title('Ship Name');

$shipAddress = new \Kendo\UI\GridColumn();
$shipAddress->field('ShipAddress')
          ->width(380)
          ->title('Ship Address');

$shipCity = new \Kendo\UI\GridColumn();
$shipCity->field('ShipCity')
          ->width(110)
          ->title('Ship City');

$shipCountry = new \Kendo\UI\GridColumn();
$shipCountry->field('ShipCountry')
          ->width(110)
          ->title('Ship Country');

$scrollable = new \Kendo\UI\GridScrollable();
$scrollable->virtual(true);

$grid->addColumn($orderID, $customerID, $shipName, $shipAddress, $shipCity, $shipCountry)
     ->dataSource($dataSource)
     ->scrollable($scrollable)
     ->sortable(true)
     ->height(430);

echo $grid->render();
?>

<?php require_once '../../include/footer.php'; ?>
