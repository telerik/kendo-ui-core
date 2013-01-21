<?php

namespace Kendo\UI;

class AutoCompleteAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\AutoCompleteAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    public function open(\Kendo\UI\AutoCompleteAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
