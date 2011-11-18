<?php
    $fileParam = "files";
    $uploadRoot = "uploads/";
    $fileNames = $_POST["fileNames"];

    if (isset($fileNames))
    {
        foreach ($fileNames as $i => $name) {
            $targetPath = $uploadRoot . basename($name);
            if (!unlink($targetPath)) {
                echo "Error removing file";
            }
        }
    }

    // Return an empty string to signify success
    echo "";
?>
