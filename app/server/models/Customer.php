<?php

class Customer {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function get_customers($id)
    {
        $this->db->query('SELECT * FROM customers WHERE id_admin = :id ORDER BY id DESC');
        $this->db->bind(':id', $id);
        $result = $this->db->resultSet();
        if($result) {
            return $result;
        } else {
            return false;
        }
    }

    public function get_customer($id)
    {
        $this->db->query('SELECT * FROM customers WHERE id = :id');
        $this->db->bind(':id', $id);
        if($this->db->single()) {
            return $this->db->single();
        } else {
            return false;
        }
    }

    public function create($data)
    {
        $this->db->query("INSERT INTO `customers` (`id_admin`, `name`, `phone`, `address`, `city`, `created_at`, `updated_at`) VALUES (:id, :name, :phone, :address, :city, :created_at, :updated_at)");

        $this->db->bind(':id', $data['id']);
        $this->db->bind(":name", $data["name"]);
        $this->db->bind(":phone", $data["phone"]);
        $this->db->bind(":address", $data["address"]);
        $this->db->bind(":city", $data["city"]);
        $this->db->bind(":created_at", date("Y-m-d H:i:s"));
        $this->db->bind(":updated_at", date("Y-m-d H:i:s"));

        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }

    }

    public function update($data, $id)
    {
        $customer = $this->get_customer($id);
        $this->db->query("UPDATE `customers` SET `name` = :name, `phone` = :phone, `address` = :address, `city` = :city, `updated_at` = :updated_at WHERE `id` = :id");

        $this->db->bind(':id', $id);
        $this->db->bind(":name", $data["name"] ? $data["name"] : $customer->name);
        $this->db->bind(":phone", $data["phone"] ? $data["phone"] : $customer->phone);
        $this->db->bind(":address", $data["address"] ? $data["address"] : $customer->address);
        $this->db->bind(":city", $data["city"] ? $data["city"] : $customer->city);
        $this->db->bind(":updated_at", date("Y-m-d H:i:s"));
        
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function delete($id)
    {
        $this->db->query("DELETE FROM `customers` WHERE `id` = :id");
        $this->db->bind(":id", $id);

        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

}