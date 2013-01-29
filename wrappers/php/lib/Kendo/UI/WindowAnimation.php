<?php

namespace Kendo\UI;

class WindowAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when a Window closes.
    * @param \Kendo\UI\WindowAnimationClose $value
    * @returns \Kendo\UI\WindowAnimation
    */
    public function close(\Kendo\UI\WindowAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when a Window opens.
    * @param \Kendo\UI\WindowAnimationOpen $value
    * @returns \Kendo\UI\WindowAnimation
    */
    public function open(\Kendo\UI\WindowAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
