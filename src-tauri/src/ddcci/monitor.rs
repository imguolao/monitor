use windows::Win32::{
    Devices::Display::{
        GetNumberOfPhysicalMonitorsFromHMONITOR,
        GetPhysicalMonitorsFromHMONITOR,
        PHYSICAL_MONITOR,
    },
    Foundation::{BOOL, LPARAM, RECT},
    Graphics::Gdi::{
        EnumDisplayMonitors,
        GetMonitorInfoW,
        HDC,
        HMONITOR,
        MONITORINFOEXW,
    },
};
use std::{mem, ptr};
use anyhow::{Result, Error};
use crate::ddcci::{
    monitor_info::MonitorInfo,
    physical_monitor::PhysicalMonitor,
};

pub struct Monitor {
    pub handle: HMONITOR,
}

impl Monitor {
    pub fn new(handle: HMONITOR) -> Self {
        Self { handle }
    }

    pub fn enumerate() -> Result<impl Iterator<Item = Self>> {
        Self::win32_enumerate().map(|m| m.into_iter().map(Self::new))
    }

    pub fn info(&self) -> Result<MonitorInfo> {
        let info = self.win32_monitor_info()?;
        Ok(MonitorInfo::new(info))
    }

    pub fn enumerate_physical_monitors(&self) -> Result<impl Iterator<Item = PhysicalMonitor>> {
        self.win32_physical_monitors()
            .map(|m| m.into_iter().map(|h| PhysicalMonitor::from_win32(h) ))
    }

    pub fn win32_enumerate() -> Result<Vec<HMONITOR>, Error> {
        unsafe extern "system" fn callback(
            handle: HMONITOR,
            _hdc_monitor: HDC,
            _lprc: *mut RECT,
            userdata: LPARAM,
        ) -> BOOL {
            let monitors: &mut Vec<HMONITOR> = mem::transmute(userdata);
            monitors.push(handle);
            BOOL::from(true)
        }

        let mut monitors = Vec::<HMONITOR>::new();
        let userdata = LPARAM(&mut monitors as *mut _ as _);
        if !(unsafe { EnumDisplayMonitors(None, None, Some(callback), userdata) }.as_bool()) {
            return Err(Error::msg("Fail to get display monitors."))
        }

        Ok(monitors)
    }

    pub fn win32_monitor_info(&self) -> Result<MONITORINFOEXW, Error> {
        let mut out = MONITORINFOEXW::default();
        out.monitorInfo.cbSize = mem::size_of::<MONITORINFOEXW>() as _;
        
        if !(unsafe { GetMonitorInfoW(self.handle, ptr::addr_of_mut!(out.monitorInfo)) }.as_bool()) {
            return Err(Error::msg("Fail to get monitor info."));
        }

        Ok(out)
    }

    pub fn win32_physical_monitors(&self) -> Result<Vec<PHYSICAL_MONITOR>> {
        let mut len = 0;
        unsafe { GetNumberOfPhysicalMonitorsFromHMONITOR(self.handle, &mut len) }?;

        let mut monitors = vec![PHYSICAL_MONITOR::default(); len as usize];
        unsafe { GetPhysicalMonitorsFromHMONITOR(self.handle, &mut monitors) }?;

        Ok(monitors)
    }
}
