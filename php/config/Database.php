<?php
    class Database {
        // DB Paramas

        private $host = '127.0.0.1';
        private $db_name = 'vm';
        private $username = 'root';
        private $password = '';

        //private $host = '35.209.157.186';
        //private $db_name = 'dbbt84b9hvuq64';
        //private $username = 'uxvremg7qnx4t';
        //private $password = 'Worldconnect2020';
        private $conn;

        // DB Connect
        public function connect(){
            $this->conn = null;
            try{
                $this->conn = new PDO('mysql:host='.$this->host.';dbname='.$this->db_name,$this->username,$this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }catch(PDOException $e){
                echo 'Connection Error: '. $e->getMessage();
            }
            return $this->conn;
        }
        
    }