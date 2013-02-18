<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = chart_japan_medals();

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('bubble')
       ->minSize(0)
       ->maxSize(70)
       ->xField('year')
       ->yField('standing')
       ->sizeField('number')
       ->colorField('medalColor')
       ->opacity(0.9);

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->template('#= value.x #: #= value.size # Medals');

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'grouped-data.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();
$dataSource->transport($transport)
           ->addGroupItem(array('field' => 'country'));

$xAxis = new \Kendo\Dataviz\UI\ChartXAxisItem();
$xAxis->labels(array('skip' => 1, 'margin' => array('top' => -25)))
      ->majorUnit(4)
      ->min(1980)
      ->max(2015)
      ->majorGridLines(array('visible' => false))
      ->line(array('visible' => false));

$yAxis = new \Kendo\Dataviz\UI\ChartXAxisItem();
$yAxis->labels(array(
            'step' => 1,
            'skip' => 1,
            'template' => '#= value # place',
            'margin' => array('right' => -30),
            'padding' => array('left' => 20)
        ))
      ->majorUnit(1)
      ->min(0)
      ->max(3.7)
      ->majorGridLines(array('visible' => false))
      ->line(array('visible' => false));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->dataSource($dataSource)
      ->title(array('text', 'Olypmic Medals Won by Japan'))
      ->legend(array('visible' => false))
      ->addSeriesItem($series)
      ->addXAxisItem($xAxis)
      ->addYAxisItem($yAxis)
      ->tooltip($tooltip);

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
