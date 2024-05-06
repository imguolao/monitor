import { type PropsWithChildren } from "react";

function Card(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="
      box-border dark:border-default-200 border-default-200
    ">
      <h2 className="text-[20px] mb-[12px] select-none">{props.title}</h2>
      <section>
        {props?.children}
      </section>
    </div>
  );
}

export default Card;