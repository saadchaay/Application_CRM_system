<?php

class Admin {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function allAdmins()
    {
        $this->db->query('SELECT * FROM admins');
        return $this->db->resultSet();
    }

    public function register($data)
    {
        
    }
}