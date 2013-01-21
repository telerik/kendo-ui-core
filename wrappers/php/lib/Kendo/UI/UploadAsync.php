<?php

namespace Kendo\UI;

class UploadAsync extends \Kendo\SerializableObject {
//>> Properties

    public function autoUpload($value) {
        $this->setProperty('autoUpload', $value);

        return $this;
    }

    public function batch($value) {
        $this->setProperty('batch', $value);

        return $this;
    }

    public function removeField($value) {
        $this->setProperty('removeField', $value);

        return $this;
    }

    public function removeUrl($value) {
        $this->setProperty('removeUrl', $value);

        return $this;
    }

    public function removeVerb($value) {
        $this->setProperty('removeVerb', $value);

        return $this;
    }

    public function saveField($value) {
        $this->setProperty('saveField', $value);

        return $this;
    }

    public function saveUrl($value) {
        $this->setProperty('saveUrl', $value);

        return $this;
    }

//<< Properties
}

?>
