<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$female019 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$female019->name('0-19')
          ->stack('Female')
          ->data(array(854622, 925844, 984930, 1044982, 1100941, 1139797, 1172929, 1184435, 1184654));

$female2039 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$female2039->name('20-39')
           ->stack('Female')
           ->data(array(490550, 555695, 627763, 718568, 810169, 883051, 942151, 1001395, 1058439));

$female4064 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$female4064->name('40-64')
           ->stack('Female')
           ->data(array(379788, 411217, 447201, 484739, 395533, 435485, 499861, 569114, 655066));

$female6579 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$female6579->name('65-79')
           ->stack('Female')
           ->data(array(97894, 113287, 128808, 137459, 152171, 170262, 191015, 210767, 226956));

$female80 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$female80->name('80+')
         ->stack('Female')
         ->data(array(16358, 18576, 24586, 30352, 36724, 42939, 46413, 54984, 66029));

$male019 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$male019->name('0-19')
        ->stack('Male')
        ->data(array(900268, 972205, 1031421, 1094547, 1155600, 1202766, 1244870, 1263637, 1268165));

$male2039 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$male2039->name('20-39')
         ->stack('Male')
         ->data(array(509133, 579487, 655494, 749511, 844496, 916479, 973694, 1036548, 1099507));

$male4064 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$male4064->name('40-64')
         ->stack('Male')
         ->data(array(364179, 401396, 440844, 479798, 390590, 430666, 495030, 564169, 646563));

$male6579 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$male6579->name('65-79')
         ->stack('Male')
         ->data(array(74208, 86516, 98956, 107352, 120614, 138868, 158387, 177078, 192156));

$male80 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$male80->name('80+')
       ->stack('Male')
       ->data(array(9187, 10752, 13007, 15983, 19442, 23020, 25868, 31462, 39223));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();

$valueAxis->labels(array('template' => "#= kendo.format('{0:N0}', value / 1000) # M"))
          ->line(array('visible' => false));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array(1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010))
             ->majorGridLines(array('visible' => false));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->template('#= series.stack #s, age #= series.name #');

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'World population by age group and sex'))
      ->legend(array('visible' => false))
      ->addSeriesItem($female019, $female2039, $female4064, $female6579, $female80,
            $male019, $male2039, $male4064, $male6579, $male80)
      ->addValueAxisItem($valueAxis)
      ->addCategoryAxisItem($categoryAxis)
      ->tooltip($tooltip)
      ->seriesColors(array('#cd1533', '#d43851', '#dc5c71', '#e47f8f',
          '#eba1ad', '#009bd7', '#26aadd', '#4db9e3', '#73c8e9', '#99d7ef'))
      ->seriesDefaults(array('type' => 'column'));

echo $chart->render();
?>

<?php require_once '../../include/footer.php'; ?>
