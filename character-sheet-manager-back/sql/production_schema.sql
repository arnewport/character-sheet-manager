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