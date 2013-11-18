<?php

class SchedulerDataSourceResult extends DataSourceResult {
    function __construct($dsn, $username=null, $password=null, $driver_options=null) {
        parent::__construct($dsn, $username, $password, $driver_options);
    }

    public function read($table, $properties, $request = null) {
         $properties = array_merge($properties, array('Title', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', Start) as Start', 'strftime(\'%Y-%m-%dT%H:%M:%SZ\', End) as End', 'IsAllDay', 'StartTimezone', 'EndTimezone', 'Description', 'RecurrenceID', 'RecurrenceRule', 'RecurrenceException'));

        return parent::read($table, $properties, $request);
    }

    public function destroyWithAssociation($table, $joinTable, $models, $key) {
        $result = array();

        if (!is_array($models)) {
            $models = array($models);
        }

        $errors = array();

        foreach ($models as $model) {
            $sql = "DELETE FROM $table WHERE $key=?";

            $statement = $this->db->prepare($sql);

            $statement->execute(array($model->$key));

            $status = $statement->errorInfo();

            if ($status[1] > 0) {
                $errors[] = $status[2];
            } else {
                $error = $this->removeAssocitations($joinTable, $model, $key);
                if ($error) {
                   $errors[] = $error;
                }
            }
        }

        if (count($errors) > 0) {
            $result['errors'] = $errors;
        }

        return $result;
    }

    public function createWithAssociation($table, $joinTable, $properties, $models, $key, $associationMap) {
        $result = array();
        $data = array();
        $propertyNames = $this->propertyNames($properties);

        if (!is_array($models)) {
            $models = array($models);
        }

        $errors = array();

        foreach ($models as $model) {
            $columns = array();
            $values = array();
            $input_parameters = array();

            foreach ($propertyNames as $property) {
                if ($property != $key) {
                    $columns[] = $property;
                    $values[] = '?';
                    $input_parameters[] = $model->$property;
                }
            }

            $columns = implode(', ', $columns);
            $values = implode(', ', $values);

            $sql = "INSERT INTO $table ($columns) VALUES ($values)";

            $statement = $this->db->prepare($sql);

            $statement->execute($input_parameters);

            $status = $statement->errorInfo();

            if ($status[1] > 0) {
                $errors[] = $status[2];
            } else {
                $model->$key = $this->db->lastInsertId();
                $data[] = $model;

                if (isset($joinTable)) {
                    $error = $this->updateAssociation($joinTable, $model, $key, $associationMap);
                    $errors = array_merge($errors, $error);

                }
            }
        }

        if (count($errors) > 0) {
            $result['errors'] = $errors;
        } else {
            $result['data'] = $data;
        }

        return $result;
    }

    public function updateWithAssociation($table, $joinTable, $properties, $models, $key, $associationMap) {
        $result = array();

        $propertyNames = $this->propertyNames($properties);

        if (in_array($key, $propertyNames)) {

            if (!is_array($models)) {
                $models = array($models);
            }

            $errors = array();

            foreach ($models as $model) {
                $set = array();

                $input_parameters = array();

                foreach ($propertyNames as $property) {
                    if ($property != $key) {
                        $set[] = "$property=?";
                        $input_parameters[] = $model->$property;
                    }
                }

                $input_parameters[] = $model->$key;

                $set = implode(', ', $set);

                $sql = "UPDATE $table SET $set WHERE $key=?;";

                $statement = $this->db->prepare($sql);

                $statement->execute($input_parameters);

                $status = $statement->errorInfo();

                if ($status[1] > 0) {
                    $errors[] = $status[2];
                } else {
                    if (isset($joinTable)) {
                       $error = $this->updateAssociation($joinTable, $model, $key, $associationMap);
                       $errors = array_merge($errors, $error);
                    }
                }
            }

            if (count($errors) > 0) {
                $result['errors'] = $errors;
            }
        }

        if (count($result) == 0) {
            $result = "";
        }

        return $result;
    }

    private function removeAssocitations($table, $model, $key) {
        $sql = "DELETE FROM $table WHERE $key=?;";

        $input_parameters = array();

        $input_parameters[] = $model->$key;

        $statement = $this->db->prepare($sql);
        $statement->execute($input_parameters);

        $status = $statement->errorInfo();

        if ($status[1] > 0) {
            return $status[2];
        }
        return null;
    }

    private function updateAssociation($table, $model, $key, $associationMap) {
        $errors = array();

        $error = $this->removeAssocitations($table, $model, $key);

        $associationKey = array_keys($associationMap)[0];

        if ($error == null && isset($model->$associationKey)) {
            $associations = $model->$associationKey;

            if (is_array($associations)) {
                for($index = 0, $count = count($associations); $index < $count; $index++) {
                    $sql = "INSERT INTO ".$table." (".$key.", ".$associationMap[$associationKey].") VALUES(?,".$associations[$index].");";

                    $input_parameters = array();
                    $input_parameters[] = $model->$key;

                    $statement = $this->db->prepare($sql);
                    $statement->execute($input_parameters);

                    $status = $statement->errorInfo();

                    if ($status[1] > 0) {
                        $errors[] = $status[2];
                    }
                }
            }
        } else {
            $errors[] = $error;
        }
        return $errors;
    }

    public function readWithAssociation($table, $joinTable, $key, $columnMap, $properties, $request = null) {
        $result = $this->read($table, $properties, $request);
        $associationKey = array_keys($columnMap)[0];

        for ($index = 0, $count = count($result['data']); $index < $count; $index++) {
            $sql = sprintf('SELECT %s FROM %s WHERE %s = %s', $associationKey, $joinTable, $key, $result['data'][$index][$key]);

            $statement = $this->db->prepare($sql);
            $statement->execute();
            $data = $statement->fetchAll(PDO::FETCH_COLUMN);
            $result['data'][$index][$columnMap[$associationKey]] = $data;
        }

        return $result;
    }
}

?>
