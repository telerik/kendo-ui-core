<?php

namespace Kendo\UI;

class PanelBarAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The visual animation(s) that will be used when PanelBar items are closed.
    * @param \Kendo\UI\PanelBarAnimationCollapse $value
    */
    public function collapse(\Kendo\UI\PanelBarAnimationCollapse $value) {
        return $this->setProperty('collapse', $value);
    }

    /**
    * The visual animation(s) that will be used when opening items.
    * @param \Kendo\UI\PanelBarAnimationExpand $value
    */
    public function expand(\Kendo\UI\PanelBarAnimationExpand $value) {
        return $this->setProperty('expand', $value);
    }

//<< Properties
}

?>
