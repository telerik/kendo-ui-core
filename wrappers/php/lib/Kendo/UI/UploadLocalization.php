<?php

namespace Kendo\UI;

class UploadLocalization extends \Kendo\SerializableObject {
//>> Properties

    public function cancel($value) {
        return $this->setProperty('cancel', $value);
    }

    public function dropFilesHere($value) {
        return $this->setProperty('dropFilesHere', $value);
    }

    public function remove($value) {
        return $this->setProperty('remove', $value);
    }

    public function retry($value) {
        return $this->setProperty('retry', $value);
    }

    public function select($value) {
        return $this->setProperty('select', $value);
    }

    public function statusFailed($value) {
        return $this->setProperty('statusFailed', $value);
    }

    public function statusUploaded($value) {
        return $this->setProperty('statusUploaded', $value);
    }

    public function statusUploading($value) {
        return $this->setProperty('statusUploading', $value);
    }

    public function uploadSelectedFiles($value) {
        return $this->setProperty('uploadSelectedFiles', $value);
    }

//<< Properties
}

?>
