-- create database novotic;

CREATE TABLE abono 
(
    codigo_abono INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fecha_abono DATE NOT NULL,
    valor_abono  DECIMAL NOT NULL CHECK (valor_abono > 0),
    codigo_cartera INT(10)
);

CREATE TABLE cartera
(
    codigo_cartera INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fecha_cartera DATE NOT NULL,
    couta_restante_cartera INT(3) NOT NULL,
    pendiente_cartera DECIMAL NOT NULL,
    estado_cartera BOOLEAN NOT NULL,
    id_cliente INT(10),
    codigo_venta INT(10)
);

CREATE TABLE tipo_rol
(
    id_rol INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    estado_rol BOOLEAN NOT NULL
);

CREATE TABLE venta
(
    codigo_venta INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fecha_venta DATE NOT NULL,
    valor_total_venta  DECIMAL NOT NULL CHECK (valor_total_venta > 0) ,
    id_cliente INT(10)
);

CREATE TABLE detalle_venta
(
    codigo_detalle_venta INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    precio_unitario_detalle_venta DECIMAL NOT NULL,
    cantidad_detalle_venta DECIMAL NOT NULL,
    valor_total_detalle_venta DECIMAL NOT NULL,
    subtotal_detalle_venta DECIMAL NOT NULL,
    codigo_venta INT(10),
    codigo_producto INT(10)
);

CREATE TABLE producto
(
    codigo_producto INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_producto VARCHAR(20) NOT NULL,
    precio_prducto  DECIMAL NOT NULL CHECK (precio_prducto > 0),
    descripcion_producto TEXT NOT NULL,
    imagen BLOB NOT NULL,
    estado BOOLEAN
);


CREATE TABLE cliente
(
    id_cliente INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cedula_cliente VARCHAR(60) NOT NULL,
    nombre_cliente VARCHAR(60) NOT NULL,
    apellido_cliente VARCHAR(60) NOT NULL,
    email_cliente VARCHAR(60) NOT NULL,
    telefono_cliente VARCHAR(12) NOT NULL,
    direccion_cliente VARCHAR(60) NOT NULL,
    camara_comercio_cliente VARCHAR(20),
    nit_rut_cliente VARCHAR(20),
    departamento_cliente VARCHAR(60) NOT NULL,
    ciudad_cliente VARCHAR(60) NOT NULL,
    estado_cliente VARCHAR(20),
    password_cliente TEXT NOT NULL,
    rol_cliente INT(10)
);

-- RELACIONES DE TABLAS
ALTER TABLE abono 
    ADD CONSTRAINT abono_cartera 
    FOREIGN KEY (codigo_cartera) 
    REFERENCES cartera(codigo_cartera)
        ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE cliente 
    ADD CONSTRAINT cliente_tipo_rol 
    FOREIGN KEY (rol_cliente) 
    REFERENCES tipo_rol (id_rol)
        ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE cartera 
    ADD CONSTRAINT cartera_cliente 
    FOREIGN KEY (id_cliente) 
    REFERENCES cliente (id_cliente)
        ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE cartera 
    ADD CONSTRAINT cartera_venta
    FOREIGN KEY (codigo_venta) 
    REFERENCES venta(codigo_venta)
        ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE venta 
    ADD CONSTRAINT venta_cliente 
    FOREIGN KEY (id_cliente) 
    REFERENCES cliente (id_cliente)
        ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE detalle_venta 
    ADD CONSTRAINT detalle_venta_venta 
    FOREIGN KEY (codigo_venta) 
    REFERENCES venta (codigo_venta)
        ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE detalle_venta 
    ADD CONSTRAINT detalle_venta_producto 
    FOREIGN KEY (codigo_producto) 
    REFERENCES producto (codigo_producto)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;


