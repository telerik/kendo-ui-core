<?php

namespace Kendo\UI;

class MenuAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when closing sub menus.
    * @param \Kendo\UI\MenuAnimationClose|array $value
    * @return \Kendo\UI\MenuAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when opening sub menus.
    * @param \Kendo\UI\MenuAnimationOpen|array $value
    * @return \Kendo\UI\MenuAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
