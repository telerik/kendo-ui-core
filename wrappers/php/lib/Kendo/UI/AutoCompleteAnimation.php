<?php

namespace Kendo\UI;

class AutoCompleteAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function setClose(\Kendo\UI\AutoCompleteAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\Kendo\UI\AutoCompleteAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
