<?php

namespace Kendo\UI;

class TreeViewAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when collapsing items.
    * @param boolean|\Kendo\UI\TreeViewAnimationCollapse|array $value
    * @return \Kendo\UI\TreeViewAnimation
    */
    public function collapse($value) {
        return $this->setProperty('collapse', $value);
    }

    /**
    * The animation that will be used when expanding items.
    * @param boolean|\Kendo\UI\TreeViewAnimationExpand|array $value
    * @return \Kendo\UI\TreeViewAnimation
    */
    public function expand($value) {
        return $this->setProperty('expand', $value);
    }

//<< Properties
}

?>
