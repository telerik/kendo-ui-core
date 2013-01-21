<?php

namespace Kendo\UI;

class ComboBoxAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\ComboBoxAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    public function open(\Kendo\UI\ComboBoxAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
