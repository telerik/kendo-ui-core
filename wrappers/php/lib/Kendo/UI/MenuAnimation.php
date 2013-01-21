<?php

namespace Kendo\UI;

class MenuAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\MenuAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function open(\Kendo\UI\MenuAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
