<?php

namespace Kendo\UI;

class ComboBoxAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * 
    * @param \Kendo\UI\ComboBoxAnimationClose|array $value
    * @return \Kendo\UI\ComboBoxAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation played when the suggestion popup is opened.
    * @param \Kendo\UI\ComboBoxAnimationOpen|array $value
    * @return \Kendo\UI\ComboBoxAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
