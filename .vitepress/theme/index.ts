import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import RulesTable from "./components/RulesTable.vue";
import RuleHeader from "./components/RuleHeader.vue";
import RuleReferences from "./components/RuleReferences.vue";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/jetbrains-mono";
import "./styles.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("RulesTable", RulesTable);
    app.component("RuleHeader", RuleHeader);
    app.component("RuleReferences", RuleReferences);
  },
} satisfies Theme;
