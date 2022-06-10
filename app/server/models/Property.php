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

    public function create_property($data)
    {
        $this->db->query("INSERT INTO `property_product` (`id_product`, `id_property`) VALUES (:product, :property)");
        $this->db->bind(":property", $data["property"]);
        $this->db->bind(":product", $data["product"]);
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
    
}