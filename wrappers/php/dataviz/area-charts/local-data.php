<?php
require_once '../../lib/Kendo/Autoload.php';
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

$dataSource->data(array(
    array('country'=> 'United States', 'year'=> '1994', 'value'=> 4.9),
    array('country'=> 'United States', 'year'=> '1995', 'value'=> 9.2),
    array('country'=> 'United States', 'year'=> '1996', 'value'=> 16.4),
    array('country'=> 'United States', 'year'=> '1997', 'value'=> 21.6),
    array('country'=> 'United States', 'year'=> '1998', 'value'=> 30.1),
    array('country'=> 'United States', 'year'=> '1999', 'value'=> 35.9),
    array('country'=> 'United States', 'year'=> '2000', 'value'=> 43.1),
    array('country'=> 'United States', 'year'=> '2001', 'value'=> 49.2),
    array('country'=> 'United States', 'year'=> '2002', 'value'=> 59.0),
    array('country'=> 'United States', 'year'=> '2003', 'value'=> 61.9),
    array('country'=> 'United States', 'year'=> '2004', 'value'=> 65),
    array('country'=> 'United States', 'year'=> '2005', 'value'=> 68.3),
    array('country'=> 'United States', 'year'=> '2006', 'value'=> 69.2),
    array('country'=> 'United States', 'year'=> '2007', 'value'=> 75.3),
    array('country'=> 'United States', 'year'=> '2008', 'value'=> 74.2),
    array('country'=> 'United States', 'year'=> '2009', 'value'=> 71.2),
    array('country'=> 'United States', 'year'=> '2010', 'value'=> 74.2),
    array('country'=> 'United States', 'year'=> '2011', 'value'=> 78.2)
));

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
