<?php

namespace Kendo\UI;

class ComboBoxAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function setClose(\Kendo\UI\ComboBoxAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\Kendo\UI\ComboBoxAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
