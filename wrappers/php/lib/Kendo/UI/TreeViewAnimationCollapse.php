<?php

namespace Kendo\UI;

class TreeViewAnimationCollapse extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The number of milliseconds used for the animation when a node is expanded.
    * @param float $value
    * @return \Kendo\UI\TreeViewAnimationCollapse
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    /**
    * A whitespace-delimited string of animation effects that are used when collapsing nodes.
The supported effects are fadeOut and collapseVertical.
    * @param string $value
    * @return \Kendo\UI\TreeViewAnimationCollapse
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

//<< Properties
}

?>
