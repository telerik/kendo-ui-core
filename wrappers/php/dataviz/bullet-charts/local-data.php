<?php
    require_once '../../lib/Kendo/Autoload.php';
    require_once '../../include/header.php';
    require_once '../../include/chart_data.php';
?>

<div class="chart-wrapper">
    <?php
        $mmHg = new \Kendo\Dataviz\UI\ChartSeriesItem();
        $mmHg->currentField('current')
             ->targetField('target')
             ->type('verticalBullet')
             ->opacity(0.8)
             ->color('#ffffff')
             ->target(array('color' => '#ffffff'));

        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data(mmHg_data());

        $plotband1 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
        $plotband1->from(715)
                  ->to(752)
                  ->color('#2890cc')
                  ->opacity(0.5);

        $plotband2 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
        $plotband2->from(752)
                  ->to(772)
                  ->color('#2890cc')
                  ->opacity(0.7);

        $plotband3 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
        $plotband3->from(772)
                  ->to(790)
                  ->color('#2890cc')
                  ->opacity(0.5);

        $plotband4 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
        $plotband4->from(761)
                  ->to(761.5)
                  ->color('#ff0000')
                  ->opacity(1);

        $valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
        $valueAxis->min(715)
                  ->max(790)
                  ->majorGridLines(array('visible' => false))
                  ->minorTicks(array('visible' => true))
                  ->addPlotBand($plotband1, $plotband2, $plotband3, $plotband4);

        $categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
        $categoryAxis->majorGridLines(array('visible' => false))
                     ->majorTicks(array('visible' => false))
                     ->field('category')
                     ->title(array('text' => 'mmHg'));

        $tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
        $tooltip->visible(true)
                ->shared(true)
                ->template('Maximum: #= value.target # <br /> Average: #= value.current #');

        $chart_mmHg = new \Kendo\Dataviz\UI\Chart('chart-mmHg');
        $chart_mmHg->addSeriesItem($mmHg)
                   ->dataSource($dataSource)
                   ->addValueAxisItem($valueAxis)
                   ->addCategoryAxisItem($categoryAxis)
                   ->legend(array('visible' => false))
                   ->chartArea(array('margin' => array('left' => 0)))
                   ->tooltip($tooltip);

        echo $chart_mmHg->render();
    ?>
    <?php
        $hPa = new \Kendo\Dataviz\UI\ChartSeriesItem();
        $hPa->currentField('current')
            ->targetField('target')
            ->type('verticalBullet')
            ->opacity(0.8)
            ->color('#ffffff')
            ->target(array('color' => '#ffffff'));

        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data(hPa_data());

        $plotband1 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
        $plotband1->from(955)
                  ->to(1002)
                  ->color('#8ebc00')
                  ->opacity(0.6);

        $plotband2 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
        $plotband2->from(1002)
                  ->to(1027)
                  ->color('#8ebc00')
                  ->opacity(0.8);

        $plotband3 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
        $plotband3->from(1027)
                  ->to(1050)
                  ->color('#8ebc00')
                  ->opacity(0.6);

        $plotband4 = new \Kendo\Dataviz\UI\ChartXAxisItemPlotBand();
        $plotband4->from(1014)
                  ->to(1014.5)
                  ->color('#ff0000')
                  ->opacity(1);

        $valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
        $valueAxis->min(955)
                  ->max(1050)
                  ->majorGridLines(array('visible' => false))
                  ->minorTicks(array('visible' => true))
                  ->addPlotBand($plotband1, $plotband2, $plotband3, $plotband4);

        $categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
        $categoryAxis->majorGridLines(array('visible' => false))
                     ->majorTicks(array('visible' => false))
                     ->axisCrossingValue(14)
                     ->field('category')
                     ->title(array('text' => 'hPa'));

        $tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
        $tooltip->visible(true)
                ->shared(true)
                ->template('Maximum: #= value.target # <br /> Average: #= value.current #');

        $chart_hPa = new \Kendo\Dataviz\UI\Chart('chart-hPa');
        $chart_hPa->addSeriesItem($hPa)
                  ->dataSource($dataSource)
                  ->addValueAxisItem($valueAxis)
                  ->addCategoryAxisItem($categoryAxis)
                  ->legend(array('visible' => false))
                  ->chartArea(array('margin' => array('left' => 0)))
                  ->tooltip($tooltip);

        echo $chart_hPa->render();
    ?>
</div>

<style>
    .chart-wrapper  {
        padding-top: 20px;
    }
    .chart-wrapper .k-chart {
        width: 325px;
        margin: 0 10px;
        display: inline-block;
    }
    .chart-wrapper .k-tooltip {
        text-align: left;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
