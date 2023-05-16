create extension if not exists "uuid-ossp";

--create type status_enum as enum ('OPEN', 'ORDERED');

DROP TABLE if exists stocks, products, users, carts, cart_items, orders CASCADE;

DROP TABLE if exists products CASCADE;
create table if not exists products (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text,
	price integer not null
);

DROP TABLE if exists stocks CASCADE;
create table if not exists stocks (
	product_id uuid not null primary key,
	count integer not null,
	foreign key ("product_id") references products(id)
);


DROP TABLE if exists users CASCADE;
create table if not exists users (
	id uuid not null default uuid_generate_v4() primary key,
	name text not null,
	password text not null
);

DROP TABLE if exists carts CASCADE;
create table if not exists carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	created_at date not null,
	updated_at date not null,
	status status_enum,
	foreign key ("user_id") references users(id)
);

DROP TABLE if exists cart_items CASCADE;
create table if not exists cart_items (
	id uuid default uuid_generate_v4() primary key,
	product_id uuid not null,
	cart_id uuid,
	count integer not null,
	foreign key ("cart_id") references carts(id),
	foreign key ("product_id") references products(id)
);

DROP TABLE if exists orders CASCADE;
create table if not exists orders (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	cart_id uuid not null,
	payment json,
	delivery json,
	comments text,
	status status_enum,
	total integer,
	foreign key ("user_id") references users(id),
	foreign key ("cart_id") references carts(id)
);

insert into "products" (id, title, description, price) values
('1f95c74f-924b-4076-b84a-173274078194', 'Product 1', 'Rather good 1', 31),
('2f95c74f-924b-4076-b84a-173274078194', 'Product 2', 'Rather good 2', 132),
('3f95c74f-924b-4076-b84a-173274078194', 'Product 3', 'Rather good 3', 3),
('4f95c74f-924b-4076-b84a-173274078194', 'Product 4', 'Rather good 4', 54),
('5f95c74f-924b-4076-b84a-173274078194', 'Product 5', 'Rather good 5', 45);

insert into "stocks" (product_id, count) values
('1f95c74f-924b-4076-b84a-173274078194', 10),
('2f95c74f-924b-4076-b84a-173274078194', 1),
('3f95c74f-924b-4076-b84a-173274078194', 22),
('4f95c74f-924b-4076-b84a-173274078194', 43),
('5f95c74f-924b-4076-b84a-173274078194', 4);

insert into "users" (id, name, password) values
('1a95c74f-924b-4076-b84a-173274078194', 'Mikalai', '0001'),
('2a95c74f-924b-4076-b84a-173274078194', 'Igar', '0002'),
('3a95c74f-924b-4076-b84a-173274078194', 'Oleg', '0003'),
('4a95c74f-924b-4076-b84a-173274078194', 'Vlad', '0004'),
('5a95c74f-924b-4076-b84a-173274078194', 'Ira', '0005');

insert into "carts" (id, user_id, created_at, updated_at, status) values
('1b95c74f-924b-4076-b84a-173274078194', '1a95c74f-924b-4076-b84a-173274078194', '2022-01-15', '2023-03-21', 'OPEN'),
('2b95c74f-924b-4076-b84a-173274078194', '2a95c74f-924b-4076-b84a-173274078194', '2022-02-15', '2023-03-22', 'ORDERED'),
('3b95c74f-924b-4076-b84a-173274078194', '3a95c74f-924b-4076-b84a-173274078194', '2022-03-15', '2023-03-23', 'ORDERED'),
('4b95c74f-924b-4076-b84a-173274078194', '4a95c74f-924b-4076-b84a-173274078194', '2022-04-15', '2023-03-24', 'OPEN');

insert into "cart_items" (id, product_id, cart_id, count) values
('1d95c74f-924b-4076-b84a-173274078194', '1f95c74f-924b-4076-b84a-173274078194', '1b95c74f-924b-4076-b84a-173274078194', 1),
('2d95c74f-924b-4076-b84a-173274078194', '2f95c74f-924b-4076-b84a-173274078194', '1b95c74f-924b-4076-b84a-173274078194', 2),
('3d95c74f-924b-4076-b84a-173274078194', '2f95c74f-924b-4076-b84a-173274078194', '2b95c74f-924b-4076-b84a-173274078194', 2),
('4d95c74f-924b-4076-b84a-173274078194', '3f95c74f-924b-4076-b84a-173274078194', '2b95c74f-924b-4076-b84a-173274078194', 2),
('5d95c74f-924b-4076-b84a-173274078194', '3f95c74f-924b-4076-b84a-173274078194', '3b95c74f-924b-4076-b84a-173274078194', 3),
('6d95c74f-924b-4076-b84a-173274078194', '4f95c74f-924b-4076-b84a-173274078194', '4b95c74f-924b-4076-b84a-173274078194', 4);

