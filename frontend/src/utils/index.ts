export const isDark = () => {
  const { className } = document.querySelector("div[data-is-root-theme]")!;
  return className.includes("dark");
};
