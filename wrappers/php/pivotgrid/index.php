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

$cityColumn = new \Kendo\Data\PivotDataSourceColumn();
$cityColumn->name('[Geography].[City]');

$dataSource = new \Kendo\Data\PivotDataSource();

$dataSource->transport($transport)
            ->type("xmla")
            ->addColumn($dateColumn, $cityColumn)
            ->addRow('[Product].[Product]')
            ->addMeasure(array('[Measures].[Internet Sales Amount]'))
            ->schema($schema);

$pivotgrid = new \Kendo\UI\PivotGrid('pivotgrid');
$pivotgrid->dataSource($dataSource)
    ->height(550);

?>

<?php
echo $pivotgrid->render();
?>

<?php require_once '../include/footer.php'; ?>
