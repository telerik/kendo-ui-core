<?php

namespace Kendo\UI;

class TabStripAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function setClose(\Kendo\UI\TabStripAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\Kendo\UI\TabStripAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
