create  database if not exists proyecto_movilidad;

create table if not exists pais(
id_pais integer auto_increment,
nombre varchar(30) not null,
constraint primaria_pais primary key(id_pais)
);

create table if not exists  universidad(
id_universidad integer auto_increment,
nombre varchar(30) not null,
constraint primaria_universidad primary key(id_universidad)
);

create table if not exists  admin(
id_admin integer auto_increment,
usuario varchar(60) not null,
password varchar(60) not null,
constraint primaria_admin primary key(id_admin)
);

insert into admin values(1,'123','123');

create table if not exists  pais_universidad(
id_pais_universidad integer auto_increment,
id_pais integer not null,
id_universidad integer not null,
constraint foranea_pais_universidad_pais foreign key(id_pais) references pais(id_pais),
constraint foranea_pais_universidad_universidad foreign key(id_universidad) references universidad(id_universidad),
constraint primaria_pais_universidad primary key(id_pais_universidad)
);

create table if not exists  experiencia(
id_experiencia integer auto_increment,
id_universidad integer not null,
url_video varchar(200) not null,
constraint foranea_experiencia_universidad foreign key(id_universidad) references universidad(id_universidad),
constraint primaria_experiencia primary key(id_experiencia)
);

create table if not exists  requisito(
id_requisito integer auto_increment,
nombre varchar(60) not null,
descripcion varchar(200) not null,
constraint primaria_requisito primary key(id_requisito)
);

create table if not exists  universidad_requisito(
id_universidad_requisito integer auto_increment,
id_universidad integer not null,
id_requisito integer not null,
constraint foranea_universidad_requisito_universidad foreign key(id_universidad) references universidad(id_universidad),
constraint foranea_universidad_requisito_requisito foreign key(id_requisito) references requisito(id_requisito),
constraint primaria_universidad_requisito primary key(id_universidad_requisito)
);

create table if not exists  tipo_movilidad(
id_tipo_movilidad integer auto_increment,
nombre varchar(60) not null,
descripcion varchar(200) not null,
constraint primaria_tipo_movilidad primary key(id_tipo_movilidad)
);

create table if not exists  tipo_movilidad_requisito(
id_tipo_movilidad_requisito integer auto_increment,
id_tipo_movilidad integer not null,
id_requisito integer not null,
constraint foranea_tipo_movilidad_requisito_tipo_movilidad foreign key(id_tipo_movilidad) references tipo_movilidad(id_tipo_movilidad),
constraint foranea_tipo_movilidad_requisito_requisito foreign key(id_requisito) references requisito(id_requisito),
constraint primaria_tipo_movilidad_requisito primary key(id_tipo_movilidad_requisito)
);


create table if not exists convenio_marco(
id_convenio_marco integer auto_increment,
nombre varchar(60) not null,
descripcion varchar(200) not null,
constraint primaria_convenio_marco primary key(id_convenio_marco)
);


create table if not exists  convenio(
id_convenio integer auto_increment,
nombre varchar(60) not null,
descripcion varchar(200) not null,
id_tipo_movilidad integer not null,
id_convenio_marco integer not null,
id_universidad integer not null,
constraint foranea_convenio_universidad foreign key(id_universidad) references universidad(id_universidad),
constraint foranea_convenio_convenio_marco foreign key(id_convenio_marco) references convenio_marco(id_convenio_marco),
constraint foranea_convenio_tipo_movilidad foreign key(id_tipo_movilidad) references tipo_movilidad(id_tipo_movilidad),
constraint primaria_convenio primary key(id_convenio)
);


create table if not exists convenio_especifico(
id_convenio_especifico integer auto_increment,
id_convenio_marco integer not null,
nombre varchar(60) not null,
descripcion varchar(200) not null,
constraint foaranea_convenio_espeficio_convenio_marco foreign key(id_convenio_marco) 
references convenio_marco(id_convenio_marco),
constraint primaria_convenio_especifico primary key(id_convenio_especifico)
);

create table if not exists convenio_especifico_requisito(
id_convenio_especifico_requisito integer auto_increment,
id_requisito integer not null,
id_convenio_especifico integer not null,
constraint foaranea_convenio_especifico_requisito foreign key(id_requisito) 
references requisito(id_requisito),
constraint foranea_convenio_especifico_requisito_convenio_especifico foreign key(id_convenio_especifico) 
references convenio_especifico(id_convenio_especifico),
constraint primaria_convenio_especifico_requisito primary key(id_convenio_especifico_requisito)
);


create table if not exists  convenio_requisito(
id_convenio_requisito integer auto_increment,
id_convenio integer not null,
id_requisito integer not null,
constraint foranea_convenio_requisito_convenio foreign key(id_convenio) references convenio(id_convenio),
constraint foranea_convenio_requisito_requisito foreign key(id_requisito) references requisito(id_requisito),
constraint primaria_convenio_requisito primary key(id_convenio_requisito)
);

