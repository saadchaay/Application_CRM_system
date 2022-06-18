<?php

class Order {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function get_all_orders($id)
    {
        $this->db->query('SELECT * FROM orders WHERE id_admin = :id');
        $this->db->bind(':id', $id);
        $res = $this->db->resultSet();
        if($res) {
            return $res;
        } else {
            return false;
        }
    }

    public function get_order($id)
    {
        $this->db->query('SELECT * FROM orders WHERE id = :id');
        $this->db->bind(':id', $id);
        if($this->db->single()) {
            return $this->db->single();
        } else {
            return false;
        }
    }

    public function create($data)
    {
        
        $this->db->query("INSERT INTO `orders` (`reference`, `order_date`, `id_admin`, `id_customer`, `status`, `tracking`, `total`, `created_at`, `updated_at`) VALUES (:reference, :date_order, :id, :customer, :status, :tracking, :total, :created_at, :updated_at)");

        $this->db->bind(':reference', $data['reference']);
        $this->db->bind(':date_order', $data['date_order']);
        $this->db->bind(':id', $data['admin']);
        $this->db->bind(":customer", $data["customer"]);
        $this->db->bind(":status", "Pending");
        $this->db->bind(":tracking", "Waiting");
        $this->db->bind(":total", $data["total"]);
        $this->db->bind(":created_at", date("Y-m-d H:i:s"));
        $this->db->bind(":updated_at", date("Y-m-d H:i:s"));

        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }

        
    }

    public function get_last_insert_order($id)
    {
        $this->db->query('SELECT * FROM orders WHERE id_admin = :id ORDER BY id DESC LIMIT 1');
        $this->db->bind(':id', $id);
        if($this->db->single()) {
            return $this->db->single();
        } else {
            return false;
        }
    }

    public function create_detail($data)
    {
        $this->db->query("INSERT INTO `order_detail` (`id_order`, `id_product`, `quantity`) VALUES (:order, :product, :quantity)");

        $this->db->bind(':order', $data['order']);
        $this->db->bind(":product", $data["product"]);
        $this->db->bind(":quantity", $data["quantity"]);

        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function get_last_insert_order_detail()
    {
        $this->db->query('SELECT * FROM order_detail ORDER BY id DESC LIMIT 1');

        if($this->db->single()) {
            return $this->db->single();
        } else {
            return false;
        }
    }

    public function create_order_properties($data)
    {
        
        $this->db->query("INSERT INTO `order_properties` (`id_order_detail`, `property`, `value`) VALUES (:order_detail, :property, :value)");

        $this->db->bind(':order_detail', $data['order_detail']);
        $this->db->bind(":property", $data["property"]);
        $this->db->bind(":value", $data["value"]);

        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function delete($id)
    {
        $this->db->query("DELETE FROM `orders` WHERE `id` = :id");
        $this->db->bind(":id", $id);

        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function delete_detail($id)
    {
        $this->db->query("DELETE FROM `order_detail` WHERE `id_order` = :id");
        $this->db->bind(":id", $id);

        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // jointure between orders and customer

    public function order_customer($id)
    {
        $this->db->query("SELECT O.*, C.`name`, C.`phone`, C.`city`  FROM orders O INNER JOIN customers C ON O.`id_customer` = C.`id` WHERE C.`id_admin` = :id");
        $this->db->bind(':id', $id);
        $res = $this->db->resultSet();
        if($res) {
            return $res;
        } else {    
            return false;
        }
    }

    public function check_order_ref($ref)
    {
        $this->db->query("SELECT * FROM orders WHERE reference = :ref");
        $this->db->bind(':ref', $ref);
        $this->db->execute();
        if($this->db->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function get_order_properties($id)
    {
        $this->db->query("SELECT * FROM order_properties WHERE id_order_detail = :id");
        $this->db->bind(':id', $id);
        $res = $this->db->resultSet();
        if($res) {
            return $res;
        } else {
            return false;
        }
    }

    // jointure between Orders and Order_detail
    public function get_join_all($id)
    {
        $this->db->query("SELECT O.*, OD.* FROM orders O INNER JOIN order_detail OD ON O.`id` = OD.`id_order` WHERE id_order = :id");
        $this->db->bind(':id', $id);
        $res = $this->db->single();
        if($res) {
            return $res;
        } else {
            return false;
        }
    }

    public function change_status($id, $status)
    {
        $this->db->query("UPDATE orders SET status = :status WHERE id = :id");
        $this->db->bind(':id', $id);
        $this->db->bind(':status', $status);
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function change_tracking($id, $tracking)
    {
        $this->db->query("UPDATE orders SET tracking = :tracking WHERE id = :id");
        $this->db->bind(':id', $id);
        $this->db->bind(':tracking', $tracking);
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function get_confirmed_order($id)
    {
        $this->db->query('SELECT O.*, C.`name`, C.`phone`, C.`city`  FROM orders O INNER JOIN customers C ON O.`id_customer` = C.`id` WHERE C.`id_admin` = :id AND status = "Confirmed"');
        $this->db->bind(':id', $id);
        $res = $this->db->resultSet();
        if($res) {
            return $res;
        } else {
            return false;
        }
    }

    public function today_order($id)
    {
        $this->db->query('SELECT O.*, C.`name`, C.`phone`, C.`city`  FROM orders O INNER JOIN customers C ON O.`id_customer` = C.`id` WHERE C.`id_admin` = :id AND DATE(O.`created_at`) = CURDATE()');

        $this->db->bind(':id', $id);
        $res = $this->db->resultSet();
        if($res) {
            return $res;
        } else {
            return false;
        }
    }
}