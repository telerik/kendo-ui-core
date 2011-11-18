<?php
    $fileParam = "files";
    $uploadRoot = "uploads/";
    $files = $_FILES[$fileParam];

    if (isset($files['name']))
    {
        foreach ($files["name"] as $i => $name) {
            $targetPath = $uploadRoot . basename($files["name"][$i]);
            $uploadedFile = $files["tmp_name"][$i];
            if (is_uploaded_file($uploadedFile)) {
                move_uploaded_file($uploadedFile, $targetPath);
            }
        }
    }

    // Return an empty string to signify success
    echo "";
?>
