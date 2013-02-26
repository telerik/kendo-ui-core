<?php
    require_once '../../lib/Kendo/Autoload.php';
    require_once '../../include/header.php';
?>

<div class="chart-wrapper">
    <table class="history">
        <tr>
            <td class="item">mmHg</td>
            <td class="chart">
            <?php
                $mmHg = new \Kendo\Dataviz\UI\ChartSeriesItem();
                $mmHg->data(array(array(750, 762.5)));

                $plotband1 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
                $plotband1->from(715)
                          ->to(752)
                          ->color('#ccc')
                          ->opacity(0.6);

                $plotband2 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
                $plotband2->from(752)
                          ->to(772)
                          ->color('#ccc')
                          ->opacity(0.3);

                $valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
                $valueAxis->min(715)
                          ->max(795)
                          ->majorGridLines(array('visible' => false))
                          ->majorTicks(array('visible' => false))
                          ->addPlotBand($plotband1, $plotband2);

                $categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
                $categoryAxis->majorGridLines(array('visible' => false))
                             ->majorTicks(array('visible' => false));

                $tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
                $tooltip->visible(true)
                        ->shared(true)
                        ->template('Maximum: #= value.target # <br /> Average: #= value.current #');

                $chart_mmHg = new \Kendo\Dataviz\UI\Chart('chart-mmHg');
                $chart_mmHg->addSeriesItem($mmHg)
                           ->addValueAxisItem($valueAxis)
                           ->addCategoryAxisItem($categoryAxis)
                           ->legend(array('visible' => false))
                           ->chartArea(array('margin' => array('left' => 0)))
                           ->seriesDefaults(array('type' => 'bullet'))
                           ->tooltip($tooltip);

                echo $chart_mmHg->render();
            ?>
            </td>
        </tr>
        <tr>
            <td class="item">hPa</td>
            <td class="chart">
            <?php
                $hPa = new \Kendo\Dataviz\UI\ChartSeriesItem();
                $hPa->data(array(array(1001, 1017)));

                $plotband1 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
                $plotband1->from(955)
                          ->to(1002)
                          ->color('#ccc')
                          ->opacity(0.6);

                $plotband2 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
                $plotband2->from(1002)
                          ->to(1027)
                          ->color('#ccc')
                          ->opacity(0.3);

                $valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
                $valueAxis->min(955)
                          ->max(1055)
                          ->majorGridLines(array('visible' => false))
                          ->majorTicks(array('visible' => false))
                          ->addPlotBand($plotband1, $plotband2);

                $categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
                $categoryAxis->majorGridLines(array('visible' => false))
                             ->majorTicks(array('visible' => false));

                $tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
                $tooltip->visible(true)
                        ->shared(true)
                        ->template('Maximum: #= value.target # <br /> Average: #= value.current #');

                $chart_hPa = new \Kendo\Dataviz\UI\Chart('chart-hPa');
                $chart_hPa->addSeriesItem($hPa)
                          ->addValueAxisItem($valueAxis)
                          ->addCategoryAxisItem($categoryAxis)
                          ->legend(array('visible' => false))
                          ->chartArea(array('margin' => array('left' => 0)))
                          ->seriesDefaults(array('type' => 'bullet'))
                          ->tooltip($tooltip);

                echo $chart_hPa->render();
            ?>
            </td>
        </tr>
        <tr>
            <td class="item">hum</td>
            <td class="chart">
            <?php
                $hum = new \Kendo\Dataviz\UI\ChartSeriesItem();
                $hum->data(array(array(45, 60)));

                $plotband1 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
                $plotband1->from(0)
                          ->to(33)
                          ->color('#ccc')
                          ->opacity(0.6);

                $plotband2 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
                $plotband2->from(33)
                          ->to(66)
                          ->color('#ccc')
                          ->opacity(0.3);

                $valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
                $valueAxis->min(0)
                          ->max(100)
                          ->majorGridLines(array('visible' => false))
                          ->majorTicks(array('visible' => false))
                          ->addPlotBand($plotband1, $plotband2);

                $categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
                $categoryAxis->majorGridLines(array('visible' => false))
                             ->majorTicks(array('visible' => false));

                $tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
                $tooltip->visible(true)
                        ->shared(true)
                        ->template('Maximum: #= value.target # <br /> Average: #= value.current #');

                $chart_hum = new \Kendo\Dataviz\UI\Chart('chart-hum');
                $chart_hum->addSeriesItem($hum)
                          ->addValueAxisItem($valueAxis)
                          ->addCategoryAxisItem($categoryAxis)
                          ->legend(array('visible' => false))
                          ->chartArea(array('margin' => array('left' => 0)))
                          ->seriesDefaults(array('type' => 'bullet'))
                          ->tooltip($tooltip);

                echo $chart_hum->render();
            ?>
            </td>
        </tr>
        <tr>
            <td class="item">temp</td>
            <td class="chart">
            <?php
                $temp = new \Kendo\Dataviz\UI\ChartSeriesItem();
                $temp->data(array(array(25, 22)));

                $plotband1 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
                $plotband1->from(0)
                          ->to(10)
                          ->color('yellow')
                          ->opacity(0.3);

                $plotband2 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
                $plotband2->from(10)
                          ->to(20)
                          ->color('orange')
                          ->opacity(0.3);

                $plotband3 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
                $plotband3->from(20)
                          ->to(30)
                          ->color('red')
                          ->opacity(0.3);

                $valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
                $valueAxis->min(0)
                          ->max(30)
                          ->majorGridLines(array('visible' => false))
                          ->majorTicks(array('visible' => false))
                          ->addPlotBand($plotband1, $plotband2, $plotband3);

                $categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
                $categoryAxis->majorGridLines(array('visible' => false))
                             ->majorTicks(array('visible' => false));

                $tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
                $tooltip->visible(true)
                        ->shared(true)
                        ->template('Maximum: #= value.target # <br /> Average: #= value.current #');

                $chart_temp = new \Kendo\Dataviz\UI\Chart('chart-temp');
                $chart_temp->addSeriesItem($temp)
                           ->addValueAxisItem($valueAxis)
                           ->addCategoryAxisItem($categoryAxis)
                           ->legend(array('visible' => false))
                           ->chartArea(array('margin' => array('left' => 0)))
                           ->seriesDefaults(array('type' => 'bullet'))
                           ->tooltip($tooltip);

                echo $chart_temp->render();
            ?>
            </td>
        </tr>
    </table>
</div>

<style>
    .history {
        border-collapse: collapse;
        width: 100%;
    }
    .history td.chart {
        width: 430px;
    }
    .history .k-chart {
        height: 65px;
        width: 400px;
    }
    .history td.item {
        line-height: 65px;
        width: 20px;
        text-align: right;
        padding-bottom: 22px;
    }

    .chart-wrapper  {
        width: 450px;
        height: 350px;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
