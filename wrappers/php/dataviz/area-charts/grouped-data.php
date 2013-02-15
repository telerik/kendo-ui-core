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
?>
<div class="chart-wrapper">
<?php

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('area')
       ->field('close')
       ->name('close')
       ->groupNameTemplate('#= group.value # (#= series.name #)');

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();

$valueAxis->labels(array(
                'format' => 'N0',
                'skip' => 2,
                'step' => 2
          ))
          ->line(array('visible' => false))
          ->max(700);

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();

$categoryAxis->field('date')
             ->labels(array('format' => 'MMM'))
             ->line(array('visible' => false))
             ->majorGridLines(array('visible' => false));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->format('{0}%')
        ->template('#= series.name # - #= value #%');


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
      ->addValueAxisItem($valueAxis)
      ->addCategoryAxisItem($categoryAxis)
      ->seriesDefaults(array('type' => 'area'))
      ->tooltip($tooltip);

echo $chart->render();
?>
</div>
<?php require_once '../../include/footer.php'; ?>
