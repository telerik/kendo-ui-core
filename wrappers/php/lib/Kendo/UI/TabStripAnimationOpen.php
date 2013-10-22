<?php

namespace Kendo\UI;

class TabStripAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The number of milliseconds used for the visual animation when a new tab is shown.
    * @param float $value
    * @return \Kendo\UI\TabStripAnimationOpen
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    /**
    * A whitespace-separated string of animation effects that are used when a new tab is shown. Options include
"expand:vertical" and "fadeIn".
    * @param string $value
    * @return \Kendo\UI\TabStripAnimationOpen
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

//<< Properties
}

?>
