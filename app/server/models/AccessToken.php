<?php

    class AccessToken {
        private $db;

        public function __construct()
        {
            $this->db = new Database;
        }

        public function is_table_empty() {
            $this->db->query("SELECT id FROM google_oauth WHERE provider = 'google'");
            if($this->db->rowCount() > 0) {
                return false;
            }
            return true;
        }
        
        public function get_access_token() {
            $this->db->query("SELECT provider_value FROM google_oauth WHERE provider = 'google'");
            $result = $this->db->single();
            if($result) {
                return $result->provider_value;
            }
        }
      
        public function get_refersh_token() {
            $result = $this->get_access_token();
            return $result->refresh_token;
        }
      
        public function update_access_token($token) {
            if($this->is_table_empty()) {
                $this->db->query("INSERT INTO google_oauth(provider, provider_value) VALUES('google', :token)");
                $this->db->bind(':token', $token);
                $this->db->execute();
            } else {
                $this->db->query("UPDATE google_oauth SET provider_value = :token WHERE provider = 'google'");
                $this->db->bind(':token', $token);
                $this->db->execute();
            }
        }
    }
