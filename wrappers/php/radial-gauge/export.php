<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';

require_once '../include/header.php';
$gauge = new \Kendo\Dataviz\UI\RadialGauge('gauge');

$pointer0 = new \Kendo\Dataviz\UI\RadialGaugePointerItem('pointer0');
$pointer0->value(10)->color("#c20000");
$pointer0cap = new \Kendo\Dataviz\UI\RadialGaugePointerItemCap('pointer0cap');
$pointer0cap->size(0.15);
$pointer0->cap($pointer0cap);

$pointer1 = new \Kendo\Dataviz\UI\RadialGaugePointerItem('pointer1');
$pointer1->value(70)->color("#ff7a00");
$pointer1cap = new \Kendo\Dataviz\UI\RadialGaugePointerItemCap('pointer1cap');
$pointer1cap->size(0.1);
$pointer1->cap($pointer1cap);

$pointer2 = new \Kendo\Dataviz\UI\RadialGaugePointerItem('pointer2');
$pointer2->value(140)->color("#ffc700");

$gauge->pointer(array($pointer0, $pointer1, $pointer2))
      ->scale(array('minorUnit' => 5,
                    'max' => 180,
                    'startAngle' => -30,
                    'endAngle' => 210,
                    'labels' => array('position' => 'inside'), 'ranges' => array(
                        array('from' => 80, 'to' => 120, 'color' => '#bb6e36'),
                        array('from' => 120, 'to' => 150, 'color' => '#b8b8b8'),
                        array('from' => 150, 'to' => 180, 'color' => '#f3ac32'),
                    ))
      );

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
        <?php 
            echo $gauge->render();
        ?>
    </div>
    <script>
        $(".export-pdf").click(function() {
            var gauge = $("#gauge").getKendoRadialGauge();
            gauge.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
                kendo.saveAs({
                    dataURI: data,
                    fileName: "chart.pdf",
                    proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
                });
            });
        });

        $(".export-img").click(function() {
            var gauge = $("#gauge").getKendoRadialGauge();
            gauge.exportImage().done(function(data) {
                kendo.saveAs({
                    dataURI: data,
                    fileName: "chart.png",
                    proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
                });
            });
        });

        $(".export-svg").click(function() {
            var gauge = $("#gauge").getKendoRadialGauge();
            gauge.exportSVG().done(function(data) {
                kendo.saveAs({
                    dataURI: data,
                    fileName: "chart.svg",
                    proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
                });
            });
        });
    </script>
    <style>
        #gauge-container {
            background: transparent url("../content/dataviz/gauge/gauge-container.png") no-repeat 50% 50%;
            width: 404px;
            height: 404px;
            text-align: center;
            margin: 0 auto 30px auto;
        }

        #gauge {
            width: 330px;
            height: 330px;
            margin: 0 auto 0;
        }
    </style>
</div>


<?php require_once '../include/footer.php'; ?>