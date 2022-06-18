<?php 

    class Sheet {
        private $db;

        public function __construct()
        {
            $this->db = new Database();
        }

        public function get_all_sheets($id)
        {
            $this->db->query('SELECT * FROM spreadsheets WHERE id_admin = :id ORDER BY id DESC');
            $this->db->bind(':id', $id);
            return $this->db->resultSet();
        }

        public function get_sheet($id)
        {
            $this->db->query('SELECT * FROM spreadsheets WHERE id = :id');
            $this->db->bind(':id', $id);
            if($this->db->single()) {
                return $this->db->single();
            } else {
                return false;
            }
        }

        public function create($data)
        {
            //create a query
            $this->db->query("INSERT INTO `spreadsheets` (`id_admin`, `fileName`, `spreadsheetId`) VALUES (:id, :name, :spreadsheetId)");
            
            // bind the values
            $this->db->bind(':id', $data['id']);
            $this->db->bind(":name", $data["fileName"]);
            $this->db->bind(":spreadsheetId", $data["spreadsheetId"]);

            // check execution the query
            if ($this->db->execute()) {
                return true;
            } else {
                return false;
            }
        }

        public function delete($id)
        {
            //create a query
            $this->db->query("DELETE FROM `spreadsheets` WHERE `id` = :id");
            
            // bind the values
            $this->db->bind(":id", $id);

            // check execution the query
            if ($this->db->execute()) {
                return true;
            } else {
                return false;
            }
        }
    }
