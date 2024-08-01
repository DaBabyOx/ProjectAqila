create table if not exists employee(
                         id serial primary key,
                         firstName text not null,
                         lastName text not null,
                         email text not null unique check (email like '%@%'),
                         mobilePhone text not null unique,
                         rolePos text not null,
                         address text not null);

create table if not exists manager(
                        id serial primary key,
                        name text not null unique,
                        rolePos text,
                        mobilePhone text unique,
                        email text unique check (email like '%@%'),
                        address text,
                        namee text,
                        password text not null,);