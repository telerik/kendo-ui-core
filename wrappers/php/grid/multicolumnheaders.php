<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:..//sample.db');

    echo json_encode($result->read('Customers', array('ContactName', 'ContactTitle', 'CompanyName', 'Country', 'City', 'Phone'), $request));

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();

$read = new \Kendo\Data\DataSourceTransportRead();

$read->url('multicolumnheaders.php')
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
       ->total('total');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->pageSize(10)
           ->serverPaging(true)
           ->serverSorting(true)
           ->serverGrouping(true)
           ->schema($schema);

$grid = new \Kendo\UI\Grid('grid');


$companyName = new \Kendo\UI\GridColumn();
$companyName->field('CompanyName')
            ->title('Company Name')
            ->width(420);

$contactName = new \Kendo\UI\GridColumn();
$contactName->field('ContactName')
            ->title('Contact Name')
            ->width(200);

$contactTitle = new \Kendo\UI\GridColumn();
$contactTitle->field('ContactTitle')
            ->title('Contact Title')
            ->width(200);

$city = new \Kendo\UI\GridColumn();
$city->field('City')
        ->width(200);

$country = new \Kendo\UI\GridColumn();
$country->field('Country')
        ->width(200);

$phone = new \Kendo\UI\GridColumn();
$phone->field('Phone');

$locationGroup = new \Kendo\UI\GridColumn();
$locationGroup->title('Location')
                ->addColumns($country, $city);

$contactInfoGroup = new \Kendo\UI\GridColumn();
$contactInfoGroup->title('Contact Info')
                ->addColumns($contactName, $contactTitle, $locationGroup, $phone);

$grid->addColumn($companyName, $contactInfoGroup)
     ->dataSource($dataSource)
     ->sortable(true)
     ->groupable(true)
     ->pageable(true)
     ->resizable(true)
     ->reorderable(true)
     ->columnMenu(true)
     ->attr('style', 'height:550px');
?>

<?php
echo $grid->render();
?>

<?php require_once '../include/footer.php'; ?>
