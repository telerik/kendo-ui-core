
<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$transport = new \Kendo\Data\PivotDataSourceTransport();

$read = new \Kendo\Data\PivotDataSourceTransportRead();

$read->url('http://demos.telerik.com/olap/msmdpump.dll')
     ->contentType('text/xml')
     ->dataType('text')
     ->type('POST');

$connection = new \Kendo\Data\PivotDataSourceTransportConnection();

$connection->catalog('Adventure Works DW 2008R2')
            ->cube('Adventure Works');

$discover = new \Kendo\Data\PivotDataSourceTransportDiscover();

$discover->url('http://demos.telerik.com/olap/msmdpump.dll')
     ->contentType('text/xml')
     ->dataType('text')
     ->type('POST');

$transport ->read($read)
            ->connection($connection)
            ->discover($discover);

$schema = new \Kendo\Data\PivotDataSourceSchema();
$schema->type('xmla');

$dateColumn = new \Kendo\Data\PivotDataSourceColumn();
$dateColumn->name('[Date].[Calendar]')
            ->expand(true);

$productColumn = new \Kendo\Data\PivotDataSourceColumn();
$productColumn->name('[Product].[Category]');

$dataSource = new \Kendo\Data\PivotDataSource();

$dataSource->transport($transport)
            ->type("xmla")
            ->addColumn($dateColumn, $productColumn)
            ->addRow('[Geography].[City]')
            ->addMeasure(array('name' => '[Measures].[Internet Revenue Status]', 'type' => 'status')) //KPI Status measure that will render kpiStatusTemplate
            ->addMeasure(array('name' => '[Measures].[Internet Revenue Trend]', 'type' => 'trend')) //KPI Trend measure that will render kpiTrendTemplate
            ->schema($schema);

$pivotgrid = new \Kendo\UI\PivotGrid('pivotgrid');
$pivotgrid->dataSource($dataSource)
    ->columnWidth(200)
    ->configurator("#configurator")
    ->filterable(true)
    ->sortable(true)
    ->height(580);

$configurator = new \Kendo\UI\PivotConfigurator('configurator');
$configurator->height(580)
             ->filterable(true)
             ->sortable(true);

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
