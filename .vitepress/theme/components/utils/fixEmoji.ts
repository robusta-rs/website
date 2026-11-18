const fixEmoji = (fix: string) => {
  switch (fix) {
    case "fixable_fix":
    case "conditional_fix":
      return "🛠️";
    case "fixable_unsafe_fix":
    case "conditional_unsafe_fix":
      return "⚠️ 🛠️";
    case "fixable_safe_fix_or_unsafe_fix":
    case "conditional_safe_fix_or_unsafe_fix":
      return "🛠️ ⚠️ 🛠️";
    case "none":
    default:
      return "";
  }
};

export default fixEmoji;
