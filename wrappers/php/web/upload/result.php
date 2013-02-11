<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<p>Uploaded files</p>
<ul>
<?php
$files = $_FILES['files'];

$count = count($files['name']);

for ($index = 0; $index < $count; $index++) {
?>
    <li>
        <?= $files['name'][$index]?> (<?= $files['size'][$index] ?> bytes)
    </li>
<?php
}
?>
</ul>

<a href="index.php">Go back</a>
<?php require_once '../../include/footer.php'; ?>
