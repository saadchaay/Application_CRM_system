<?php

class Product {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
        $this->property = new Property();
    }
    
    public function get_all_product($data)
    {
        
    }
}