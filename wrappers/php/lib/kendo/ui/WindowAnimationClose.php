<?php

namespace kendo\ui;

class WindowAnimationClose extends \kendo\SerializableObject {
//>> Properties

    public function setEffects($value) {
        $this->setProperty('effects', $value);

        return $this;
    }

    public function setDuration($value) {
        $this->setProperty('duration', $value);

        return $this;
    }

//<< Properties
}

?>
