<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';

$seriesDefault = array(
        'type'=>'funnel',
        'dynamicHeight'=>false,
        'dynamicSlope'=>false,
        'labels'=>array(
            'visible' => true,
            'background' => 'transparent',
            'color'=>'white',
            'format'=>'N0',
        )
      );
$series = new \Kendo\Dataviz\UI\ChartSeriesItem();

$series->data(array(
            array('category' => 'Impressions', 'value' => 434823, 'color' => '#0e5a72'),
            array('category' => 'Clicks', 'value' => 356854, 'color' => '#166f99'),
            array('category' => 'Unique Visitors', 'value' => 280022, 'color' => '#2185b4'),
            array('category' => 'Downloads', 'value' => 190374, 'color' => '#319fd2'),
            array('category' => 'Purchases', 'value' => 120392, 'color' => '#3eaee2'),
        ));

$chart_oct = new \Kendo\Dataviz\UI\Chart('chart-oct');

$chart_oct->title(array('position' => 'bottom', 'text' => 'October'))
      ->addSeriesItem($series)
      ->seriesDefaults($seriesDefault)
      ->legend(array('visible' => false))
      ->tooltip(array('visible' => true, 'template' => '#=dataItem.category#'));

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series
       ->data(array(
            array('category' => 'Impressions', 'value' => 444444, 'color' => '#0e5a72'),
            array('category' => 'Clicks', 'value' => 356854, 'color' => '#166f99'),
            array('category' => 'Unique Visitors', 'value' => 280022, 'color' => '#2185b4'),
            array('category' => 'Downloads', 'value' => 190374, 'color' => '#319fd2'),
            array('category' => 'Purchases', 'value' => 120392, 'color' => '#3eaee2'),
        ));

$chart_nov = new \Kendo\Dataviz\UI\Chart('chart-nov');

$chart_nov->title(array('position' => 'bottom', 'text' => 'October'))
      ->seriesDefaults($seriesDefault)
      ->addSeriesItem($series)
      ->legend(array('visible' => false))
      ->tooltip(array('visible' => true, 'template' => '#=dataItem.category#'));

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->data(array(
            array('category' => 'Impressions', 'value' => 222222, 'color' => '#0e5a72'),
            array('category' => 'Clicks', 'value' => 356854, 'color' => '#166f99'),
            array('category' => 'Unique Visitors', 'value' => 280022, 'color' => '#2185b4'),
            array('category' => 'Downloads', 'value' => 190374, 'color' => '#319fd2'),
            array('category' => 'Purchases', 'value' => 120392, 'color' => '#3eaee2'),
        ));

$chart_dec = new \Kendo\Dataviz\UI\Chart('chart-dec');

$chart_dec->title(array('position' => 'bottom', 'text' => 'October'))
      ->seriesDefaults($seriesDefault)
      ->addSeriesItem($series)
      ->legend(array('visible' => false))
      ->tooltip(array('visible' => true, 'template' => '#=dataItem.category#'));
?>
    <div class="chart-wrapper">
        <h2>Sales statistics</h2>
        <?php echo $chart_oct->render() ?>
        <?php echo $chart_nov->render() ?>
        <?php echo $chart_dec->render() ?>
    </div>
    <div class="configuration-horizontal">
        <div class="config-section">
            <span class="configHead">Dynamic Slope</span>
            <ul class="options">
                <li>
                    <label>
                        <input type="checkbox" id="dynamicSlope"/> True
                    </label>
                </li>
            </ul>
        </div>
        <div class="config-section">
            <span class="configHead">Dynamic Height</span>
            <ul class="options">
                <li>
                    <label>
                        <input type="checkbox" id="dynamicHeight"/> True
                    </label>
                </li>
            </ul>
        </div>
        <div class="config-section">
            <span class="configHead">Neck Size Ratio</span>
            <ul class="options">
                <li><input id="neckSlider" value="0.3"/></li>
            </ul>
        </div>
    </div>
    <style scoped>
        .chart-wrapper {
            height: 360px;
        }
        .chart-wrapper h2 {
            padding: 20px 0 0 25px;
        }
        #chart-oct,
        #chart-nov,
        #chart-dec {
            display: inline-block;
            width: 180px;
            height: 300px;
            margin: 15px 25px;
        }
    </style>
    <script>

        function refresh() {
            var slider = $('#neckSlider').data("kendoSlider");
            var chartNames = ["chart-oct", "chart-nov", "chart-dec"];

            for (var idx in chartNames) {
                var chart = $("#" + chartNames[idx]).data("kendoChart");

                var options =
                {
                    seriesDefaults: {
                        type:"funnel",
                        neckRatio: slider.value(),
                        dynamicHeight : $('#dynamicHeight').is(':checked'),
                        dynamicSlope : $('#dynamicSlope').is(':checked'),
                        labels:{
                            'visible' : true,
                            'background' : 'transparent',
                            'color':'white',
                            'format':'N0'
                        }
                    },
                }

                chart.setOptions(options);
                slider.enable(!options.seriesDefaults.dynamicSlope);
            }
        }

        $(document).ready(function () {
            $("#neckSlider").kendoSlider({
                change: refresh,
                value: 0.3,
                min: 0,
                max: 10,
                smallStep: 0.01,
                largeStep: 0.1
            });

            $('.configuration-horizontal').on('click', ':checkbox', refresh);
        });

    </script>

<?php require_once '../../include/footer.php'; ?>
