drop database if exists character_sheet;
create database character_sheet;
use character_sheet;

-- tables
create table sheet (
	sheet_id int primary key auto_increment,
    player_name varchar(100),
    character_name varchar(100),
    cur_hit_points int,
    max_hit_points int,
    armor_class int,
    saving_throw int,
    thac0 int,
    attack_bonus int
);

-- data
insert into sheet values
	(1, 'Player', 'Character', 10, 20, 16, 14, 19, 0);
    
-- security
drop table if exists app_user_role;
drop table if exists app_role;
drop table if exists app_user;

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, enabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into app_user_role
    values
    (1, 1),
    (2, 1);

-- bridge table
    
create table user_sheet (
	user_sheet_id int primary key auto_increment,
    user_id int not null,
    sheet_id int not null,
    `role` varchar(10) not null,
    `status` varchar(50) not null,
    constraint fk_user_user_sheet_id
        foreign key (user_id)
        references app_user(app_user_id),
    constraint fk_user_sheet_sheet_id
        foreign key (sheet_id)
        references sheet(sheet_id)
);

insert into user_sheet values 
	(1, 1, 1, "OWNER", "NONE");