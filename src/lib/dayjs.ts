import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/ko";

export function dayjsInitialization() {
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  dayjs.locale("ko");
}
