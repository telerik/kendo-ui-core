<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = ozone_oncentration();

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';
?>
<div class="chart-wrapper" style="margin: auto;">
<?php
    $series = new \Kendo\Dataviz\UI\ChartSeriesItem();
    $series->type('boxPlot')       
           ->categoryField('year');

    $transport = new \Kendo\Data\DataSourceTransport();
    $transport->read(array('url' => 'remote-data.php', 'type' => 'POST', 'dataType' => 'json'));

    $dataSource = new \Kendo\Data\DataSource();

    $dataSource->transport($transport)
               ->addSortItem(array('field' => 'year', 'dir' => 'asc'));

    $categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
    $categoryAxis->field('year')
                 ->majorGridLines(array('visible' => false));

    $chart = new \Kendo\Dataviz\UI\Chart('chart');

    $chart->title(array('text' => 'Ozone Concentration (ppm)'))
          ->legend(array('visible' => false))
          ->dataSource($dataSource)
          ->addSeriesItem($series)
          ->addCategoryAxisItem($categoryAxis);

    echo $chart->render();
?>
</div>

<?php require_once '../../include/footer.php'; ?>
