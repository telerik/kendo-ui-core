<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('pie')
       ->field('percentage')
       ->categoryField('source')
       ->explodeField('explode');

$dataSource = new \Kendo\Data\DataSource();

$dataSource->data(array(
    array('source' => 'Hydro', 'percentage' => 22, 'explode' => true),
    array('source' => 'Solar', 'percentage' => 2),
    array('source' => 'Nuclear', 'percentage' => 49),
    array('source' => 'Wind', 'percentage' => 27)
));

$chart = new \Kendo\Dataviz\UI\Chart('chart');

$chart->title(array('text' => 'Break-up of Spain Electricity Production for 2008'))
      ->dataSource($dataSource)
      ->addSeriesItem($series)
      ->legend(array('position' => 'bottom'))
      ->seriesColors(array('#42a7ff', '#666666', '#999999', '#cccccc'))
      ->tooltip(array('visible' => true, 'template' => '${ category } - ${ value }%'));

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
