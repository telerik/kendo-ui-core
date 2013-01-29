<?php

namespace Kendo\UI;

class WindowAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when a Window closes.
    * @param mixed|\Kendo\UI\WindowAnimationClose $value
    * @return \Kendo\UI\WindowAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when a Window opens.
    * @param mixed|\Kendo\UI\WindowAnimationOpen $value
    * @return \Kendo\UI\WindowAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
