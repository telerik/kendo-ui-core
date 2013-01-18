<?php

namespace kendo\ui;

class PanelBarAnimation extends \kendo\SerializableObject {
//>> Properties

    public function setCollapse(\kendo\ui\PanelBarAnimationCollapse $value) {
        $this->setProperty('collapse', $value);

        return $this;
    }

    public function setExpand(\kendo\ui\PanelBarAnimationExpand $value) {
        $this->setProperty('expand', $value);

        return $this;
    }

//<< Properties
}

?>
