<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('pie')
       ->startAngle(150)
       ->data(array(
            array('category' => 'Asia', 'value' => 53.8, 'color' => '#9de219'),
            array('category' => 'Europe', 'value' => 16.1, 'color' => '#90cc38'),
            array('category' => 'Latin America', 'value' => 11.3, 'color' => '#068c35'),
            array('category' => 'Africa', 'value' => 9.6, 'color' => '#006634'),
            array('category' => 'Middle East', 'value' => 5.2, 'color' => '#004d38'),
            array('category' => 'North America', 'value' => 3.6, 'color' => '#033939')
        ))
        ->labels(array(
            'visible' => true,
            'background' => 'transparent',
            'position' => 'outsideEnd',
            'template' => '#= category #: #= value#%'
        ));

$chart = new \Kendo\Dataviz\UI\Chart('chart');

$chart->title(array('position' => 'bottom', 'text' => 'Share of Internet Population Growth, 2007 - 2012'))
      ->addSeriesItem($series)
      ->legend(array('visible' => false))
      ->tooltip(array('visible' => true, 'template' => '#= category # (#= series.name #): #= value #%'));

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
