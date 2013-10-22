<?php

namespace Kendo\UI;

class TabStripAnimationClose extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The number of milliseconds used for the visual animation when the current tab is closed.
    * @param float $value
    * @return \Kendo\UI\TabStripAnimationClose
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    /**
    * A whitespace-delimited string of animation effects that are utilized when the current tab
is closed. By default not specified - uses the opening animation with reverse.
    * @param string $value
    * @return \Kendo\UI\TabStripAnimationClose
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

//<< Properties
}

?>
