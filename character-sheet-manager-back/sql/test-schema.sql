drop database if exists character_sheet_test;
create database character_sheet_test;
use character_sheet_test;

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
    
delimiter //
create procedure set_known_good_state()
begin
	delete from user_sheet;
	delete from app_user_role;
    delete from app_role;
    alter table app_role auto_increment = 1;
    delete from app_user;
    alter table app_user auto_increment = 1;
	delete from sheet;
    alter table sheet auto_increment = 1;
    
    
	insert into sheet values
		(1, 'Player 1', 'Character 1', 0, 0, 0, 0, 0, 0),
        (2, 'Player 2', 'Character 2', 0, 0, 0, 0, 0, 0);
        
	insert into app_role (`name`) values
		('TEST_ROLE_1'),
		('TEST_ROLE_2');

	-- passwords are set to "P@ssw0rd!"
	insert into app_user (username, password_hash, enabled)
		values
		('appuser1@app.com', 'password_hash_1', 1),
		('appuser2@app.com', 'password_hash_2', 1);

	insert into app_user_role
		values
		(1, 1),
		(2, 1);
        
	insert into user_sheet values 
		(1, 1, 1, "OWNER", "NONE"),
        (2, 2, 2, "OWNER", "NONE");
    
end //
delimiter ;