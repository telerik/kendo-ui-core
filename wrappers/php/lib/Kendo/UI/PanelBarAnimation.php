<?php

namespace Kendo\UI;

class PanelBarAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The visual animation(s) that will be used when PanelBar items are closed.
    * @param \Kendo\UI\PanelBarAnimationCollapse|array $value
    * @return \Kendo\UI\PanelBarAnimation
    */
    public function collapse($value) {
        return $this->setProperty('collapse', $value);
    }

    /**
    * The visual animation(s) that will be used when opening items.
    * @param \Kendo\UI\PanelBarAnimationExpand|array $value
    * @return \Kendo\UI\PanelBarAnimation
    */
    public function expand($value) {
        return $this->setProperty('expand', $value);
    }

//<< Properties
}

?>
