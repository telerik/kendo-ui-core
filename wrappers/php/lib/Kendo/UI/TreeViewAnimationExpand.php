<?php

namespace Kendo\UI;

class TreeViewAnimationExpand extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The number of milliseconds used for the animation when a
node is expanded.
    * @param float $value
    * @return \Kendo\UI\TreeViewAnimationExpand
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    /**
    * A whitespace-delimited string of animation effects that are used when expanding nodes.
The supported effects are "expandVertical" and "fadeIn".
    * @param string $value
    * @return \Kendo\UI\TreeViewAnimationExpand
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

//<< Properties
}

?>
