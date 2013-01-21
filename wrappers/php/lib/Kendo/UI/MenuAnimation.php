<?php

namespace Kendo\UI;

class MenuAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function setClose(\Kendo\UI\MenuAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\Kendo\UI\MenuAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
