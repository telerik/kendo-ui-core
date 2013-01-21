<?php

namespace Kendo\UI;

class TreeViewAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function collapse(\Kendo\UI\TreeViewAnimationCollapse $value) {
        return $this->setProperty('collapse', $value);
    }

    public function expand(\Kendo\UI\TreeViewAnimationExpand $value) {
        return $this->setProperty('expand', $value);
    }

//<< Properties
}

?>
