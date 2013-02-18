<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

require_once '../../include/header.php';
$gauge = new \Kendo\Dataviz\UI\LinearGauge('gauge');
$gauge->pointer(array('value' => 28))
      ->scale(array('majorUnit' => 20, 'minorUnit' => 2,'min' => -40,
      'max' => 60, 'vertical' => true, 'ranges' => array(
          array('from' => -40, 'to' => -20, 'color' => '#2798df'),
          array('from' => 30, 'to' => 45, 'color' => '#ffc700'),
          array('from' => 45, 'to' => 60, 'color' => '#c20000'),
      )));

echo $gauge->render();
?>
<?php require_once '../../include/footer.php'; ?>
