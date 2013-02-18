<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->xField('price')
       ->yField('performance');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->data(chart_price_performance());

$chart = new \Kendo\Dataviz\UI\Chart('chart');

$chart->title(array('text' => 'Price-Performance Ratio'))
      ->dataSource($dataSource)
      ->addSeriesItem($series)
      ->tooltip(array('visible' => true, 'template' => "#= '<b>$' + value.x + ' / ' + dataItem.family + ' ' + dataItem.model + ': ' + value.y + '%</b>' #"))
      ->addXAxisItem(array(
          'max' => 1000,
          'labels' => array('format' => '${0}'),
          'title' => array('text' => 'Price')
      ))
      ->addYAxisItem(array(
          'min' => 80,
          'labels' => array('format' => '{0}%'),
          'title' => array('text' => 'Performance Ratio')
      ))
      ->legend(array('visible' => false))
      ->seriesDefaults(array('type' => 'scatter'));

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
