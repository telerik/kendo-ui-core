<?php
    $fileParam = "files";
    $uploadRoot = "uploads/";
    $files = $_FILES[$fileParam];

    if (isset($files['name']))
    {
        foreach ($files["name"] as $i => $name) {
            $error = $files['error'][$i];

            if ($error == UPLOAD_ERR_OK) {
                $targetPath = $uploadRoot . basename($files["name"][$i]);
                $uploadedFile = $files["tmp_name"][$i];

                if (is_uploaded_file($uploadedFile)) {
                    if (!move_uploaded_file($uploadedFile, $targetPath)) {
                        echo "Error moving uploaded file";
                    }
                }
            } else {
                // See http://php.net/manual/en/features.file-upload.errors.php
                echo "Error code " . $error;
            }
        }
    }

    // Return an empty string to signify success
    echo "";
?>
