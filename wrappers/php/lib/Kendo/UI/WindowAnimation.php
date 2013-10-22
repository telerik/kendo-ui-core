<?php

namespace Kendo\UI;

class WindowAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when a Window closes.
    * @param \Kendo\UI\WindowAnimationClose|array $value
    * @return \Kendo\UI\WindowAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when a Window opens.
    * @param \Kendo\UI\WindowAnimationOpen|array $value
    * @return \Kendo\UI\WindowAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
