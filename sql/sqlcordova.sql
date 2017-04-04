
DROP TABLE IF EXISTS notificacion;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
		id_cliente INT AUTO_INCREMENT PRIMARY KEY, 
		nombre VARCHAR(32) NOT NULL , 
		perfil VARCHAR(15) NOT NULL ,
        contrasena VARCHAR(25) NOT NULL,
        registration_id TEXT NOT NULL);

CREATE TABLE notificacion (
		idNotificacion INT AUTO_INCREMENT PRIMARY KEY, 
		usuario INT(45) NOT NULL , 
        mensaje VARCHAR(200) NOT NULL ,
        hora VARCHAR(45) NOT NULL ,
        FOREIGN KEY (usuario) REFERENCES usuarios(id_cliente) ON DELETE CASCADE );

INSERT INTO usuarios (nombre,perfil,contrasena,registration_id) values('juan',"Normal",'juan',"");
INSERT INTO usuarios (nombre,perfil,contrasena,registration_id) values('cesar',"Normal",'cesar',"");
INSERT INTO usuarios (nombre,perfil,contrasena,registration_id) values('martin',"Admin",'martin',"");

INSERT INTO notificacion (usuario, mensaje, hora) VALUES (1, "hola gente", "15/10/2017");
