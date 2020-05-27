<?php
    class Venta {
        // DB stuff
        private $conn;
        private $table = 'venta';

        // Venta Properties
        public $idVenta;
        public $idNegocio;
        public $idPedido;

        // Constructor with DB
        public function __construct($db){
            $this->conn = $db;
        }

        // Listar ventas de Negocio
        public function listaNegocio(){
            $queryCantidad = 'SELECT COUNT(*) AS cantidadVentas FROM venta WHERE idNegocio = :codigoUsuario';
            $stmtCantidad = $this->conn->prepare($queryCantidad);

            $this->codigoUsuario = htmlspecialchars(strip_tags($this->codigoUsuario));
            $stmtCantidad->bindParam(':codigoUsuario', $this->codigoUsuario);

            $stmtCantidad->execute();
            if($stmtCantidad){
                $queryBusqueda = 'CALL listarPedidoNegocio(:codigoUsuario,:inicio,:cantidad)';
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

        // Agregar Venta
        public function agregarVenta() {
            $query = 'INSERT INTO venta(idNegocio,idPedido) VALUES (:idNegocio,:idPedido);';
            $stmt = $this->conn->prepare($query);
            $this->idNegocio = htmlspecialchars(strip_tags($this->idNegocio));
            $this->idPedido = htmlspecialchars(strip_tags($this->idPedido));
            $stmt->bindParam(':idNegocio', $this->idNegocio);
            $stmt->bindParam(':idPedido', $this->idPedido);
            $stmt->execute();
            return $stmt;
        }

        
    }
?>