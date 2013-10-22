<?php

namespace Kendo\UI;

class UploadLocalization extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the text of the cancel button text.
    * @param string $value
    * @return \Kendo\UI\UploadLocalization
    */
    public function cancel($value) {
        return $this->setProperty('cancel', $value);
    }

    /**
    * Sets the drop zone hint.
    * @param string $value
    * @return \Kendo\UI\UploadLocalization
    */
    public function dropFilesHere($value) {
        return $this->setProperty('dropFilesHere', $value);
    }

    /**
    * Sets the header status message for uploaded files.
    * @param string $value
    * @return \Kendo\UI\UploadLocalization
    */
    public function headerStatusUploaded($value) {
        return $this->setProperty('headerStatusUploaded', $value);
    }

    /**
    * Sets the header status message for files that are being uploaded.
    * @param string $value
    * @return \Kendo\UI\UploadLocalization
    */
    public function headerStatusUploading($value) {
        return $this->setProperty('headerStatusUploading', $value);
    }

    /**
    * Sets the text of the remove button text.
    * @param string $value
    * @return \Kendo\UI\UploadLocalization
    */
    public function remove($value) {
        return $this->setProperty('remove', $value);
    }

    /**
    * Sets the text of the retry button text.
    * @param string $value
    * @return \Kendo\UI\UploadLocalization
    */
    public function retry($value) {
        return $this->setProperty('retry', $value);
    }

    /**
    * Sets the "Select..." button text.
    * @param string $value
    * @return \Kendo\UI\UploadLocalization
    */
    public function select($value) {
        return $this->setProperty('select', $value);
    }

    /**
    * Sets the status message for failed uploads.
    * @param string $value
    * @return \Kendo\UI\UploadLocalization
    */
    public function statusFailed($value) {
        return $this->setProperty('statusFailed', $value);
    }

    /**
    * Sets the status message for uploaded files.
    * @param string $value
    * @return \Kendo\UI\UploadLocalization
    */
    public function statusUploaded($value) {
        return $this->setProperty('statusUploaded', $value);
    }

    /**
    * Sets the status message for files that are being uploaded.
    * @param string $value
    * @return \Kendo\UI\UploadLocalization
    */
    public function statusUploading($value) {
        return $this->setProperty('statusUploading', $value);
    }

    /**
    * Sets the text of the "Upload files" button.
    * @param string $value
    * @return \Kendo\UI\UploadLocalization
    */
    public function uploadSelectedFiles($value) {
        return $this->setProperty('uploadSelectedFiles', $value);
    }

//<< Properties
}

?>
