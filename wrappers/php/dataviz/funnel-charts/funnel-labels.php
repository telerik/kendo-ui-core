<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('funnel')
       ->data(array(
            array('category' => 'Awareness', 'value' => 4),
            array('category' => 'Interest', 'value' => 3),
            array('category' => 'Desire', 'value' => 2),
            array('category' => 'Action', 'value' => 1),
       ));

$chart = new \Kendo\Dataviz\UI\Chart('chart');

$chart->title(array('text' => 'The AIDA model'))
      ->addSeriesItem($series)
      ->legend(array('position' => 'top'))
      ->tooltip(array('visible' => true, 'template' => "#= category # - #= kendo.format('{0:P}', percentage) #"))
      ->seriesDefaults(array(
                    "dynamicHeight" => false,
                    "labels" => array (
                        "template"=> "#= dataItem.category #",
                        "visible"=> true,
                        "font"=> "15px sans-serif",
                        "align"=> "center",
                        "position"=> "center",
                        "background"=> "transparent",
                        "color"=> "#000",
                        "padding"=> 5,
                        "border"=>array(
                            "width"=> 1,
                            "dashType"=> "dot",
                            "color"=> "#000"
                        ),
                        "format"=> "N0"
                    )
      ));

?>

    <div class="chart-wrapper">
        <?php echo $chart->render(); ?>
    </div>
    <div class="configuration-horizontal">
        <div class="config-section">
            <span class="configHead">Show</span>
            <ul class="options">
                <li>
                    <label>
                        <input id="labels" checked="checked" type="checkbox" autocomplete="off" /> Show labels
                    </label>
                </li>
                <li>
                    <label>
                        <input id="showBorder" type="checkbox" checked="checked" /> Show border
                    </label>
                </li>
            </ul>
        </div>
        <div class="config-section">
            <span class="configHead">Align</span>
            <ul class="options">
                <li>
                    <label>
                        <input name="alignType" type="radio" value="center" checked="checked" autocomplete="off" /> Center
                    </label>
                </li>
                <li>
                    <label>
                        <input name="alignType" type="radio" value="left" autocomplete="off" /> Left
                    </label>
                </li>
                <li>
                    <label>
                        <input name="alignType" type="radio" value="right" autocomplete="off" /> Right
                    </label>
                </li>
            </ul>
        </div>
        <div class="config-section">
            <span class="configHead">Position</span>
            <ul class="options">
                <li>
                    <label>
                        <input name="positionType" type="radio" value="center" checked="checked" autocomplete="off" /> Center
                    </label>
                </li>
                <li>
                    <label>
                        <input name="positionType" type="radio" value="top" autocomplete="off" /> Top
                    </label>
                </li>
                <li>
                    <label>
                        <input name="positionType" type="radio" value="bottom" autocomplete="off" /> Bottom
                    </label>
                </li>
            </ul>
        </div>
        <div class="config-section">
            <span class="configHead">Font color</span>
            <ul class="options">
                <li><label for="color"></label></li>
                <li><input id="color" /></li>
            </ul>
        </div>
        <div class="config-section">
            <span class="configHead">Font size</span>
            <ul class="options">
                <li><input id="sizeSlider" value="15" /></li>
            </ul>
        </div>
    </div>
    <script>
        function createChart() {
            $("#chartFoo").kendoChart({
                title: {
                    text: "The AIDA model"
                },
                legend: {
                    position: "top"
                },
                seriesDefaults: {
                    dynamicHeight: false,
                    labels: {
                        template: "#= dataItem.category #",
                        visible: true,
                        font: "15px sans-serif",
                        align: "center",
                        position: "center",
                        background: "transparent",
                        color: "#000",
                        padding: 5,
                        border: {
                            width: 1,
                            dashType: "dot",
                            color: "#000"
                        },
                        format: "N0"
                    }
                },
                series: [{
                    type: "funnel",
                    data: [{
                        category: "Awareness",
                        value: 4
                    }, {
                        category: "Interest",
                        value: 3
                    }, {
                        category: "Desire",
                        value: 2
                    }, {
                        category: "Action",
                        value: 1
                    }]
                }],
                tooltip: {
                    visible: true,
                    template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                }
            });
        }

        $(document).ready(function () {
            $('#sizeSlider').kendoSlider({
                change: refresh,
                min: 1,
                max: 40
            });
            $('#color').kendoColorPicker({ change: refresh, value: "#000", buttons: false });
            $(document).bind("kendo:skinChange", refresh);
            $(".configuration-horizontal").on("change",":checkbox,:radio", refresh);
        });

        function refresh() {
            var chart = $("#chart").data("kendoChart"),
                slider = $('#sizeSlider').data("kendoSlider"),
                colorPicker = $('#color').data("kendoColorPicker"),
                showBorder = $('#showBorder').is(':checked'),
                funnelSeries = chart.options.series[0],
                labepOptions = funnelSeries.labels,
                labels = $("#labels").prop("checked"),
                alignInputs = $("input[name='alignType']"),
                alignLabels = alignInputs.filter(":checked").val(),
                positionInputs = $("input[name='positionType']"),
                position = positionInputs.filter(":checked").val();

            var borderOptions = showBorder ? {
                    width: 1,
                    dashType: "dot",
                    color: "#000"
                } : {
                    width:0
                };

            var seriesOptions = {
                dynamicHeight: false,
                labels: {
                    template: "#= dataItem.category #",
                    visible: labels,
                    font: slider.value() + "px sans-serif",
                    align: alignLabels,
                    position:position,
                    background: "transparent",
                    color: colorPicker.value(),
                    padding: 5,
                    border: borderOptions,
                    format: "N0"
                }
            }

            $('#showBorder').attr("disabled", !labels);
            alignInputs.attr("disabled", !labels);
            positionInputs.attr("disabled",!labels);
            slider.enable(labels);
            colorPicker.enable(labels);

            chart.setOptions({
                seriesDefaults: seriesOptions,
                transitions : false
            })
        }
    </script>
    <style scoped>
        .chart-wrapper #chart {
            width: 400px;
            height: 410px;
            margin: 0 auto;
        }
        .configuration-horizontal .config-section {
            min-width: 120px;
        }
    </style>
<?php require_once '../../include/footer.php'; ?>
