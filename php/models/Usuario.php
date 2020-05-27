<?php
    class Usuario {
        // DB stuff
        private $conn;
        private $table = 'usuario';

        // Usuario Properties
        public $idUsuario;
        public $nombreUsuario;
        public $contrasena;
        public $tipoUsuario;
        public $codigoUsuario;

        // Constructor with DB
        public function __construct($db){
            $this->conn = $db;
        }

        // Agregar Usuario
        public function agregarUsuario() {
            $query='CALL agregarUsuario(:registroNacional,:nombreCompleto,:apellidoPaterno,:apellidoMaterno,:nombreUsuario,:contrasena,:tipoUsuario);';
            $stmt = $this->conn->prepare($query);
            $this->registroNacional = htmlspecialchars(strip_tags($this->registroNacional));
            $this->nombreCompleto = htmlspecialchars(strip_tags($this->nombreCompleto));
            $this->apellidoPaterno = htmlspecialchars(strip_tags($this->apellidoPaterno));
            $this->apellidoMaterno = htmlspecialchars(strip_tags($this->apellidoMaterno));
            $this->nombreUsuario = htmlspecialchars(strip_tags($this->nombreUsuario));
            $this->contrasena = htmlspecialchars(strip_tags($this->contrasena));
            $this->tipoUsuario = htmlspecialchars(strip_tags($this->tipoUsuario));
            $stmt->bindParam(':registroNacional', $this->registroNacional);
            $stmt->bindParam(':nombreCompleto', $this->nombreCompleto);
            $stmt->bindParam(':apellidoPaterno', $this->apellidoPaterno);
            $stmt->bindParam(':apellidoMaterno', $this->apellidoMaterno);
            $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
            $stmt->bindParam(':contrasena', $this->contrasena);
            $stmt->bindParam(':tipoUsuario', $this->tipoUsuario);
            $stmt->execute();
            return $stmt;
        }

        // Ingresar Verificar Usuario
        public function ingresarSistema(){
            $query = 'CALL ingresarSistema(:nombreUsuario,:contrasena,:tipoUsuario);';
            $stmt = $this->conn->prepare($query);
            $this->nombreUsuario = htmlspecialchars(strip_tags($this->nombreUsuario));
            $this->contrasena = htmlspecialchars(strip_tags($this->contrasena));
            $this->tipoUsuario = htmlspecialchars(strip_tags($this->tipoUsuario));
            $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
            $stmt->bindParam(':contrasena', $this->contrasena);
            $stmt->bindParam(':tipoUsuario', $this->tipoUsuario);
            $stmt->execute();
            return $stmt;
        }

        // Buscar un Usuario Cliente
        public function buscarUsuarioCliente(){
            $query = 'CALL buscarUsuarioCliente(:codigoUsuario);';
            $stmt = $this->conn->prepare($query);
            $this->codigoUsuario = htmlspecialchars(strip_tags($this->codigoUsuario));
            $stmt->bindParam(':codigoUsuario', $this->codigoUsuario);
            $stmt->execute();
            return $stmt;
        }

        // Buscar un Usuario Negocio
        public function buscarUsuarioNegocio(){
            $query = 'CALL buscarUsuarioNegocio(:codigoUsuario);';
            $stmt = $this->conn->prepare($query);
            $this->codigoUsuario = htmlspecialchars(strip_tags($this->codigoUsuario));
            $stmt->bindParam(':codigoUsuario', $this->codigoUsuario);
            $stmt->execute();
            return $stmt;
        }
    }
?>