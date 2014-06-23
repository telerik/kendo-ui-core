<?php

namespace Kendo\UI;

class ContextMenuAnimationClose extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used when closing the popup.
    * @param string $value
    * @return \Kendo\UI\ContextMenuAnimationClose
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Defines the close animation duration in milliseconds.
    * @param float $value
    * @return \Kendo\UI\ContextMenuAnimationClose
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
