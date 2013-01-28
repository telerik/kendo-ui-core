<?php

namespace Kendo\UI;

class TreeViewAnimationCollapse extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The number of milliseconds used for the animation when a node is expanded.
    * @param float $value
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    /**
    * A whitespace-delimited string of animation effects that are utilized when a TreeView node
is collapsed. Options include "fadeOut".
    * @param string $value
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

//<< Properties
}

?>
