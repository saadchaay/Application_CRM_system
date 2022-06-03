<?php

class User {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function get_all_users()
    {
        $this->db->query('SELECT * FROM users WHERE `role` != "admin" ORDER BY id DESC');
        return $this->db->resultSet();
    }


    
}