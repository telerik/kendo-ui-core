<?php

namespace Kendo\UI;

class ContextMenuAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used when opening the popup.
    * @param string $value
    * @return \Kendo\UI\ContextMenuAnimationOpen
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Defines the open animation duration in milliseconds.
    * @param float $value
    * @return \Kendo\UI\ContextMenuAnimationOpen
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
