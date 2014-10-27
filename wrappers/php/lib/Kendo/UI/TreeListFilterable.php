<?php

namespace Kendo\UI;

class TreeListFilterable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the filter menu allows the user to input a second criteria.
    * @param boolean $value
    * @return \Kendo\UI\TreeListFilterable
    */
    public function extra($value) {
        return $this->setProperty('extra', $value);
    }

//<< Properties
}

?>
