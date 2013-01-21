<?php

namespace Kendo\UI;

class MenuAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\MenuAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    public function open(\Kendo\UI\MenuAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
