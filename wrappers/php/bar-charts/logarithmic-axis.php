<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';


$data = array(1, 1);
for ($i = 2; $i < 39; $i++) {
    $data[] = $data[$i - 1] + $data[$i - 2];
}

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->data($data);
        
$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->type('log')
          ->minorGridLines(array('visible' => true));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true);

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->addSeriesItem($series)
      ->addValueAxisItem($valueAxis)
      ->title(array('text' => 'Fibonacci sequence'))
      ->tooltip($tooltip);

echo $chart->render();
?>


<?php require_once '../include/footer.php'; ?>
