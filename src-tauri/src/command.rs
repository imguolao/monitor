use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use once_cell::sync::Lazy;
use anyhow::Result;
use serde::{Deserialize, Serialize};
use crate::monitor::Monitor;

static MONITORS: Lazy<Arc<Mutex<Option<HashMap<String, Monitor>>>>> = Lazy::new(|| Arc::new(Mutex::new(None))); 

#[derive(Debug, Deserialize, Serialize)]
pub struct MonitorItem {
    id: String,
    name: String,
    current: u32,
    max: u32,
    min: u32,
}

fn init_monitors() -> Result<()> {
    let mut monitors = MONITORS.lock().unwrap();
    if !monitors.is_some() {
        let list = Monitor::get_all_monitors()?
            .into_iter()
            .map(|m| (m.id.clone(), m))
            .collect::<HashMap<_, _>>();

        *monitors = Some(list);
    }

    Ok(())
}

#[tauri::command]
pub fn get_monitor_list() -> Result<Vec<MonitorItem>, String> {
    if let Err(e) = init_monitors() {
        // TODO: should log here
        return Err(e.to_string().into());
    }

    let monitors = MONITORS.lock().unwrap();
    if let Some(monitor_map) = monitors.as_ref() {
        let list = monitor_map
            .iter()
            .map(|(_, v)| MonitorItem {
                id: v.id.clone(),
                name: v.name.clone(),
                current: v.brightness_current,
                max: v.brightness_max,
                min: v.brightness_min,
            })
            .collect::<Vec<_>>();
        return Ok(list);
    }

    Ok(Vec::new())
}

#[tauri::command]
pub fn set_monitor_brightness(id: String, value: u32) -> Result<bool, String> {
    if let Err(e) = init_monitors() {
        // TODO: should log here
        return Err(e.to_string().into());
    }

    let mut monitors = MONITORS.lock().unwrap();
    if let Some(ref mut monitor_map) = *monitors {
        match monitor_map.get_mut(&id) {
            Some(monitor) => {
                let handle = monitor.display_monitor.pMonitor.hPhysicalMonitor;
                let result = Monitor::set_brightness_by_ddc(handle, value);
                if let Err(e) = result {
                    // TODO: should log here
                    return Err(e.to_string().into());
                }

                monitor.brightness_current = value;
            },
            None => {
                let error_msg = format!("Can't found the monitor({})", &id);
                return Err(error_msg.into());
            }
        }

        return Ok(true);
    }

    Ok(false)
}
