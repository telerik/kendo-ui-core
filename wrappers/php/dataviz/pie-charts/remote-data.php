<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = chart_screen_resolution();

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';
?>
<div class="chart-wrapper" style="margin: auto;">
    <h3>1024x768 screen resolution trends</h3>
<?php
for ($year = 2000; $year <= 2009; $year++) {
    $series = new \Kendo\Dataviz\UI\ChartSeriesItem();
    $series->field('share')
           ->categoryField('resolution')
           ->padding(0);

    $transport = new \Kendo\Data\DataSourceTransport();
    $transport->read(array('url' => 'remote-data.php', 'type' => 'POST', 'dataType' => 'json'));

    $dataSource = new \Kendo\Data\DataSource();

    $dataSource->transport($transport)
               ->addSortItem(array('field' => 'year', 'dir' => 'asc'))
               ->addFilterItem(array('field' => 'year', 'operator' => 'eq', 'value' => $year));

    $chart = new \Kendo\Dataviz\UI\Chart("chart$year");

    $chart->title(array('text' => "$year"))
          ->dataSource($dataSource)
          ->addSeriesItem($series)
          ->legend(array('position' => 'top'))
          ->tooltip(array(
              'visible' => true,
              'format' => 'N0',
              'template' => "#= category # - #= kendo.format('{0:P}', percentage)#"))
          ->seriesDefaults(array('type' => 'pie'));

    echo $chart->render();
}
?>
</div>
<style scoped>
    .chart-wrapper {
        text-align: center;
        height: 340px;
        width: 700px;
    }
    .chart-wrapper h3 {
        padding: 1em 0;
        font-size: 1.5em;
        font-weight: normal;
    }
    .k-chart {
        display: inline-block;
        width: 120px;
        height: 120px;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
