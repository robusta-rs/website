import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/jetbrains-mono";
import "./styles.css";

export default {
  extends: DefaultTheme,
} satisfies Theme;
