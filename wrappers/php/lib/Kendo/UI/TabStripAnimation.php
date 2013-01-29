<?php

namespace Kendo\UI;

class TabStripAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The visual animation(s) that will be used when the current tab is closed.
    * @param \Kendo\UI\TabStripAnimationClose $value
    * @returns \Kendo\UI\TabStripAnimation
    */
    public function close(\Kendo\UI\TabStripAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The visual animation(s) that will be used when the new tab is shown.
    * @param \Kendo\UI\TabStripAnimationOpen $value
    * @returns \Kendo\UI\TabStripAnimation
    */
    public function open(\Kendo\UI\TabStripAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
