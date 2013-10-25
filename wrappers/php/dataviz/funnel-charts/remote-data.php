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
?>
<div class="chart-wrapper" style="margin: auto;">
<?php
    $series = new \Kendo\Dataviz\UI\ChartSeriesItem();
    $series->field('wind')
           ->categoryField('year')
           ->segmentSpacing(2);

    $transport = new \Kendo\Data\DataSourceTransport();
    $transport->read(array('url' => 'remote-data.php', 'type' => 'POST', 'dataType' => 'json'));

    $dataSource = new \Kendo\Data\DataSource();

    $dataSource->transport($transport)
               ->addSortItem(array('field' => 'year', 'dir' => 'desc'));

    $chart = new \Kendo\Dataviz\UI\Chart("chart");

    $chart->title(array('text' => "Spain windpower electricity production (GWh)"))
          ->dataSource($dataSource)
          ->addSeriesItem($series)
          ->legend(array('visible' => false))
          ->tooltip(array(
              'visible' => true,
              'format' => 'N0',
              'template' => "#= dataItem.year # - #= value# GWh"))
          ->seriesDefaults(array(
              'type' => 'funnel',
              'dynamicSlope'=>true,
              'dynamicHeight'=>false,
              'labels'=>array(
                'visible'=>true,
                'template'=>'#= dataItem.year#',
              )
          ));

    echo $chart->render();
?>
</div>
<style scoped>
    .chart-wrapper .k-chart {
        margin: 0 auto;
        width: 400px;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
