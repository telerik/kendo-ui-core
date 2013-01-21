<?php

namespace Kendo\UI;

class TreeViewAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function collapse(\Kendo\UI\TreeViewAnimationCollapse $value) {
        $this->setProperty('collapse', $value);

        return $this;
    }

    public function expand(\Kendo\UI\TreeViewAnimationExpand $value) {
        $this->setProperty('expand', $value);

        return $this;
    }

//<< Properties
}

?>
