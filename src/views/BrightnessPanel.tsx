import { useTranslation } from 'react-i18next';
import { Slider } from "@nextui-org/react";
import Card from "@/components/card/Card";
import Field from "@/components/field/Field";
import MonitorIcon from "@/components/icon/Monitor";
import { useState } from "react";

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
  // mock value
  const [value, setValue] = useState<number | number[]>(50);
  return (
    <Card title={t("brightness.panel_title")}>
      <Field label={(<MonitorLabel label="Dell U2417H" />)}>
        <div className="flex items-center">
          <Slider   
            size="lg"
            step={1}
            maxValue={100}
            minValue={0}
            aria-label="monitor brightness"
            value={value}
            onChange={setValue}
            className="max-w-[260px] min-w-[160px]"
          />
          <span className="inline-block ml-[12px] text-[18px] font-medium select-none">{value}</span>
        </div>
      </Field>
    </Card>
  );
}

export default BrightnessPanel;
