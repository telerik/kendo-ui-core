<?php

namespace Kendo\Data;

class DataSourceTransport extends \kendo\SerializableObject {
//>> Properties

    public function create($value) {
        $this->setProperty('create', $value);

        return $this;
    }

    public function create(\Kendo\Data\DataSourceTransportCreate $value) {
        $this->setProperty('create', $value);

        return $this;
    }

    public function destroy($value) {
        $this->setProperty('destroy', $value);

        return $this;
    }

    public function destroy(\Kendo\Data\DataSourceTransportDestroy $value) {
        $this->setProperty('destroy', $value);

        return $this;
    }

    public function parameterMap($value) {
        $this->setProperty('parameterMap', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function read($value) {
        $this->setProperty('read', $value);

        return $this;
    }

    public function read(\Kendo\Data\DataSourceTransportRead $value) {
        $this->setProperty('read', $value);

        return $this;
    }

    public function update($value) {
        $this->setProperty('update', $value);

        return $this;
    }

    public function update(\Kendo\Data\DataSourceTransportUpdate $value) {
        $this->setProperty('update', $value);

        return $this;
    }

//<< Properties
}

?>
