<?php

namespace Kendo\UI;

class AutoCompleteAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\AutoCompleteAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function open(\Kendo\UI\AutoCompleteAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
