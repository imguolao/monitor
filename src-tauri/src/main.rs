// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]

mod utils;
mod ddcci;
mod wmi;
mod monitor;
mod command;

use command::{get_monitor_list, set_monitor_brightness};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_monitor_list, set_monitor_brightness])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
