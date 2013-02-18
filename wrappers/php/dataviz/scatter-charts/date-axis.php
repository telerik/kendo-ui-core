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
$series->xField('date')
       ->yField('close');

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'date-axis.php', 'type' => 'POST', 'dataType' => 'json'));

$model = new \Kendo\Data\DataSourceSchemaModel();
$model->addField(array('field' => 'date', 'type' => 'date'));

$schema = new \Kendo\Data\DataSourceSchema();
$schema->model($model);

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->schema($schema)
           ->addSortItem(array('field' => 'date', 'dir' => 'asc'))
           ->addGroupItem(array('field' => 'symbol'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');

$chart->title(array('text' => 'Closing stock prices'))
      ->dataSource($dataSource)
      ->addSeriesItem($series)
      ->tooltip(array('visible' => true, 'template' => '{0:d}, ${1}'))
      ->addYAxisItem(array(
          'labels' => array(
              'format' => '${0}',
              'skip' => 1
          )
      ))
      ->seriesDefaults(array('type' => 'scatterLine', 'markers' => array('size' => 6)));

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
