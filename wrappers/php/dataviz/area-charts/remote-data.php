<?php
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = array(
        array('country' => 'Spain', 'year' => '2008', 'unit' => 'GWh', 'hydro' => 26112, 'wind' => 32203, 'nuclear' => 58973),
        array('country' => 'Spain', 'year' => '2007', 'unit' => 'GWh', 'hydro' => 30522, 'wind' => 27568, 'nuclear' => 55103),
        array('country' => 'Spain', 'year' => '2006', 'unit' => 'GWh', 'hydro' => 29831, 'wind' => 23297, 'nuclear' => 60126),
        array('country' => 'Spain', 'year' => '2005', 'unit' => 'GWh', 'hydro' => 23025, 'wind' => 21176, 'nuclear' => 57539),
        array('country' => 'Spain', 'year' => '2004', 'unit' => 'GWh', 'hydro' => 34439, 'wind' => 15700, 'nuclear' => 63606),
        array('country' => 'Spain', 'year' => '2003', 'unit' => 'GWh', 'hydro' => 43897, 'wind' => 12075, 'nuclear' => 61875),
        array('country' => 'Spain', 'year' => '2002', 'unit' => 'GWh', 'hydro' => 26270, 'wind' => 9342, 'nuclear' => 63016),
        array('country' => 'Spain', 'year' => '2001', 'unit' => 'GWh', 'hydro' => 43864, 'wind' => 6759, 'nuclear' => 63708),
        array('country' => 'Spain', 'year' => '2000', 'unit' => 'GWh', 'hydro' => 31807, 'wind' => 4727, 'nuclear' => 62206)
    );

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';
?>
<div class="chart-wrapper">
<?php

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
</div>
<?php require_once '../../include/footer.php'; ?>
