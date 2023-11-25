# **Api ComoNuevos**

###Este repositorio contiene una API desarrollada con Express que maneja relaciones estructuradas entre usuarios y administradores.

##Configuración
###Antes de ejecutar la aplicación, asegúrate de tener configuradas las variables de entorno. Crea un archivo .env en el directorio raíz y define las siguientes variables:
>PORT
>DB_HOST
>DB_USER
>DB_PASSWORD
>DB_DATABASE
>JWT_SECRET
>EMAIL_USER
>EMAIL_PASS

###La aplicación también utiliza Swagger para documentar la API. La documentación estará disponible en http://localhost:{PORT}/api-docs.

##Instalación
1. Clona el repositorio:
>git clone https://github.com/DaniGom3z/backend-ComoNuevos.git
1. Instala las dependencias:
>npm install

##Migraciones
###Este proyecto utiliza migraciones de base de datos para gestionar los cambios en la estructura de la base de datos.
###Ejecutar migraciones
>npx knex migrate:up
###Revertir migracion
>npx knex migrate:down

###Asegúrate de ejecutar estos comandos en el directorio raíz del proyecto.

##Trigger
###Ejecuta los siguientes codigos en la base de datos:
1. DELIMITER //
CREATE TRIGGER before_insert_citas
BEFORE INSERT ON citas
FOR EACH ROW
BEGIN
  IF EXISTS (SELECT 1 FROM citas WHERE correo = NEW.correo) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El correo ya está registrado en la tabla de citas';
  END IF;
END;
//
DELIMITER ;
1. DELIMITER //
CREATE TRIGGER before_insert_cita
BEFORE INSERT ON citas
FOR EACH ROW
BEGIN
  -- Validar que la fecha de la cita no sea menor a la fecha actual
  IF NEW.dia < CURDATE() THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'La fecha de la cita no puede ser menor a la fecha actual';
  END IF;
END;
//
DELIMITER ;

##Procedimientos Almacenados
###Ejecuta los siguientes codigos en la base de datos:
1. DELIMITER //

-- Crear el procedimiento almacenado
CREATE PROCEDURE ObtenerUsuarioPorID(IN usuarioID INT)
BEGIN
  -- Instrucción SQL para obtener información del usuario por ID
  SELECT * FROM login WHERE id_user = usuarioID;
END //

-- Restaurar el delimitador a ;
DELIMITER ;
1. CREATE PROCEDURE ObtenerCitas(IN offsetVal INT, IN limitVal INT, IN sort VARCHAR(255), IN orderType VARCHAR(4))
BEGIN
  DECLARE sortClause VARCHAR(255);
  SET sortClause = IFNULL(CONCAT('ORDER BY ', sort, ' ', orderType), '');

  SET @query = CONCAT(
    'SELECT id_cita, nombre, correo, dia, IF(deleted_at IS NULL, false,true) AS eliminada_logicamente FROM citas
',
    sortClause,
    ' LIMIT ? OFFSET ?'
  );

  PREPARE stmt FROM @query;
  SET @limitVal = limitVal;
  SET @offsetVal = offsetVal;

  EXECUTE stmt USING @limitVal, @offsetVal;

  DEALLOCATE PREPARE stmt;
END //

DELIMITER ;


##Ejecución
>nodemon index.js
###La aplicación estará disponible en http://localhost:{PORT}.

##Estructura del Proyecto.
1. src/routes/usuarios.route.js: Contiene las rutas relacionadas con la gestión de usuarios.
1. src/routes/administrador.route.js: Contiene las rutas relacionadas con la gestión de administradores.
1. src/documentacion/swagger.js: Configuración para generar la documentación Swagger.

##Endpoints de la API del Administrador.

1. POST /registro: Registra un nuevo administrador.

1. POST /iniciar: Inicia sesión del administrador.

1. GET /auto: Obtiene la lista de autos.
1. GET /auto/{id_auto}: Obtiene detalles de un auto por ID.
1. POST /autos: Ingresa un nuevo auto.
1. PUT /autos/{id_auto}: Actualiza datos de un auto.
1. DELETE /eliminacionfisica/{id_auto}: Eliminación física de un auto.
1. DELETE /eliminacionlogica/{id_auto}: Eliminación lógica de un auto.
1. PUT /recuperarauto/{id_auto}: Recupera un auto.

1. GET /citas: Obtiene la lista de citas.
1. DELETE /eliminarcitafisica/{id_cita}: Eliminación física de una cita.
1. DELETE /eliminarcitalogica/{id_cita}: Eliminación lógica de una cita.
1. PUT /recuperarcita/{id_cita}: Recupera una cita.

1. GET /informacion/{id_user}: Obtiene información detallada del administrador.
1. POST /cerrarSesion: Cierra la sesión del administrador.

##Endpoints de la API del Usuario.

1. GET /autos: Obtiene la lista de autos disponibles.

1. GET /autos/{id_auto}: Obtiene detalles de un auto específico por ID.

1. POST /agendarcita: Permite a los usuarios agendar una cita.
