use std::vec::IntoIter;
use serde::Deserialize;
use anyhow::{Context, Ok, Result};
use wmi::{COMLibrary, WMIConnection};
use crate::utils::wide_str_from_slice_truncated;

#[derive(Deserialize, Debug)]
pub struct WmiMonitorID {
    pub Active: bool,
    pub InstanceName: String,
    pub ManufacturerName: Vec<u16>,
    pub ProductCodeID: Vec<u16>,
    pub SerialNumberID: Vec<u16>,
    pub UserFriendlyName: Vec<u16>,
}

impl WmiMonitorID {
    pub fn id(&self) -> String {
        self.InstanceName.replace("&amp;", "&")
    }

    pub fn key(&self) -> String {
        let id = self.id();
        let hwid = id.split("\\").collect::<Vec<_>>();
        let key = hwid[2].split("_").collect::<Vec<_>>();
        key[0].to_string()
    }

    pub fn name(&self) -> String {
        wide_str_from_slice_truncated(&self.UserFriendlyName).to_string_lossy()
    }

    pub fn get_all_monitors() -> Result<Vec<WmiMonitorID>> {
        // TODO: should fix the error(HRESULT Call failed with: 0x80010106)
        let com_con = COMLibrary::without_security()
            .context("Failed to initialize COM library")?;
    
        let wmi_con = WMIConnection::with_namespace_path("root\\WMI", com_con.into())
            .context("Failed to establish WMI connection")?;
    
        let list: Vec<WmiMonitorID> = wmi_con.query()
            .context("Failed to query WMI Monitor ID.")?;
    
        Ok(list)
    }
    
    pub fn enumerate_monitors() -> Result<IntoIter<WmiMonitorID>> {
        Ok(WmiMonitorID::get_all_monitors()?.into_iter())
    }
}
