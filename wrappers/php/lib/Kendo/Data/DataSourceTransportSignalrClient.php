<?php

namespace Kendo\Data;

class DataSourceTransportSignalrClient extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the name of the client-side method of the SignalR hub responsible for creating data items.
    * @param string $value
    * @return \Kendo\Data\DataSourceTransportSignalrClient
    */
    public function create($value) {
        return $this->setProperty('create', $value);
    }

    /**
    * Specifies the name of the client-side method of the SignalR hub responsible for destroying data items.
    * @param string $value
    * @return \Kendo\Data\DataSourceTransportSignalrClient
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * Specifies the name of the client-side method of the SignalR hub responsible for reading data items.
    * @param string $value
    * @return \Kendo\Data\DataSourceTransportSignalrClient
    */
    public function read($value) {
        return $this->setProperty('read', $value);
    }

    /**
    * Specifies the name of the client-side method of the SignalR hub responsible for updating data items.
    * @param string $value
    * @return \Kendo\Data\DataSourceTransportSignalrClient
    */
    public function update($value) {
        return $this->setProperty('update', $value);
    }

//<< Properties
}

?>
