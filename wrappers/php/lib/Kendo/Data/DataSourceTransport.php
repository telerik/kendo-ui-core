<?php

namespace Kendo\Data;

class DataSourceTransport extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The configuration used when the data source saves newly created data items. Those are items added to the data source via the add or insert methods.If the value of transport.create is a function, the data source invokes that function instead of jQuery.ajax.If the value of transport.create is a string the data source uses this string as the URL of the remote service.
    * @param string|\Kendo\JavaScriptFunction|\Kendo\Data\DataSourceTransportCreate|array $value
    * @return \Kendo\Data\DataSourceTransport
    */
    public function create($value) {
        return $this->setProperty('create', $value);
    }

    /**
    * The configuration used when the data source destroys data items. Those are items removed from the data source via the remove method.If the value of transport.destroy is a function, the data source invokes that function instead of jQuery.ajax.If the value of transport.destroy is a string the data source uses this string as the URL of the remote service.
    * @param string|\Kendo\JavaScriptFunction|\Kendo\Data\DataSourceTransportDestroy|array $value
    * @return \Kendo\Data\DataSourceTransport
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * Sets the parameterMap option of the DataSourceTransport.
    * The function which converts the request parameters to a format suitable for the remote service. By default
the data source sends the parameters using jQuery's conventions.
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
    * The configuration used when the data source loads data items from a remote service.If the value of transport.read is a function, the data source invokes that function instead of jQuery.ajax.If the value of transport.read is a string the data source uses this string as the URL of the remote service.
    * @param string|\Kendo\JavaScriptFunction|\Kendo\Data\DataSourceTransportRead|array $value
    * @return \Kendo\Data\DataSourceTransport
    */
    public function read($value) {
        return $this->setProperty('read', $value);
    }

    /**
    * The configuration used when the data source saves updated data items. Those are data items whose fields have been updated.If the value of transport.update is a function, the data source invokes that function instead of jQuery.ajax.If the value of transport.update is a string the data source uses this string as the URL of the remote service.
    * @param string|\Kendo\JavaScriptFunction|\Kendo\Data\DataSourceTransportUpdate|array $value
    * @return \Kendo\Data\DataSourceTransport
    */
    public function update($value) {
        return $this->setProperty('update', $value);
    }

//<< Properties
}

?>
