import LoginStore from "./LoginStore";
import OrientationListener from "./OrientationListener";

const loginStore = new LoginStore();
const orientationListener = new OrientationListener();

export default {
  loginStore: loginStore,
  orientationListener: orientationListener
};
