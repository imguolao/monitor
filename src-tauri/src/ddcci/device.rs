use windows::{
    core::PCWSTR,
    Win32::{
        UI::WindowsAndMessaging::EDD_GET_DEVICE_INTERFACE_NAME,
        Graphics::Gdi::{
            DISPLAY_DEVICEW,
            EnumDisplayDevicesW,
            DISPLAY_DEVICE_ATTACHED_TO_DESKTOP,
            DISPLAY_DEVICE_MIRRORING_DRIVER,
        },
    },
};
use std::mem;
use widestring::WideCStr;

pub struct Device {
    pub info: DISPLAY_DEVICEW,
}

impl Device {
    pub fn new(info: DISPLAY_DEVICEW) -> Self {
        Self { info }
    }

    pub fn win32_name(&self) -> Option<&WideCStr> {
        WideCStr::from_slice_truncate(&self.info.DeviceName).ok()
    }

    pub fn enumerate() -> impl Iterator<Item = Self> {
        (0..)
            .map(|i| {
                let mut info = DISPLAY_DEVICEW::default();
                info.cb = mem::size_of::<DISPLAY_DEVICEW>() as u32;
                if unsafe {
                    EnumDisplayDevicesW(
                        None,
                        i, 
                        &mut info, 
                        0)
                }.as_bool() {
                    return Some(info);
                }

                None
            })
            .take_while(|d| d.is_some())
            .filter_map(|d| d)
            .map(Self::new)
    }

    pub fn enumerate_with_edd<'a>(&'a self) -> impl Iterator<Item = DISPLAY_DEVICEW> + 'a {
        (0..)
            .map(|i| {
                let name = self.win32_name()?;
                let mut info = DISPLAY_DEVICEW::default();
                info.cb = mem::size_of::<DISPLAY_DEVICEW>() as u32;

                let success = unsafe {
                    EnumDisplayDevicesW(
                        PCWSTR(name.as_ptr()),
                        i, 
                        &mut info, 
                        EDD_GET_DEVICE_INTERFACE_NAME)
                }.as_bool();
                if success && !(
                    (info.StateFlags & DISPLAY_DEVICE_ATTACHED_TO_DESKTOP == 0) ||
                    (info.StateFlags & DISPLAY_DEVICE_MIRRORING_DRIVER != 0)
                ) {
                    return Some(info);
                }

                None
            })
            .take_while(|d| d.is_some())
            .filter_map(|d| d)
    }
}
