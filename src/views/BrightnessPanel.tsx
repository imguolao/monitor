import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { invoke } from '@tauri-apps/api/core';
import { Slider } from "@nextui-org/react";
import Card from "@/components/card/Card";
import Field from "@/components/field/Field";
import MonitorIcon from "@/components/icon/Monitor";
import { debounce } from "@/utils";

type Monitor = {
  id: string,
  name: string,
  current: number,
  max: number,
  min: number,
}

async function getMonitorList() {
  return await invoke<Monitor[]>('get_monitor_list');
}

async function setMonitorBrightness(id: string, value: number) {
  const brightness = Math.max(0, Math.min(100, value));
  await invoke('set_monitor_brightness', { id, value: brightness});
}

const debouncedSetBrightness = debounce(setMonitorBrightness, 500);

function MonitorLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center">
      <MonitorIcon className="text-[20px] mr-[6px]" />
      <span className="text-[16px]">{label}</span>
    </div>
  );
}

function BrightnessPanel() {
  const { t } = useTranslation();
  const [monitors, setMonitors] = useState<Monitor[]>([]);

  useEffect(() => {
    const runEffect = async () => {
      const list = await getMonitorList();
      setMonitors(list)
    }

    runEffect()
  }, [])

  function setBrightness(id: string, value: number) {
    const newMonitors = monitors.map(m => {
      if (m.id === id) {
        return {
          ...m,
          current: Math.max(0, Math.min(100, value)),
        }
      }

      return m;
    });
    setMonitors(newMonitors);
    debouncedSetBrightness(id, value);
  }

  return (
    <Card title={t("brightness.panel_title")}>
        {monitors.map(monitor => (
            <div key={monitor.id}>
              <Field label={(<MonitorLabel label={monitor.name} />)}>
              <div className="flex items-center">
                <Slider
                  size="lg"
                  step={1}
                  maxValue={monitor.max}
                  minValue={monitor.min}
                  aria-label="monitor brightness"
                  value={monitor.current}
                  onChange={v => setBrightness(monitor.id, v as number)}
                  className="max-w-[260px] min-w-[160px]"
                />
                <span className="inline-block ml-[12px] text-[18px] font-medium select-none">
                  {monitor.current}
                </span>
              </div>
            </Field>
            </div>
        ))}
    </Card>
  );
}

export default BrightnessPanel;
