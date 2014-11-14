<?php
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $type = $_GET['type'];
    if ($type == 'save') {
        $fileName = $_POST['fileName'];
        $contentType = $_POST['contentType'];
        $base64 = $_POST['base64'];

        $data = base64_decode($base64);

        header('Content-Type:' . $contentType);
        header('Content-Length:' . strlen($data));
        header('Content-Disposition: attachment; filename=' . $fileName);

        echo $data;
    } else {
        header('Content-Type: application/json');
        $result = json_decode(file_get_contents('../content/dataviz/js/boeing-stock.json'));
        echo json_encode($result);
    }

    exit;
}

require_once '../include/header.php';
?>

<div class="box">
    <h4>Export Stock Chart</h4>
    <div class="box-col">
        <button class='export-pdf k-button'>Save as PDF</button>
    </div>
</div>

<script>
    $(".export-pdf").click(function() {
        $("#stock-chart").getKendoStockChart().saveAsPDF();
    });
</script>

<?php
$pdf = new \Kendo\Dataviz\UI\ChartPdf();
$pdf->fileName('Kendo UI Stock Chart Export.pdf')
    ->proxyURL('pdf-export.php?type=save');

$stock = new \Kendo\Dataviz\UI\StockChartSeriesItem();
$stock->type('candlestick')
       ->openField('Open')
       ->highField('High')
       ->lowField('Low')
       ->closeField('Close');

$volume = new \Kendo\Dataviz\UI\StockChartSeriesItem();
$volume->type('column')
       ->field('Volume')
       ->axis('volumeAxis')
       ->tooltip(array('format' => '{0:C0}'));

$navigator = new \Kendo\Dataviz\UI\StockChartNavigator();

$navigator->addSeriesItem(array('type' => 'area', 'field' => 'Close'))
          ->select(array('from' => '2009/02/05', 'to' => '2011/10/07'));

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'panes.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport);

$chart = new \Kendo\Dataviz\UI\StockChart('stock-chart');

$chart->pdf($pdf)
      ->dataSource($dataSource)
      ->title(array('text' => 'The Boeing Company (NYSE:BA)'))
      ->dateField('Date')
      ->addPane(
          array('title' => 'Value'),
          array('name' => 'volumePane', 'title' => 'Volume', 'height' => 150))
      ->addCategoryAxisItem(array('pane' => 'volumePane'))
      ->addValueAxisItem(
          array('line' => array('visible' => false)),
          array('name' => 'volumeAxis', 'pane' => 'volumePane', 'visible' => false))
      ->addSeriesItem($stock, $volume)
      ->navigator($navigator);

echo $chart->render();
?>

<style scoped>
.k-chart {
    height: 600px;
}
</style>

<?php require_once '../include/footer.php'; ?>
