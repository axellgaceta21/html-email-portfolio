const journeySection = document.querySelector('.journeys-section');

if (journeySection) {
  const tabs = [...journeySection.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

  function activateTab(index, moveFocus = false) {
    tabs.forEach((tab, position) => {
      const active = position === index;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[position].hidden = !active;
    });

    if (moveFocus) tabs[index].focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(index));
    tab.addEventListener('keydown', (event) => {
      let nextIndex;

      switch (event.key) {
        case 'ArrowRight': nextIndex = (index + 1) % tabs.length; break;
        case 'ArrowLeft': nextIndex = (index - 1 + tabs.length) % tabs.length; break;
        case 'Home': nextIndex = 0; break;
        case 'End': nextIndex = tabs.length - 1; break;
        default: return;
      }

      event.preventDefault();
      activateTab(nextIndex, true);
    });
  });

  activateTab(0);
}
