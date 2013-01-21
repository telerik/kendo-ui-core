<?php

namespace Kendo\UI;

class TabStripAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\TabStripAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    public function open(\Kendo\UI\TabStripAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
