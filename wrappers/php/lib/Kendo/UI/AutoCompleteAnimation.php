<?php

namespace Kendo\UI;

class AutoCompleteAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation played when the suggestion popup is closed.
    * @param \Kendo\UI\AutoCompleteAnimationClose|array $value
    * @return \Kendo\UI\AutoCompleteAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation played when the suggestion popup is opened.
    * @param \Kendo\UI\AutoCompleteAnimationOpen|array $value
    * @return \Kendo\UI\AutoCompleteAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
