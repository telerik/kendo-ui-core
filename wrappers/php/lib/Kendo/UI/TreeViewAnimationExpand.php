<?php

namespace Kendo\UI;

class TreeViewAnimationExpand extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The number of milliseconds used for the animation when a
node is expanded.
    * @param float $value
    * @returns \Kendo\UI\TreeViewAnimationExpand
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    /**
    * A whitespace-delimited string of animation effects that are utilized when a TreeView node
is expanded. Options include "expandVertical" and "fadeIn".
    * @param string $value
    * @returns \Kendo\UI\TreeViewAnimationExpand
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * 
    * @param boolean $value
    * @returns \Kendo\UI\TreeViewAnimationExpand
    */
    public function show($value) {
        return $this->setProperty('show', $value);
    }

//<< Properties
}

?>
