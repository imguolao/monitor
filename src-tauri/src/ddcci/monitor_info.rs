use windows::Win32::Graphics::Gdi::MONITORINFOEXW;
use crate::utils::wide_str_from_slice_truncated;

pub struct MonitorInfo {
    pub info: MONITORINFOEXW,
}

impl MonitorInfo {
    pub fn new(info: MONITORINFOEXW) -> Self {
        Self { info }
    }

    pub fn with_monitor_index_name(&self, index: i32) -> String {
        let name = wide_str_from_slice_truncated(&self.info.szDevice);
        format!("{}\\Monitor{}", name.to_string_lossy(), index)
    }
}

