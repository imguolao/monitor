// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]

fn main() {
    monitor_lib::run()
}
