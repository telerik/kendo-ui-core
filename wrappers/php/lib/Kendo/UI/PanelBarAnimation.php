<?php

namespace Kendo\UI;

class PanelBarAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function collapse(\Kendo\UI\PanelBarAnimationCollapse $value) {
        return $this->setProperty('collapse', $value);
    }

    public function expand(\Kendo\UI\PanelBarAnimationExpand $value) {
        return $this->setProperty('expand', $value);
    }

//<< Properties
}

?>
