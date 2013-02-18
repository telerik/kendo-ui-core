<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = chart_crime_stats();

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('bubble')
       ->xField('murder')
       ->yField('burglary')
       ->sizeField('population')
       ->categoryField('state');

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->format('{3}: Population {2:N0}');

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'remote-data.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport);

$xAxis = new \Kendo\Dataviz\UI\ChartXAxisItem();
$xAxis->labels(array('format' => '{0:N0}'))
      ->title(array('text' => 'Murders per 100,000 population'));

$yAxis = new \Kendo\Dataviz\UI\ChartYAxisItem();
$yAxis->labels(array('format' => '{0:N0}'))
      ->title(array('text' => 'Bulgraries per 100,000 population'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->dataSource($dataSource)
      ->legend(array('visible' => false))
      ->addSeriesItem($series)
      ->addXAxisItem($xAxis)
      ->addYAxisItem($yAxis)
      ->tooltip($tooltip);

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
