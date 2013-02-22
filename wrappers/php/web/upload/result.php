<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<p>Uploaded files</p>
<?php
// Check if any files are uploaded
if (isset($_FILES['files'])) {
    $files = $_FILES['files'];

    $count = count($files['name']);
?>
<ul>
<?php
    for ($index = 0; $index < $count; $index++) {
        // Save the uploaded files
        /*
        $file = $files['tmp_name'][$index];
        if (is_uploaded_file($file)) {
            move_uploaded_file($file, './' . $files['name'][$index]);
        }
        */
?>
    <li>
        <?= $files['name'][$index]?> (<?= $files['size'][$index] ?> bytes)
    </li>
<?php
    }
?>
</ul>
<?php
} else {
?>
-- None --
<?php
}
?>
<p>
    <a href="index.php">Go back</a>
</p>
<?php require_once '../../include/footer.php'; ?>
