<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$dataSource = new \Kendo\Data\DataSource();
$dataSource->type("geojson")
           ->transport(array('read' => '../content/dataviz/map/us.geo.json'));

$layer = new \Kendo\Dataviz\UI\MapLayer();
$layer->type("shape")
      ->dataSource($dataSource)
      ->style(array(
          'stroke' =>array('color' => '#ccebc5'),
          'fill' => array('color' => '#b3cde3')
      ));

$map = new \Kendo\Dataviz\UI\Map('map');
$map->center(array(39.6924, -97.3370))
    ->zoom(4)
    ->addLayer($layer)
    ->click('onClick')
    ->reset('onReset')
    ->pan('onPan')
    ->panEnd('onPanEnd')
    ->shapeClick('onShapeClick')
    ->shapeCreated('onShapeCreated')
    ->shapeMouseEnter('onShapeMouseEnter')
    ->shapeMouseLeave('onShapeMouseLeave')
    ->zoomStart('onZoomStart')
    ->zoomEnd('onZoomEnd');

echo $map->render();
?>
<div class="console"></div>
<script>
function onClick(e) {
    kendoConsole.log("Click at ...");
}

function onReset(e) {
    kendoConsole.log("Reset");
}

function onPan(e) {
    kendoConsole.log("Pan");
}

function onPanEnd(e) {
    kendoConsole.log("Pan end");
}

function onShapeClick(e) {
    kendoConsole.log(kendo.format(
        "Shape click :: {0}", e.shape.dataItem.properties.name
    ));
}

function onShapeCreated(e) {
    kendoConsole.log(kendo.format(
        "Shape created :: {0}", e.shape.dataItem.properties.name
    ));
}

function onShapeMouseEnter(e) {
    kendoConsole.log(kendo.format(
        "Shape mouseEnter :: {0}", e.shape.dataItem.properties.name
    ));
}

function onShapeMouseLeave(e) {
    kendoConsole.log(kendo.format(
        "Shape mouseLeave :: {0}", e.shape.dataItem.properties.name
    ));
}

function onZoomStart(e) {
    kendoConsole.log("Zoom start");
}

function onZoomEnd(e) {
    kendoConsole.log("Zoom end");
}

</script>
<?php require_once '../include/footer.php'; ?>
