use widestring::{WideCStr, WideStr};

pub fn wide_str_from_slice_truncated(sz: &[u16]) -> &WideStr {
    match WideCStr::from_slice_truncate(&sz) {
        Ok(str) => str.as_ref(),
        Err(_) => WideStr::from_slice(&sz),
    }
}
