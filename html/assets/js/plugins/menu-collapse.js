(function () {
  const menuCollapse = function (hook, vm) {
    // Hook to execute after the page is fully loaded https://github.com/docsifyjs/docsify/blob/develop/docs/write-a-plugin.md
    hook.doneEach(() => {
      const parentItems = document.querySelectorAll('.sidebar-nav > ul > li');

      parentItems.forEach(item => {
        /**
         * Skip items that already have link or not rendered
         * Check on empty string required because an original docsify menu does not provide hooks after load
         */
        if (item.firstChild.nodeType !== Node.TEXT_NODE || item.firstChild.textContent.trim() === "") return;

        // Check if the parent item has a sublist
        const sublist = item.querySelector('ul');

        if (sublist) {
          // Check if any nested items in the sublist have the 'active' class
          const nestedItems = sublist.querySelectorAll('li');
          const hasActiveItems = Array.from(nestedItems).some(nestedItem => nestedItem.classList.contains('active'));

          /**
           * Add the 'collapse' class to items without active nested items, otherwise add 'active'
           * That is need to highlight menu item on a page load when subitem is active
           */
          if (!hasActiveItems) {
            item.classList.add('collapse');
          } else {
            item.classList.add('active');
            item.classList.remove('collapse');
          }

          // Add class to sublist
          sublist.classList.add('app-sub-sidebar');

          // Wrap text item in a link to follow default menu behavior and classes
          const textNode = item.firstChild;
          const link = document.createElement('a');
          link.href = '#/';
          link.textContent = textNode.textContent;
          textNode.parentNode.replaceChild(link, textNode);

          // Add click event listener to link to prevent default behavior
          link.addEventListener('click', (e) => {
            e.preventDefault();
            // Close all other collapsed items when a link is clicked
            parentItems.forEach(otherItem => {
              if (otherItem !== item) {
                otherItem.classList.remove('collapse');
              }
            });
          });
        }
      });
    });
  };

  // Add the plugin to the Docsify plugin array
  $docsify = $docsify || {};
  $docsify.plugins = [].concat(menuCollapse, $docsify.plugins || []);
})();
