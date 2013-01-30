<?php

namespace Kendo\UI;

class TabStripAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The visual animation(s) that will be used when the current tab is closed.
    * @param \Kendo\UI\TabStripAnimationClose|array $value
    * @return \Kendo\UI\TabStripAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The visual animation(s) that will be used when the new tab is shown.
    * @param \Kendo\UI\TabStripAnimationOpen|array $value
    * @return \Kendo\UI\TabStripAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
