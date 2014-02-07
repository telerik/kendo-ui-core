<?php

namespace Kendo\Data;

class DataSourceTransportSignalr extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the client-side CRUD methods of the SignalR hub.
    * @param \Kendo\Data\DataSourceTransportSignalrClient|array $value
    * @return \Kendo\Data\DataSourceTransportSignalr
    */
    public function client($value) {
        return $this->setProperty('client', $value);
    }

    /**
    * The SignalR hub object returned by the createHubProxy method. The hub option is mandatory.
    * @param  $value
    * @return \Kendo\Data\DataSourceTransportSignalr
    */
    public function hub($value) {
        return $this->setProperty('hub', $value);
    }

    /**
    * The promise returned by the start method of the SignalR connection. The promise option is mandatory.
    * @param  $value
    * @return \Kendo\Data\DataSourceTransportSignalr
    */
    public function promise($value) {
        return $this->setProperty('promise', $value);
    }

    /**
    * Specifies the server-side CRUD methods of the SignalR hub.
    * @param \Kendo\Data\DataSourceTransportSignalrServer|array $value
    * @return \Kendo\Data\DataSourceTransportSignalr
    */
    public function server($value) {
        return $this->setProperty('server', $value);
    }

//<< Properties
}

?>
