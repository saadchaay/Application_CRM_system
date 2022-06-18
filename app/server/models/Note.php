<?php

class Note {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function get_notes($id)
    {
        $this->db->query('SELECT * FROM notes WHERE id_admin = :id ORDER BY id DESC');
        $this->db->bind(':id', $id);
        $result = $this->db->resultSet();
        if($result) {
            return $result;
        } else {
            return false;
        }
    }


    public function create($data)
    {
        $this->db->query("INSERT INTO `order_notes` (`id_order`, `belongTo`, `note`, `created_at`, `updated_at`) VALUES (:id, :belongTo, :note, :created_at, :updated_at)");

        $this->db->bind(':id', $data['id']);
        $this->db->bind(':belongTo', $data['belongTo']);
        $this->db->bind(":note", $data["note"]);
        $this->db->bind(":created_at", date("Y-m-d H:i:s"));
        $this->db->bind(":updated_at", date("Y-m-d H:i:s"));

        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
}

?>