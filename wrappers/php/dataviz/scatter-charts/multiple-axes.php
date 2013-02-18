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

$power = new \Kendo\Dataviz\UI\ChartSeriesItem();
$power->name('Power')
      ->xField('rpm')
      ->yField('power')
      ->tooltip(array('format' => '{1} bhp @ {0:N0} rpm'));

$torque = new \Kendo\Dataviz\UI\ChartSeriesItem();
$torque->name('Torque')
       ->xField('rpm')
       ->yField('torque')
       ->tooltip(array('format' => '{1} lb-ft @ {0:N0} rpm'));

$dataSource = new \Kendo\Data\DataSource();

$dataSource ->data(array(
                array('rpm' => 1000, 'torque' => 50,  'power' => 10),
                array('rpm' => 1500, 'torque' => 65,  'power' => 19),
                array('rpm' => 2000, 'torque' => 80,  'power' => 30),
                array('rpm' => 2500, 'torque' => 92,  'power' => 44),
                array('rpm' => 3000, 'torque' => 104, 'power' => 59),
                array('rpm' => 3500, 'torque' => 114, 'power' => 76),
                array('rpm' => 4000, 'torque' => 120, 'power' => 91),
                array('rpm' => 4500, 'torque' => 125, 'power' => 107),
                array('rpm' => 5000, 'torque' => 130, 'power' => 124),
                array('rpm' => 5500, 'torque' => 133, 'power' => 139),
                array('rpm' => 6000, 'torque' => 130, 'power' => 149),
                array('rpm' => 6500, 'torque' => 122, 'power' => 151),
                array('rpm' => 7000, 'torque' => 110, 'power' => 147)
            ));

$chart = new \Kendo\Dataviz\UI\Chart('chart');

$chart->title(array('text' => 'Dyno run results'))
      ->dataSource($dataSource)
      ->legend(array('visible' => false))
      ->addSeriesItem($power, $torque)
      ->tooltip(array('visible' => true))
      ->addXAxisItem(array(
          'title' => 'Engine rpm',
          'axisCrossingValue' => array(0, 10000),
          'labels' => array(
              'format' => 'N0'
          )
      ))
      ->addYAxisItem(array(
          'title' => array('text' => 'Power (bhp)')
      ), array(
          'title' => array('text' => 'Torque (lb-ft)')
      ))
      ->seriesDefaults(array('type' => 'scatterLine', 'scatterLine' => array('width' => 2)));

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
