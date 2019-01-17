import LoginStore from "./LoginStore";
import TimelineStore from "./newfeed/timeline/TimelineStore";
import SlidingMenuStore from "./SlidingMenuStore";
import EmojiController from "./EmojiController";

export default {
  loginStore: new LoginStore(),
  timelineStore: new TimelineStore(),
  slidingmenuStore: new SlidingMenuStore(),
  EmojiController: new EmojiController()
};
