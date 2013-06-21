<?php

namespace Kendo\Data;

class DataSourceSchema extends \Kendo\SerializableObject {
    public function model(\Kendo\Data\DataSourceSchemaModel $value) {
        return $this->setProperty('model', $value);
    }

//>> Properties

    /**
    * The field from the response which contains the aggregate results. Can be set to a function which is called to
return the aggregate results from the response.The result of the function should be a JavaScript object which contains the aggregate results for every fields in the following format:For example if the data source is configured like this:The aggregate results should have the following format:
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\DataSourceSchema
    */
    public function aggregates($value) {
        return $this->setProperty('aggregates', $value);
    }

    /**
    * The field from the server response which contains the data items. Can be set to a function which is called to
return the data items for the response.
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\DataSourceSchema
    */
    public function data($value) {
        return $this->setProperty('data', $value);
    }

    /**
    * The field from the server response which contains server-side errors. Can be set to a function which is called to
return the errors for response. If there are any errors the error event will be fired.
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\DataSourceSchema
    */
    public function errors($value) {
        return $this->setProperty('errors', $value);
    }

    /**
    * The field from the server response which contains the groups. Can be set to a function which is called to
return the groups from the response.The result should have the following format:
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\DataSourceSchema
    */
    public function groups($value) {
        return $this->setProperty('groups', $value);
    }

    /**
    * Sets the parse option of the DataSourceSchema.
    * Executed before the server response is used. Use it to preprocess or parse the server response.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Data\DataSourceSchema
    */
    public function parse($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('parse', $value);
    }

    /**
    * The field from the server response which contains the total number of data items. Can be set to a function which is called to
return the total number of data items for the response.
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\DataSourceSchema
    */
    public function total($value) {
        return $this->setProperty('total', $value);
    }

    /**
    * The type of the response. The supported values are "xml" and "json". By default the schema interprets the server response as JSON.
    * @param string $value
    * @return \Kendo\Data\DataSourceSchema
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

//<< Properties
}

?>
