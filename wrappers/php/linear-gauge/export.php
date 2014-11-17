<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';

require_once '../include/header.php';
$gauge = new \Kendo\Dataviz\UI\LinearGauge('gauge');

$pointer0 = new \Kendo\Dataviz\UI\LinearGaugePointerItem('pointer0');
$pointer0->value(10)->color("#c20000")->shape("arrow");

$pointer1 = new \Kendo\Dataviz\UI\LinearGaugePointerItem('pointer1');
$pointer1->value(50)->margin(10)->color("#ff7a00");

$pointer2 = new \Kendo\Dataviz\UI\LinearGaugePointerItem('pointer2');
$pointer2->value(30)->color("#ffc700");

$pointer3 = new \Kendo\Dataviz\UI\LinearGaugePointerItem('pointer3');
$pointer3->value(45)->color("#428bca")->shape("arrow");

$gauge->pointer(array($pointer0, $pointer1, $pointer2, $pointer3))
      ->scale(array('majorUnit' => 20, 'minorUnit' => 2,'min' => -40,
      'max' => 60, 'vertical' => true, 'ranges' => array(
          array('from' => -40, 'to' => -20, 'color' => '#2798df'),
          array('from' => 30, 'to' => 45, 'color' => '#ffc700'),
          array('from' => 45, 'to' => 60, 'color' => '#c20000'),
      )));
?>

<div id="example">
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
    <div id="gauge-container" class="demo-section">
        <?php echo $gauge->render(); ?>
    </div>
    <script>
        $(".export-pdf").click(function () {
            var gauge = $("#gauge").getKendoLinearGauge();
            gauge.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
                kendo.saveAs({
                    dataURI: data,
                    fileName: "chart.pdf",
                    proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
                });
            });
        });

        $(".export-img").click(function () {
            var gauge = $("#gauge").getKendoLinearGauge();
            gauge.exportImage().done(function (data) {
                kendo.saveAs({
                    dataURI: data,
                    fileName: "chart.png",
                    proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
                });
            });
        });

        $(".export-svg").click(function () {
            var gauge = $("#gauge").getKendoLinearGauge();
            gauge.exportSVG().done(function (data) {
                kendo.saveAs({
                    dataURI: data,
                    fileName: "chart.svg",
                    proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
                });
            });
        });
    </script>
    <style scoped>
	    #gauge-container {
	        text-align: center;
	        margin: 0 auto;
	        background: transparent url("../content/dataviz/gauge/linear-gauge-container.png") no-repeat 50% 50%;
	        padding: 18px;
	        width: 300px;
	        height: 300px;
	    }

	    #gauge {
	        height: 300px;
	        display: inline-block;
	        zoom: 1;
	    }
	</style>
</div>