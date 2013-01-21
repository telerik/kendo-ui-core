<?php

namespace Kendo\UI;

class ComboBoxAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\ComboBoxAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function open(\Kendo\UI\ComboBoxAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
