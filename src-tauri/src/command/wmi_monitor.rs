use anyhow::{Result, Context};
use wmi::{COMLibrary, WMIConnection, Variant};
use std::collections::HashMap;

#[tauri::command]
pub fn get_monitor_user_friendly_names() -> Result<Vec<String>> {
    let com_con = COMLibrary::new().context("Failed to initialize COM library")?;

    let wmi_con = WMIConnection::with_namespace_path("root\\WMI", com_con.into())
        .context("Failed to establish WMI connection")?;
    
    let results: Vec<HashMap<String, Variant>> = wmi_con.raw_query("SELECT * FROM WmiMonitorID  WHERE Active=TRUE")
        .context("Failed to query WMI for monitor information")?;
    
    let mut monitor_names = Vec::new();
    for result in results {
        if let Some(Variant::Array(name)) = result.get("UserFriendlyName") {
            let name_strings: Vec<u16> = name.iter()
                .filter_map(|n| {
                    if let Variant::UI2(val) = n {
                        Some(*val)
                    } else {
                        None
                    }
                })
                .collect();
            
            let user_friendly_name = String::from_utf16(&name_strings)
                .context("Failed to convert UTF-16 to String")?;
            monitor_names.push(user_friendly_name);
        }
    }
    
    Ok(monitor_names)
}
