<?php

namespace Kendo\UI;

class TreeViewAnimationCollapse extends \Kendo\SerializableObject {
//>> Properties

    public function setDuration($value) {
        $this->setProperty('duration', $value);

        return $this;
    }

    public function setEffects($value) {
        $this->setProperty('effects', $value);

        return $this;
    }

//<< Properties
}

?>
