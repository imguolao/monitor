import { type PropsWithChildren } from "react";

function Card(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="
        box-border p-[20px] rounded-[8px]
        bg-background dark:bg-default-50
        border border-solid border-default-200
        dark:border-none
      ">
      <h2 className="text-[20px] mb-[12px] select-none">{props.title}</h2>
      <section>
        {props?.children}
      </section>
    </div>
  );
}

export default Card;