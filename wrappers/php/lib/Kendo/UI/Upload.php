<?php

namespace Kendo\UI;

class Upload extends \Kendo\UI\Widget {
    public function name() {
        return 'Upload';
    }
//>> Properties

    public function async(\Kendo\UI\UploadAsync $value) {
        return $this->setProperty('async', $value);
    }

    public function enabled($value) {
        return $this->setProperty('enabled', $value);
    }

    public function localization(\Kendo\UI\UploadLocalization $value) {
        return $this->setProperty('localization', $value);
    }

    public function multiple($value) {
        return $this->setProperty('multiple', $value);
    }

    public function showFileList($value) {
        return $this->setProperty('showFileList', $value);
    }

    public function cancel($value) {
        return $this->setProperty('cancel', new \Kendo\JavaScriptFunction($value));
    }

    public function complete($value) {
        return $this->setProperty('complete', new \Kendo\JavaScriptFunction($value));
    }

    public function error($value) {
        return $this->setProperty('error', new \Kendo\JavaScriptFunction($value));
    }

    public function progress($value) {
        return $this->setProperty('progress', new \Kendo\JavaScriptFunction($value));
    }

    public function remove($value) {
        return $this->setProperty('remove', new \Kendo\JavaScriptFunction($value));
    }

    public function select($value) {
        return $this->setProperty('select', new \Kendo\JavaScriptFunction($value));
    }

    public function success($value) {
        return $this->setProperty('success', new \Kendo\JavaScriptFunction($value));
    }

    public function upload($value) {
        return $this->setProperty('upload', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
