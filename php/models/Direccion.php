<?php
    class Direccion {
        // DB stuff
        private $conn;
        private $table = '';

        // Constructor with DB
        public function __construct($db){
            $this->conn = $db;
        }
    }
?>