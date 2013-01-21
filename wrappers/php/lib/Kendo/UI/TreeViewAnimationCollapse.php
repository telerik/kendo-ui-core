<?php

namespace Kendo\UI;

class TreeViewAnimationCollapse extends \Kendo\SerializableObject {
//>> Properties

    public function duration($value) {
        $this->setProperty('duration', $value);

        return $this;
    }

    public function effects($value) {
        $this->setProperty('effects', $value);

        return $this;
    }

//<< Properties
}

?>
