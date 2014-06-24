<?php

namespace Kendo\Data;

class PivotDataSourceTransport extends \Kendo\Data\DataSourceTransport {
//>> Properties

    /**
    * The configuration used when the data source discovers schema information about the current cube.If the value of transport.discover is a function, the data source invokes that function instead of jQuery.ajax.If the value of transport.discover is a string the data source uses this string as the URL of the remote service.If the value of transport.discover is ommited the data source uses transport.read for schema discover.
    * @param |string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Data\PivotDataSourceTransport
    */
    public function discover($value) {
        return $this->setProperty('discover', $value);
    }

    /**
    * The configuration used for setting connection options.
    * @param \Kendo\Data\PivotDataSourceTransportConnection|array $value
    * @return \Kendo\Data\PivotDataSourceTransport
    */
    public function connection($value) {
        return $this->setProperty('connection', $value);
    }

//<< Properties
}

?>
