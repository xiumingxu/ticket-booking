import dayjs from "dayjs";
export function format(d) {
  const date = dayjs(d);
  return date.format("MM-DD") + " " + date.locale("zh-cn").format("ddd");
}
