<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = chart_spain_electricity_production();

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';

$nuclear = new \Kendo\Dataviz\UI\ChartSeriesItem();
$nuclear->field('nuclear')
        ->name('Nuclear');

$hydro = new \Kendo\Dataviz\UI\ChartSeriesItem();
$hydro->field('hydro')
      ->name('Hydro');

$wind = new \Kendo\Dataviz\UI\ChartSeriesItem();
$wind->field('wind')
     ->name('Wind');

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();

$valueAxis->labels(array('format' => 'N0'))
          ->majorUnit(10000);

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();

$categoryAxis->field('year')
             ->labels(array('rotation' => -90));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->format('N0');

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'remote-data.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->addSortItem(array('field' => 'year', 'dir' => 'asc'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Spain electricity production (GWh)'))
      ->dataSource($dataSource)
      ->legend(array('position' => 'top'))
      ->addSeriesItem($nuclear, $hydro, $wind)
      ->addValueAxisItem($valueAxis)
      ->addCategoryAxisItem($categoryAxis)
      ->seriesDefaults(array('type' => 'area'))
      ->tooltip($tooltip);

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
