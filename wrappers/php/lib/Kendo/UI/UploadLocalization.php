<?php

namespace Kendo\UI;

class UploadLocalization extends \Kendo\SerializableObject {
//>> Properties

    public function cancel($value) {
        $this->setProperty('cancel', $value);

        return $this;
    }

    public function dropFilesHere($value) {
        $this->setProperty('dropFilesHere', $value);

        return $this;
    }

    public function remove($value) {
        $this->setProperty('remove', $value);

        return $this;
    }

    public function retry($value) {
        $this->setProperty('retry', $value);

        return $this;
    }

    public function select($value) {
        $this->setProperty('select', $value);

        return $this;
    }

    public function statusFailed($value) {
        $this->setProperty('statusFailed', $value);

        return $this;
    }

    public function statusUploaded($value) {
        $this->setProperty('statusUploaded', $value);

        return $this;
    }

    public function statusUploading($value) {
        $this->setProperty('statusUploading', $value);

        return $this;
    }

    public function uploadSelectedFiles($value) {
        $this->setProperty('uploadSelectedFiles', $value);

        return $this;
    }

//<< Properties
}

?>
