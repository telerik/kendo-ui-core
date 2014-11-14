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
    }

    exit;
}

require_once '../include/header.php';
?>

<div class="box">
    <h4>Advanced Export options</h4>
    <div class="box-col">
        <button class='export-pdf k-button'>Export as PDF</button>
    </div>
    <div class="box-col">
        <button class='export-img k-button'>Export as Image</button>
    </div>
    <div class="box-col">
        <button class='export-svg k-button'>Export as SVG</button>
    </div>
</div>

<script>
    $(".export-pdf").click(function() {
        var chart = $("#chart").getKendoChart();
        chart.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "chart.pdf",
                proxyURL: "export.php?type=save"
            });
        });
    });

    $(".export-img").click(function() {
        var chart = $("#chart").getKendoChart();
        chart.exportImage().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "chart.png",
                proxyURL: "export.php?type=save"
            });
        });
    });

    $(".export-svg").click(function() {
        var chart = $("#chart").getKendoChart();
        chart.exportSVG().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "chart.svg",
                proxyURL: "export.php?type=save"
            });
        });
    });
</script>

<?php
$battery = new \Kendo\Dataviz\UI\ChartSeriesItem();
$battery->type('column')
        ->data(array(20, 40, 45, 30, 50))
        ->stack(true)
        ->name('on battery')
        ->color('#cc6e38');

$gas = new \Kendo\Dataviz\UI\ChartSeriesItem();
$gas->type('column')
    ->data(array(20, 30, 35, 35, 40))
    ->stack(true)
    ->name('on gas')
    ->color('#ef955f');

$mpg = new \Kendo\Dataviz\UI\ChartSeriesItem();
$mpg->type('line')
    ->data(array(30, 38, 40, 32, 42))
    ->name('mpg')
    ->color('#ec5e0a')
    ->axis('mpg');

$l100km = new \Kendo\Dataviz\UI\ChartSeriesItem();
$l100km->type('line')
       ->data(array(7.8, 6.2, 5.9, 7.4, 5.6))
       ->name('l/100 km')
       ->color('#4e4141')
       ->axis('l100km');

$milesAxis= new \Kendo\Dataviz\UI\ChartValueAxisItem();

$milesAxis->title(array('text' => 'miles'))
          ->min(0)
          ->max(100);

$kmAxis= new \Kendo\Dataviz\UI\ChartValueAxisItem();

$kmAxis->name('km')
       ->title(array('text' => 'km'))
       ->min(0)
       ->max(161)
       ->majorUnit(32);

$mpgAxis= new \Kendo\Dataviz\UI\ChartValueAxisItem();

$mpgAxis->name('mpg')
       ->title(array('text' => 'miles per gallo'))
       ->color('#642381');

$l100kmAxis= new \Kendo\Dataviz\UI\ChartValueAxisItem();

$l100kmAxis->name('l100km')
           ->title(array('text' => 'liters per 100km'))
           ->color('#e5388a');

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array('Mon', 'Tue', 'Wed', 'Thu', 'Fri'))
             ->axisCrossingValue(array(0, 0, 10, 10));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Hybrid car mileage report'))
      ->legend(array('position' => 'top'))
      ->addSeriesItem($battery, $gas, $mpg, $l100km)
      ->addValueAxisItem($milesAxis, $kmAxis, $mpgAxis, $l100kmAxis)
      ->addCategoryAxisItem($categoryAxis);

echo $chart->render();
?>

<?php require_once '../include/footer.php'; ?>
