<?php

namespace Kendo\Data;

class DataSourceGroupItemAggregate extends \kendo\SerializableObject {
//>> Properties

    public function setField($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function setAggregate($value) {
        $this->setProperty('aggregate', $value);

        return $this;
    }

//<< Properties
}

?>
