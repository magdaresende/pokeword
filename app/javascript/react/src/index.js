import { define } from "remount";
import Word from "./components/Word";

define({
  "word-component": { component: Word, attributes: ["pokename", "poketype"] },
});
