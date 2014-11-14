<?php
require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:..//sample.db');

    echo json_encode($result->read('Customers', array('ContactName', 'ContactTitle', 'CompanyName', 'Country'), $request));

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();
$read = new \Kendo\Data\DataSourceTransportRead();
$read->url('remote-flat-data-binding.php')
     ->contentType('application/json')
     ->type('POST');

$transport ->read($read);

$companyNameDimension = new \Kendo\Data\PivotDataSourceSchemaCubeDimension('CompanyName');
$companyNameDimension->caption('All Companies');

$countryDimension = new \Kendo\Data\PivotDataSourceSchemaCubeDimension('Country');
$countryDimension->caption('All Countries');

$contactTitleDimension = new \Kendo\Data\PivotDataSourceSchemaCubeDimension('ContactTitle');
$contactTitleDimension->caption('All Titles');

$countMeasure = new \Kendo\Data\PivotDataSourceSchemaCubeMeasure('Contacts Count');
$countMeasure->field('CustomerID')
            ->aggregateName('count');

$cube = new \Kendo\Data\PivotDataSourceSchemaCube();
$cube->addDimension($companyNameDimension)
    ->addDimension($countryDimension)
    ->addDimension($contactTitleDimension)
    ->addMeasure($countMeasure);

$schema = new \Kendo\Data\PivotDataSourceSchema();
$schema->data('data')
    ->cube($cube);

$countryColumn = new \Kendo\Data\PivotDataSourceColumn();
$countryColumn->name('Country')
            ->expand(true);

$companyNameColumn = new \Kendo\Data\PivotDataSourceColumn();
$companyNameColumn->name('CompanyName');

$contactTitleRow = new \Kendo\Data\PivotDataSourceRow();
$contactTitleRow->name('ContactTitle')
                ->expand(true);

$dataSource = new \Kendo\Data\PivotDataSource();

$dataSource ->addColumn($countryColumn, $companyNameColumn)
            ->addRow($contactTitleRow)
            ->transport($transport)
            ->addMeasure('Contacts Count')
            ->schema($schema);

$pivotgrid = new \Kendo\UI\PivotGrid('pivotgrid');
$pivotgrid->dataSource($dataSource)
    ->configurator("#configurator")
    ->columnWidth(120)
    ->height(570);

$configurator = new \Kendo\UI\PivotConfigurator('configurator');
$configurator->height(570);
?>

<?php
echo $configurator->render();
echo $pivotgrid->render();
?>

<style>
    #pivotgrid
    {
        display: inline-block;
        vertical-align: top;
        width: 60%;
    }

    #configurator
    {
        display: inline-block;
        vertical-align: top;
    }
</style>

<?php require_once '../include/footer.php'; ?>
