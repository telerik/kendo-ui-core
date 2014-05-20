<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';
require_once '../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('boxPlot')       
       ->lowerField('lower')
       ->q1Field('q1')
       ->medianField('median')
       ->q3Field('q3')
       ->upperField('upper')
       ->meanField('mean')
       ->outliersField('outliers');       
       
$dataSource = new \Kendo\Data\DataSource();

$dataSource->data(ozone_oncentration());

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
<?php require_once '../include/footer.php'; ?>
