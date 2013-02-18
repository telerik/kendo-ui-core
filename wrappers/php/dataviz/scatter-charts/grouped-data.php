<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = chart_stock_prices();

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('scatterLine')
       ->xField('date')
       ->yField('close')
       ->name('close')
       ->groupNameTemplate('#= group.value # (#= series.name #)');

$xAxis = new \Kendo\Dataviz\UI\ChartXAxisItem();

$xAxis->labels(array('format' => 'MMM'));

$yAxis = new \Kendo\Dataviz\UI\ChartYAxisItem();

$yAxis->labels(array(
        'format' => '${0}',
        'skip' => 2,
        'step' => 2
      ));

$model = new \Kendo\Data\DataSourceSchemaModel();
$model->addField(array('field' => 'date', 'type' => 'date'));

$schema = new \Kendo\Data\DataSourceSchema();
$schema->model($model);

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'grouped-data.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->schema($schema)
           ->addGroupItem(array('field' => 'symbol'))
           ->addSortItem(array('field' => 'date', 'dir' => 'asc'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Stock Prices'))
      ->dataSource($dataSource)
      ->legend(array('position' => 'bottom'))
      ->addSeriesItem($series)
      ->addXAxisItem($xAxis)
      ->addYAxisItem($yAxis);

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
