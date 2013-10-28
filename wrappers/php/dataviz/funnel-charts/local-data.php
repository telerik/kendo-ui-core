<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('funnel')
       ->field('visitors')
       ->dynamicHeight(false)
       ->dynamicSlope(true)
       ->labels(array(
          'color'=>'black',
          'visible'=>true,
          'background'=>'transparent',
          'align'=>'left',
          'template'=>'#= dataItem.description #: #=value#',
       ))
       ->categoryField('description');

$dataSourceBefore = new \Kendo\Data\DataSource();

$dataSourceBefore->data(array(
    array('description' => 'All Visitors', 'visitors' => 23945),
    array('description' => 'Tried the Demos', 'visitors' => 19165),
    array('description' => 'Downloaded', 'visitors' => 13984),
    array('description' => 'Requested a Quote', 'visitors' => 3216),
    array('description' => 'Purchased', 'visitors' => 1673),
));

$before = new \Kendo\Dataviz\UI\Chart('before');

$before->title(array('text' => 'Before optimization'))
      ->dataSource($dataSourceBefore)
      ->addSeriesItem($series)
      ->legend(array('visible' => false))
      ->tooltip(array('visible' => true, 'template' => '#= dataItem.description # #= kendo.format("{0:p}",data.value/dataItem.parent()[0].visitors)#'));

$dataSourceAfter = new \Kendo\Data\DataSource();

$dataSourceAfter->data(array(
    array('description' => 'All Visitors', 'visitors' => 28536),
    array('description' => 'Tried the Demos', 'visitors' => 26539),
    array('description' => 'Downloaded', 'visitors' => 23088),
    array('description' => 'Requested a Quote', 'visitors' => 13853),
    array('description' => 'Purchased', 'visitors' => 9697),
));

$after = new \Kendo\Dataviz\UI\Chart('after');

$after->title(array('text' => 'After optimization'))
      ->dataSource($dataSourceAfter)
      ->addSeriesItem($series)
      ->legend(array('visible' => false))
      ->tooltip(array('visible' => true, 'template' => '#= dataItem.description # #= kendo.format("{0:p}",data.value/dataItem.parent()[0].visitors)#'));
?>

<div class="chart-wrapper">
    <h2>Website optimization stats</h2>
    <?php echo $before->render();?>
    <?php echo $after->render();?>
</div>

<style scoped>
    .chart-wrapper {
        height: 400px;
        width:730px;
        margin:20px auto;
    }
    .chart-wrapper h2 {
        padding: 20px 0 0 25px;
    }
    .chart-wrapper .k-chart {
        display: inline-block;
        width: 290px;
        height: 350px;
        margin: 0 30px 0 20px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
