<?php

class Property {
    
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function get_colors()
    {
        $this->db->query("SELECT * FROM `properties` WHERE `property` = 'color'");
        if($this->db->resultSet()) {
            return $this->db->resultSet();
        } else {
            return false;
        }
    }

    public function get_sizes()
    {
        $this->db->query("SELECT * FROM `properties` WHERE `property` = 'size'");
        if($this->db->resultSet()) {
            return $this->db->resultSet();
        } else {
            return false;
        }
    }
    
}