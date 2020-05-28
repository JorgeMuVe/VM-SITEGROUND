<?php
    class Direccion {
        // DB stuff
        private $conn;
        private $table = 'direccion';

        // Constructor with DB
        public function __construct($db){
            $this->conn = $db;
        }

        // AGREGAR DIRECCIÓN
        public function agregarDireccion(){
            $query = 'CALL agregarDireccion(:idCliente,:denominacionDireccion,:referenciaDireccion,:lat,:lng)';
            $stmt = $this->conn->prepare($query);

            $this->idCliente = htmlspecialchars(strip_tags($this->idCliente));
            $this->denominacionDireccion = htmlspecialchars(strip_tags($this->denominacionDireccion));
            $this->referenciaDireccion = htmlspecialchars(strip_tags($this->referenciaDireccion));
            $this->lat = htmlspecialchars(strip_tags($this->lat));
            $this->lng = htmlspecialchars(strip_tags($this->lng));

            $stmt->bindParam(':idCliente', $this->idCliente);
            $stmt->bindParam(':denominacionDireccion', $this->denominacionDireccion);
            $stmt->bindParam(':referenciaDireccion', $this->referenciaDireccion);
            $stmt->bindParam(':lat', $this->lat);
            $stmt->bindParam(':lng', $this->lng);

            $stmt->execute();
            if($stmt){ return $stmt }
            else { return null }
        }

        // EDITAR DIRECCIÓN
        public function editarDireccion(){
            $query = 'UPDATE direccion SET idCliente=:idCliente, denominacionDireccion=:denominacionDireccion, 
            referenciaDireccion=:referenciaDireccion, lat=:lat, lng=:lng WHERE idDireccion=:idDireccion';
            $stmt = $this->conn->prepare($query);

            $this->idCliente = htmlspecialchars(strip_tags($this->idCliente));
            $this->denominacionDireccion = htmlspecialchars(strip_tags($this->denominacionDireccion));
            $this->referenciaDireccion = htmlspecialchars(strip_tags($this->referenciaDireccion));
            $this->lat = htmlspecialchars(strip_tags($this->lat));
            $this->lng = htmlspecialchars(strip_tags($this->lng));
            $this->idDireccion = htmlspecialchars(strip_tags($this->idDireccion));

            $stmt->bindParam(':idCliente', $this->idCliente);
            $stmt->bindParam(':denominacionDireccion', $this->denominacionDireccion);
            $stmt->bindParam(':referenciaDireccion', $this->referenciaDireccion);
            $stmt->bindParam(':lat', $this->lat);
            $stmt->bindParam(':lng', $this->lng);
            $stmt->bindParam(':idDireccion', $this->idDireccion);

            $stmt->execute();
            if($stmt){ return $stmt }
            else { return null }
        }

        // LISTA DIRECCIONES
        public function listarDirecciones(){
            $query = 'SELECT * FROM direccion WHERE idCliente = :codigoUsuario';
            $stmt = $this->conn->prepare($query);

            $this->codigoUsuario = htmlspecialchars(strip_tags($this->codigoUsuario));
            $stmt->bindParam(':codigoUsuario', $this->codigoUsuario);

            $stmt->execute();
            if($stmt){ return $stmt }
            else { return null }
        }

        // PAGINADO DIRECCIONES
        public function paginadoDirecciones(){
            $queryCantidad = 'SELECT COUNT(*) AS cantidadDirecciones FROM direccion d WHERE d.idCliente = :codigoUsuario';
            $stmtCantidad = $this->conn->prepare($queryCantidad);

            $this->codigoUsuario = htmlspecialchars(strip_tags($this->codigoUsuario));
            $stmtCantidad->bindParam(':codigoUsuario', $this->codigoUsuario);

            $stmtCantidad->execute();
            if($stmtCantidad){
                $queryBusqueda = 'SELECT d.* FROM direccion d WHERE d.idCliente = :codigoUsuario LIMIT :inicio,:cantidad;';
                $stmtBusqueda = $this->conn->prepare($queryBusqueda);
                
                $this->codigoUsuario = htmlspecialchars(strip_tags($this->codigoUsuario));
                $this->inicio = htmlspecialchars(strip_tags($this->inicio));
                $this->cantidad = htmlspecialchars(strip_tags($this->cantidad));
        
                $stmtBusqueda->bindParam(':codigoUsuario', $this->codigoUsuario);
                $stmtBusqueda->bindParam(':inicio', $this->inicio);
                $stmtBusqueda->bindParam(':cantidad', $this->cantidad);

                $stmtBusqueda->execute();
                return $stmtBusqueda;
            } else { return null }
        }
    }
?>