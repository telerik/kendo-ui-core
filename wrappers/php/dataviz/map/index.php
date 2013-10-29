<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$map = new \Kendo\Dataviz\UI\Map('map');

echo $map->render();
?>
<script>
</script>
<?php require_once '../../include/footer.php'; ?>
