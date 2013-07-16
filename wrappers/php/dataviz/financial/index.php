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

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->notes(array('data' => array(
    array('value' => '2001/01/01', 'label' => array('text' => '01')),
    array('value' => '2002/01/01', 'label' => array('text' => '02')),
    array('value' => '2003/01/01', 'label' => array('text' => '03')),
    array('value' => '2004/01/01', 'label' => array('text' => '04')),
    array('value' => '2005/01/01', 'label' => array('text' => '05')),
    array('value' => '2006/01/01', 'label' => array('text' => '06')),
    array('value' => '2007/01/01', 'label' => array('text' => '07')),
    array('value' => '2008/01/01', 'label' => array('text' => '08')),
    array('value' => '2009/01/01', 'label' => array('text' => '09')),
    array('value' => '2010/01/01', 'label' => array('text' => '10')),
    array('value' => '2011/01/01', 'label' => array('text' => '11')),
    array('value' => '2012/01/01', 'label' => array('text' => '12'))
)));

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'index.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport);

$chart = new \Kendo\Dataviz\UI\StockChart('stock-chart');

$chart->dataSource($dataSource)
      ->title(array('text' => 'The Boeing Company (NYSE:BA)'))
      ->dateField('Date')
      ->addSeriesItem($series)
      ->addCategoryAxisItem($categoryAxis)
      ->navigator($navigator);

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
