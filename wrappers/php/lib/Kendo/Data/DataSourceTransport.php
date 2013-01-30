<?php

namespace Kendo\Data;

class DataSourceTransport extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Options for remote create data operation, or the URL of the remote service.
    * @param string|\kendo\JavaScriptFunction|\Kendo\Data\DataSourceTransportCreate|array $value
    * @return \Kendo\Data\DataSourceTransport
    */
    public function create($value) {
        return $this->setProperty('create', $value);
    }

    /**
    * Options for remote destroy data operation, or the URL of the remote service.
    * @param string|\kendo\JavaScriptFunction|\Kendo\Data\DataSourceTransportDestroy|array $value
    * @return \Kendo\Data\DataSourceTransport
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * Sets the parameterMap option of the DataSourceTransport.
    * Converts the request parameters and data from the internal format to a format suitable for the remote service.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Data\DataSourceTransport
    */
    public function parameterMap($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('parameterMap', $value);
    }

    /**
    * Options for remote read data operation, or the URL of the remote service.
    * @param string|\kendo\JavaScriptFunction|\Kendo\Data\DataSourceTransportRead|array $value
    * @return \Kendo\Data\DataSourceTransport
    */
    public function read($value) {
        return $this->setProperty('read', $value);
    }

    /**
    * Options for remote update data operation, or the URL of the remote service.
    * @param string|\kendo\JavaScriptFunction|\Kendo\Data\DataSourceTransportUpdate|array $value
    * @return \Kendo\Data\DataSourceTransport
    */
    public function update($value) {
        return $this->setProperty('update', $value);
    }

//<< Properties
}

?>
