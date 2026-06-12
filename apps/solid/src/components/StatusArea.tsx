import classes from "@app/styles/StatusArea.module.css";

type Props = {
  text: string;
  state?: "positive" | "negative";
};

export const StatusArea = (props: Props) => (
  <div class={classes.statusArea}>
    <div class={classes.status} data-state={props.state} /> {props.text}
  </div>
);
