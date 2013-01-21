<?php

namespace Kendo\UI;

class TreeViewAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function setCollapse(\Kendo\UI\TreeViewAnimationCollapse $value) {
        $this->setProperty('collapse', $value);

        return $this;
    }

    public function setExpand(\Kendo\UI\TreeViewAnimationExpand $value) {
        $this->setProperty('expand', $value);

        return $this;
    }

//<< Properties
}

?>
