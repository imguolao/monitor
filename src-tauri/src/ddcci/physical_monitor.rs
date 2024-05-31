use windows::Win32::Devices::Display::PHYSICAL_MONITOR;

pub struct PhysicalMonitor {
    pub handle: PHYSICAL_MONITOR,
}

impl PhysicalMonitor {
    pub const fn from_win32(handle: PHYSICAL_MONITOR) -> Self {
        Self { handle }
    }
}
