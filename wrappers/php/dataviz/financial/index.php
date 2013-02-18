<?php
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = json_decode(file_get_contents('../../content/dataviz/js/boeing-stock.json'));

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\StockChartSeriesItem();
$series->type('candlestick')
       ->openField('Open')
       ->highField('High')
       ->lowField('Low')
       ->closeField('Close');

$navigator = new \Kendo\Dataviz\UI\StockChartNavigator();

$navigator->addSeriesItem(array('type' => 'area', 'field' => 'Close'))
          ->select(array('from' => '2009/02/05', 'to' => '2011/10/07'));

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'index.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport);

$chart = new \Kendo\Dataviz\UI\StockChart('stock-chart');

$chart->dataSource($dataSource)
      ->title(array('text' => 'The Boeing Company (NYSE:BA)'))
      ->dateField('Date')
      ->addSeriesItem($series)
      ->navigator($navigator);

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
