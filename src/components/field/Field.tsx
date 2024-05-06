import { type PropsWithChildren, type ComponentProps, type ReactNode } from "react";

function Field(props: PropsWithChildren<{ label: string | ReactNode }> & ComponentProps<"div">) {
  const { label, children, ...rest } = props ?? {};
  return (
    <div {...rest}>
      <div className="pb-[4px] select-none">
        {label}
      </div>
      {children}
    </div>
  );
}

export default Field;
