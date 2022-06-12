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

    public function create_property($product, $property)
    {
        $this->db->query("INSERT INTO `property_product` (`id_product`, `id_property`) VALUES (:product, :property)");
        $this->db->bind(":property", $property);
        $this->db->bind(":product", $product);
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function delete_properties($product)
    {   
        $this->db->query("DELETE FROM `property_product` WHERE `id_product` = :product");
        $this->db->bind(":product", $product);
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function get_properties($id)
    {
        $this->db->query("SELECT * FROM `property_product` INNER JOIN `properties` ON `property_product`.id_property = `properties`.id WHERE `id_product` = :id");
        $this->db->bind(":id", $id);
        if($this->db->resultSet()) {
            return $this->db->resultSet();
        } else {
            return false;
        }
    }
    
}