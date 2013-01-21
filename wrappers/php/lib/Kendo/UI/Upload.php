<?php

namespace Kendo\UI;

class Upload extends \Kendo\UI\Widget {
    public function name() {
        return 'Upload';
    }
//>> Properties

    public function async(\Kendo\UI\UploadAsync $value) {
        $this->setProperty('async', $value);

        return $this;
    }

    public function enabled($value) {
        $this->setProperty('enabled', $value);

        return $this;
    }

    public function localization(\Kendo\UI\UploadLocalization $value) {
        $this->setProperty('localization', $value);

        return $this;
    }

    public function multiple($value) {
        $this->setProperty('multiple', $value);

        return $this;
    }

    public function showFileList($value) {
        $this->setProperty('showFileList', $value);

        return $this;
    }

    public function cancel($value) {
        $this->setProperty('cancel', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function complete($value) {
        $this->setProperty('complete', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function error($value) {
        $this->setProperty('error', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function progress($value) {
        $this->setProperty('progress', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function remove($value) {
        $this->setProperty('remove', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function select($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function success($value) {
        $this->setProperty('success', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function upload($value) {
        $this->setProperty('upload', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
