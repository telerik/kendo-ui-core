<?php

namespace Kendo\UI;

class PanelBarAnimationExpand extends \Kendo\SerializableObject {
//>> Properties

    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    public function show($value) {
        return $this->setProperty('show', $value);
    }

//<< Properties
}

?>
