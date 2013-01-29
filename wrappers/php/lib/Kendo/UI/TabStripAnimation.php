<?php

namespace Kendo\UI;

class TabStripAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The visual animation(s) that will be used when the current tab is closed.
    * @param mixed|\Kendo\UI\TabStripAnimationClose $value
    * @return \Kendo\UI\TabStripAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The visual animation(s) that will be used when the new tab is shown.
    * @param mixed|\Kendo\UI\TabStripAnimationOpen $value
    * @return \Kendo\UI\TabStripAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
