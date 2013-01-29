<?php

namespace Kendo\UI;

class MenuAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when closing sub menus.
    * @param \Kendo\UI\MenuAnimationClose $value
    * @return \Kendo\UI\MenuAnimation
    */
    public function close(\Kendo\UI\MenuAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when opening sub menus.
    * @param \Kendo\UI\MenuAnimationOpen $value
    * @return \Kendo\UI\MenuAnimation
    */
    public function open(\Kendo\UI\MenuAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
