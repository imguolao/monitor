use std::{collections::HashMap, vec::IntoIter};
use anyhow::Result;
use windows::Win32::Devices::Display::PHYSICAL_MONITOR;
use windows::Win32::Graphics::Gdi::DISPLAY_DEVICEW;
use crate::ddcci::device::Device;
use crate::ddcci::monitor::Monitor;
use crate::utils::wide_str_from_slice_truncated;

pub struct DisplayMonitor {
    pub pMonitor: PHYSICAL_MONITOR,
    pub deviceInfo: DISPLAY_DEVICEW,
}

impl DisplayMonitor {
    pub fn new(p_monitor: PHYSICAL_MONITOR, device_info: DISPLAY_DEVICEW) -> Self {
        Self {
            pMonitor: p_monitor,
            deviceInfo: device_info,
        }
    }

    pub fn id(&self) -> String {
        wide_str_from_slice_truncated(&self.deviceInfo.DeviceID).to_string_lossy()
    }

    pub fn name(&self) -> String {
        let id = self.id();
        id.split("#").collect::<Vec<_>>()[1].to_string()
    }

    pub fn key(&self) -> String {
        let id = self.id();
        id.split("#").collect::<Vec<_>>()[2].to_string()
    }

    pub fn enumerate_monitors() -> Result<IntoIter<DisplayMonitor>> {
        Ok(DisplayMonitor::get_active_monitors()?.into_iter())
    }

    pub fn get_active_monitors() -> Result<Vec<DisplayMonitor>> {
        let device_hash_map = Device::enumerate()
        .map(|d| d.enumerate_with_edd().collect::<Vec<_>>())
        .flat_map(|inner| inner)
        .map(|d| (wide_str_from_slice_truncated(&d.DeviceName).to_string_lossy(), d))
        .collect::<HashMap<_, _>>();

        let mut display_monitors = Vec::<DisplayMonitor>::new();
        for monitor in Monitor::enumerate()? {
            let monitor_info = monitor.info()?;
            for (i, p_monitor) in monitor.enumerate_physical_monitors()?.enumerate() {
                let monitor_name = monitor_info.with_monitor_index_name(i as i32);
                device_hash_map.get(&monitor_name).map(|v| {
                    let d_monitor = DisplayMonitor::new(p_monitor.handle, *v);
                    display_monitors.push(d_monitor);
                });
            }
        }

        Ok(display_monitors)
    }
}
