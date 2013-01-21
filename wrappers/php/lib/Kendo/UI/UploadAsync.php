<?php

namespace Kendo\UI;

class UploadAsync extends \Kendo\SerializableObject {
//>> Properties

    public function setAutoUpload($value) {
        $this->setProperty('autoUpload', $value);

        return $this;
    }

    public function setBatch($value) {
        $this->setProperty('batch', $value);

        return $this;
    }

    public function setRemoveField($value) {
        $this->setProperty('removeField', $value);

        return $this;
    }

    public function setRemoveUrl($value) {
        $this->setProperty('removeUrl', $value);

        return $this;
    }

    public function setRemoveVerb($value) {
        $this->setProperty('removeVerb', $value);

        return $this;
    }

    public function setSaveField($value) {
        $this->setProperty('saveField', $value);

        return $this;
    }

    public function setSaveUrl($value) {
        $this->setProperty('saveUrl', $value);

        return $this;
    }

//<< Properties
}

?>
