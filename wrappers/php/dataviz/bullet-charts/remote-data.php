<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = chart_april_sales();

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('verticalBullet')
       ->currentField('current')
       ->targetField('target')
       ->gap(4)
       ->target(array('color' => '#aaaaaa'));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->shared(true)
        ->template('Target: #= value.target # items<br /> Actual: #= value.current # items');

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'remote-data.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport);

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->min(2000)
          ->max(11000)
          ->majorGridLines(array('visible' => false))
          ->minorTicks(array('' => true))
          ->addPlotBand(
              array('from' => 1000, 'to' => 3000, 'color' => '#aaaaaa', 'opacity' => 0.55),
              array('from' => 3000, 'to' => 5000, 'color' => '#aaaaaa', 'opacity' => 0.4),
              array('from' => 5000, 'to' => 8000, 'color' => '#aaaaaa', 'opacity' => 0.25),
              array('from' => 8000, 'to' => 11000, 'color' => '#aaaaaa', 'opacity' => 0.1)
          );

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->majorGridLines(array('visible' => false))
             ->field('category');

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->dataSource($dataSource)
      ->legend(array('visible' => false))
      ->addSeriesItem($series)
      ->addCategoryAxisItem($categoryAxis)
      ->addValueAxisItem($valueAxis)
      ->tooltip($tooltip);

echo $chart->render();
?>
<style>
    .chart-wrapper {
        padding-top: 20px;
    }
    .chart-wrapper .k-tooltip {
        text-align: left;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
