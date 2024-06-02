use anyhow::Result;
use windows::Win32::{
    Devices::Display::{
        MC_VCP_CODE_TYPE,
        // DestroyPhysicalMonitor,
        GetVCPFeatureAndVCPFeatureReply,
        SetVCPFeature,
    },
    Foundation::{BOOL, HANDLE},
};
use crate::{
    ddcci::display_monitor::DisplayMonitor,
    wmi::WmiMonitorID,
};

const BRIGHTNESS_MIN: u32 = 0;
const VCP_BRIGHTNESS_CODE: u8 = 0x10;

pub struct Monitor {
    pub id: String,
    pub name: String,
    pub brightness_current: u32,
    pub brightness_max: u32,
    pub brightness_min: u32,
    // pub wmi_monitor: WmiMonitorID,
    pub display_monitor: DisplayMonitor,
}

impl Monitor {
    pub fn new(
        id: String,
        name: String,
        brightness_current: u32,
        brightness_max: u32,
        // wmi_monitor: WmiMonitorID,
        display_monitor: DisplayMonitor,
    ) -> Self {
        Self {
            id,
            name,
            brightness_current,
            brightness_max,
            brightness_min: BRIGHTNESS_MIN,
            // wmi_monitor,
            display_monitor,
        }
    }

    pub fn get_all_monitors() -> Result<Vec<Monitor>> {
        // TODO: should fix
        // let wmi_monitors = WmiMonitorID::enumerate_monitors()?;
        // let monitor_handles = DisplayMonitor::enumerate_monitors()?
        //     .map(|d| {
        //         wmi_monitors
        //             .find(|v| v.key() == d.key())
        //             .map(|v| (v, d))
        //     })
        //     .take_while(|v| v.is_some())
        //     .filter_map(|v| v)
        //     .collect::<Vec<_>>();

        // let mut monitors = Vec::<Monitor>::new();
        // for (wmi_monitor, display_monitor) in monitor_handles {
        //     let (current, max) = Monitor::get_brightness_by_ddc(display_monitor.pMonitor.hPhysicalMonitor)?;
        //     monitors.push(Monitor::new(
        //         display_monitor.id(),
        //         current,
        //         max,
        //         wmi_monitor,
        //         display_monitor,
        //     ));
        // }

        let monitor_handles = DisplayMonitor::get_active_monitors()?;

        let mut monitors = Vec::<Monitor>::new();
        for display_monitor in monitor_handles {
            let (current, max) = Monitor::get_brightness_by_ddc(display_monitor.pMonitor.hPhysicalMonitor)?;
            let id = display_monitor.id();
            let name = display_monitor.name();
            monitors.push(Monitor::new(
                id,
                name,
                current,
                max,
                display_monitor,
            ));
        }

        Ok(monitors)
    }

    pub fn get_brightness_by_ddc(h_physical_monitor: HANDLE) -> Result<(u32, u32)> {
        let mut ty = MC_VCP_CODE_TYPE::default();
        let mut current = 0;
        let mut max = 0;
        BOOL(unsafe {
            GetVCPFeatureAndVCPFeatureReply(
                h_physical_monitor,
                VCP_BRIGHTNESS_CODE, 
                Some(&mut ty),
                &mut current, 
                Some(&mut max)
            )
        }).ok()?;

        Ok((current, max))
    }

    pub fn set_brightness_by_ddc(h_physical_monitor: HANDLE, value: u32) -> Result<()> {
        BOOL(unsafe {
            SetVCPFeature(h_physical_monitor, VCP_BRIGHTNESS_CODE, value)
        }).ok()?;

        Ok(())
    }
}

// impl Drop for Monitor {
//     fn drop(&mut self) {
//         unsafe { DestroyPhysicalMonitor(self.display_monitor.pMonitor.hPhysicalMonitor).ok() };
//     }
// }
