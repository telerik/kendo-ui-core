<?php

namespace Kendo\UI;

class PanelBarAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The visual animation(s) that will be used when PanelBar items are closed.
    * @param mixed|\Kendo\UI\PanelBarAnimationCollapse $value
    * @return \Kendo\UI\PanelBarAnimation
    */
    public function collapse($value) {
        return $this->setProperty('collapse', $value);
    }

    /**
    * The visual animation(s) that will be used when opening items.
    * @param mixed|\Kendo\UI\PanelBarAnimationExpand $value
    * @return \Kendo\UI\PanelBarAnimation
    */
    public function expand($value) {
        return $this->setProperty('expand', $value);
    }

//<< Properties
}

?>
