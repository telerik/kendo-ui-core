<?php

namespace Kendo\UI;

class MenuAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when closing sub menus.
    * @param mixed|\Kendo\UI\MenuAnimationClose $value
    * @return \Kendo\UI\MenuAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when opening sub menus.
    * @param mixed|\Kendo\UI\MenuAnimationOpen $value
    * @return \Kendo\UI\MenuAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
