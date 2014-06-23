<?php

namespace Kendo\UI;

class ContextMenuAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when closing sub menus.
    * @param \Kendo\UI\ContextMenuAnimationClose|array $value
    * @return \Kendo\UI\ContextMenuAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when opening sub menus.
    * @param \Kendo\UI\ContextMenuAnimationOpen|array $value
    * @return \Kendo\UI\ContextMenuAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
