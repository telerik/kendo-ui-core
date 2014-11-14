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

<div id="gauge-container">
    <?php
        echo $gauge->render();
    ?>
</div>

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
        *display: inline;
        zoom: 1;
    }
</style>

<?php require_once '../include/footer.php'; ?>
