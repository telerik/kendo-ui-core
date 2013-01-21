<?php

namespace Kendo\UI;

class PanelBarAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function collapse(\Kendo\UI\PanelBarAnimationCollapse $value) {
        $this->setProperty('collapse', $value);

        return $this;
    }

    public function expand(\Kendo\UI\PanelBarAnimationExpand $value) {
        $this->setProperty('expand', $value);

        return $this;
    }

//<< Properties
}

?>
