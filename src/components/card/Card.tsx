import { type PropsWithChildren } from "react";

function Card(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="
      box-border rounded-[8px] p-[20px]
      dark:bg-default-200 bg-background
      border border-solid dark:border-default-100 border-default-200
    ">
      <h2 className="text-[24px] mb-[12px]">{props.title}</h2>
      <section>
        {props?.children}
      </section>
    </div>
  );
}

export default Card;