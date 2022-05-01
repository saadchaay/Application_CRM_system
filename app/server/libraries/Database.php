<?php

class Database {
    private $host = DB_HOST;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;

    private $stmt ;
    private $handle ;
    private $error ;

    public function __construct()
    {
        $conn = "mysql:host=". $this->host .";dbname=". $this->db_name ;
        try {
            $this->handle = new PDO($conn, $this->username, $this->password);
        } catch (PDOException $e) {
            $this->error = $e->getMessage();
            echo $this->error ;
        }
    }

    public function query($rqt) 
    {
        $this->stmt = $this->handle->prepare($rqt) ;
    }

        public function bind($param, $value, $type = null) 
        {
            switch (is_null($type)) {
                case is_int($value):
                    $type = PDO::PARAM_INT ;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL ;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL ;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
            $this->stmt->bindValue($param,$value,$type);
        }

        public function execute() 
        {
            return $this->stmt->execute();
        }

        public function resultSet() 
        {
            $this->execute();
            return $this->stmt->fetchAll(PDO::FETCH_OBJ);
        }

        public function single() 
        {
            $this->execute();
            return $this->stmt->fetch(PDO::FETCH_OBJ);
        }

        public function rowCount() 
        {
            return $this->stmt->rowCount();
        }

}

?>