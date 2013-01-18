<?php

namespace kendo\ui;

class Upload extends \kendo\ui\Widget {
    public function name() {
        return 'Upload';
    }
//>> Properties

    public function setAsync(\kendo\ui\UploadAsync $value) {
        $this->setProperty('async', $value);

        return $this;
    }

    public function setEnabled($value) {
        $this->setProperty('enabled', $value);

        return $this;
    }

    public function setLocalization(\kendo\ui\UploadLocalization $value) {
        $this->setProperty('localization', $value);

        return $this;
    }

    public function setMultiple($value) {
        $this->setProperty('multiple', $value);

        return $this;
    }

    public function setShowFileList($value) {
        $this->setProperty('showFileList', $value);

        return $this;
    }

    public function setCancel($value) {
        $this->setProperty('cancel', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setComplete($value) {
        $this->setProperty('complete', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setError($value) {
        $this->setProperty('error', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setProgress($value) {
        $this->setProperty('progress', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setRemove($value) {
        $this->setProperty('remove', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSuccess($value) {
        $this->setProperty('success', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setUpload($value) {
        $this->setProperty('upload', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
