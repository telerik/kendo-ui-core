<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$dataSource = new \Kendo\Data\DataSource();
$dataSource->type("geojson")
           ->transport(array('read' => '../../content/dataviz/map/countries-users.geo.json'));

$layer = new \Kendo\Dataviz\UI\MapLayer();
$layer->type("shape")
      ->dataSource($dataSource)
      ->style(array('fill' => array('opacity' => 0.7)));

$map = new \Kendo\Dataviz\UI\Map('map');
$map->center(array(30.2681, -97.7448))
    ->zoom(3)
    ->addLayer($layer)
    ->shapeCreated('onShapeCreated')
    ->shapeMouseEnter('onShapeMouseEnter')
    ->shapeMouseLeave('onShapeMouseLeave');

echo $map->render();
?>
<script src="../../content/dataviz/map/js/chroma.min.js"></script>
<script>

var scale = chroma
    .scale(["white", "green"])
    .domain([1, 1000]);

function onShapeCreated(e) {
    var shape = e.shape;
    var users = shape.dataItem.properties.users;
    if (users) {
        var color = scale(users).hex();
        shape.fill(color);
    }
}

function onShapeMouseEnter(e) {
    e.shape.options.set("fill.opacity", 1);
}

function onShapeMouseLeave(e) {
    e.shape.options.set("fill.opacity", 0.7);
}

</script>
<?php require_once '../../include/footer.php'; ?>
