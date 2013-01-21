<?php

namespace Kendo\UI;

class Upload extends \Kendo\UI\Widget {
    public function name() {
        return 'Upload';
    }
//>> Properties

    public function setAsync(\Kendo\UI\UploadAsync $value) {
        $this->setProperty('async', $value);

        return $this;
    }

    public function setEnabled($value) {
        $this->setProperty('enabled', $value);

        return $this;
    }

    public function setLocalization(\Kendo\UI\UploadLocalization $value) {
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
        $this->setProperty('cancel', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setComplete($value) {
        $this->setProperty('complete', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setError($value) {
        $this->setProperty('error', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setProgress($value) {
        $this->setProperty('progress', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setRemove($value) {
        $this->setProperty('remove', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSuccess($value) {
        $this->setProperty('success', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setUpload($value) {
        $this->setProperty('upload', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
