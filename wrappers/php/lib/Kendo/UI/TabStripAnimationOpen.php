<?php

namespace Kendo\UI;

class TabStripAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The number of milliseconds used for the visual animation when a new tab is shown.
    * @param float $value
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    /**
    * A whitespace-separated string of animation effects that are used when a new tab is shown. Options include
"expand:vertical" and "fadeIn".
    * @param string $value
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * 
    * @param boolean $value
    */
    public function show($value) {
        return $this->setProperty('show', $value);
    }

//<< Properties
}

?>
