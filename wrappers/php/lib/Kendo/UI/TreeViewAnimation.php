<?php

namespace Kendo\UI;

class TreeViewAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when collapsing items.
    * @param mixed|\Kendo\UI\TreeViewAnimationCollapse $value
    * @return \Kendo\UI\TreeViewAnimation
    */
    public function collapse($value) {
        return $this->setProperty('collapse', $value);
    }

    /**
    * The animation that will be used when expanding items.
    * @param mixed|\Kendo\UI\TreeViewAnimationExpand $value
    * @return \Kendo\UI\TreeViewAnimation
    */
    public function expand($value) {
        return $this->setProperty('expand', $value);
    }

//<< Properties
}

?>
