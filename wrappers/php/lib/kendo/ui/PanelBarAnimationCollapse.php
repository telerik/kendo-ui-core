<?php

namespace kendo\ui;

class PanelBarAnimationCollapse extends \kendo\SerializableObject {
//>> Properties

    public function setDuration($value) {
        $this->setProperty('duration', $value);

        return $this;
    }

    public function setEffects($value) {
        $this->setProperty('effects', $value);

        return $this;
    }

//<< Properties
}

?>
