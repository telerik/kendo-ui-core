<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../lib/DataSourceResult.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));

    $result = new DataSourceResult('sqlite:../../sample.db');

    echo json_encode($result->read('Intraday', array('Date', 'Open', 'High', 'Low', 'Close'), $request));

    exit;
}

require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\StockChartSeriesItem();
$series->type('candlestick')
       ->openField('Open')
       ->highField('High')
       ->lowField('Low')
       ->closeField('Close');


$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'virtualization.php', 'type' => 'POST', 'dataType' => 'json'))
          ->parameterMap('function(data) {
              return kendo.stringify(data);
          }');

$model = new \Kendo\Data\DataSourceSchemaModel();
$model->addField(array('field' => 'Date', 'type' => 'date'));

$schema = new \Kendo\Data\DataSourceSchema();
$schema->model($model);

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->schema($schema)
           ->serverFiltering(true);

$navigator = new \Kendo\Dataviz\UI\StockChartNavigator();

$navigator->addSeriesItem(array('type' => 'area', 'field' => 'Close'))
          ->dataSource($dataSource)
          ->select(array('from' => '2009/02/05', 'to' => '2011/10/07'));

$chart = new \Kendo\Dataviz\UI\StockChart('stock-chart');

$chart->dataSource($dataSource)
      ->title(array('text' => 'The ACME Company'))
      ->dateField('Date')
      ->addSeriesItem($series)
      ->navigator($navigator);

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
