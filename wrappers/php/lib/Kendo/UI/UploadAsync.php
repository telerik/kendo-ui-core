<?php

namespace Kendo\UI;

class UploadAsync extends \Kendo\SerializableObject {
//>> Properties

    public function autoUpload($value) {
        return $this->setProperty('autoUpload', $value);
    }

    public function batch($value) {
        return $this->setProperty('batch', $value);
    }

    public function removeField($value) {
        return $this->setProperty('removeField', $value);
    }

    public function removeUrl($value) {
        return $this->setProperty('removeUrl', $value);
    }

    public function removeVerb($value) {
        return $this->setProperty('removeVerb', $value);
    }

    public function saveField($value) {
        return $this->setProperty('saveField', $value);
    }

    public function saveUrl($value) {
        return $this->setProperty('saveUrl', $value);
    }

//<< Properties
}

?>
