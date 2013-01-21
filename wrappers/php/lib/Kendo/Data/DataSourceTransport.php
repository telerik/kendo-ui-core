<?php

namespace Kendo\Data;

class DataSourceTransport extends \kendo\SerializableObject {
//>> Properties

    public function setCreate($value) {
        $this->setProperty('create', $value);

        return $this;
    }

    public function setCreate(\Kendo\Data\DataSourceTransportCreate $value) {
        $this->setProperty('create', $value);

        return $this;
    }

    public function setDestroy($value) {
        $this->setProperty('destroy', $value);

        return $this;
    }

    public function setDestroy(\Kendo\Data\DataSourceTransportDestroy $value) {
        $this->setProperty('destroy', $value);

        return $this;
    }

    public function setParameterMap($value) {
        $this->setProperty('parameterMap', $value);

        return $this;
    }

    public function setRead($value) {
        $this->setProperty('read', $value);

        return $this;
    }

    public function setRead(\Kendo\Data\DataSourceTransportRead $value) {
        $this->setProperty('read', $value);

        return $this;
    }

    public function setUpdate($value) {
        $this->setProperty('update', $value);

        return $this;
    }

    public function setUpdate(\Kendo\Data\DataSourceTransportUpdate $value) {
        $this->setProperty('update', $value);

        return $this;
    }

//<< Properties
}

?>
