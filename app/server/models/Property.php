<?php

class Property {
    
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }
    
}