(function () {
  const menuCollapse = function (hook, vm) {
    // Hook to execute after the page is fully loaded https://github.com/docsifyjs/docsify/blob/develop/docs/write-a-plugin.md
    hook.doneEach(() => {
      // Select all parent items
      const parentItems = document.querySelectorAll('.sidebar-nav > ul > li');

      parentItems.forEach(item => {
        /**
         * Skip items that already have link or not rendered
         * Check on empty string required because an original docsify menu does not provide hooks after load
         */
        const textNode = item.firstChild;
        if (textNode.nodeType !== Node.TEXT_NODE || textNode.textContent.trim() === "") return;

        // Create link for text item
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = textNode.textContent;
        textNode.parentNode.replaceChild(link, textNode);

        // Check if the parent item has a sublist
        const sublist = item.querySelector('ul');
        if (!sublist) return;

        // Check if any nested items in the sublist have the 'active' class
        const hasActiveItems = sublist.querySelector('.active');

        /**
         * Set data-submenu-state attribute to items without active nested items, otherwise set it to 'active'
         * That is need to highlight menu item on a page load when subitem is active
         */
        if (hasActiveItems) {
          item.setAttribute('data-submenu-state', 'opened');
        } else {
          item.setAttribute('data-submenu-state', 'collapsed');
        }

        // Add click event listener to link to toggle submenu state
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const submenuState = item.getAttribute('data-submenu-state');
          item.setAttribute('data-submenu-state', submenuState === 'collapsed' ? 'opened' : 'collapsed');
        });
      });
    });
  };

  // Add the plugin to the Docsify plugin array
  $docsify = $docsify || {};
  $docsify.plugins = [$docsify.plugins || [], menuCollapse];
})();
