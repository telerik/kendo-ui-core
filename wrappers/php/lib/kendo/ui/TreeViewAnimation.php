<?php

namespace kendo\ui;

class TreeViewAnimation extends \kendo\SerializableObject {
//>> Properties

    public function setCollapse(\kendo\ui\TreeViewAnimationCollapse $value) {
        $this->setProperty('collapse', $value);

        return $this;
    }

    public function setExpand(\kendo\ui\TreeViewAnimationExpand $value) {
        $this->setProperty('expand', $value);

        return $this;
    }

//<< Properties
}

?>
