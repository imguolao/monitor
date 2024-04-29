import { useTranslation } from 'react-i18next';
import { Slider } from "@nextui-org/react";
import Card from "@/components/card/Card";

function BrightnessPanel() {
  const { t } = useTranslation();
  return (
    <Card title={t("brightness.panel_title")}>
      <Slider   
        size="lg"
        step={0.01} 
        maxValue={1} 
        minValue={0} 
        aria-label="Dell Monitor"
        defaultValue={0.6}
        className="max-w-md" 
      />
    </Card>
  );
}

export default BrightnessPanel;
