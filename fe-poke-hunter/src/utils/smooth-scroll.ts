export const smoothScrollTo = (id: string, focusElementId?: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      window.location.hash = id;
      if (focusElementId) {
        const focusElement = document.getElementById(focusElementId);
        focusElement?.focus();
      }
    }, 100);
  }
};
