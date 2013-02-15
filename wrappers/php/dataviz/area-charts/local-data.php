<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';
require_once '../../include/header.php';
?>
<div class="chart-wrapper">
<?php

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->field('value')
       ->name('United States');

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();

$valueAxis->labels(array('format' => '{0}%'))
          ->line(array('visible' => false));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();

$categoryAxis->field('year')
             ->majorGridLines(array('visible' => false));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->format('{0}%')
        ->template('#= category # - #= value #%');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->data(chart_united_states_internet_usage());

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Internet Users in United States'))
      ->dataSource($dataSource)
      ->legend(array('visible' => false))
      ->addSeriesItem($series)
      ->addValueAxisItem($valueAxis)
      ->addCategoryAxisItem($categoryAxis)
      ->seriesDefaults(array(
          'type' => 'area',
          'labels' => array(
              'visible' => true,
              'format'=> '{0}%',
              'background' => 'transparent'
          )
      ))
      ->tooltip($tooltip);

echo $chart->render();
?>
</div>
<?php require_once '../../include/footer.php'; ?>
