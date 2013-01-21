<?php

namespace Kendo\UI;

class GridScrollable extends \Kendo\SerializableObject {
//>> Properties

    public function virtual($value) {
        $this->setProperty('virtual', $value);

        return $this;
    }

//<< Properties
}

?>
