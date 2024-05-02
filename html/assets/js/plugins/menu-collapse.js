(function () {
  const menuCollapse = function (hook, vm) {

    hook.doneEach(() => {

      const parentItems = document.querySelectorAll('.sidebar-nav > ul > li');

      parentItems.forEach(item => {
        const sublist = item.querySelector('ul');

        if (sublist) {
          const nestedItems = sublist.querySelectorAll('li');
          const hasActiveItems = Array.from(nestedItems).some(nestedItem => nestedItem.classList.contains('active'));

          if (item.firstChild.nodeType !== Node.TEXT_NODE || item.firstChild.textContent.trim() === "") {
            return
          }

          if (!hasActiveItems) {
            item.classList.add('collapse');
          } else {
            item.classList.add('active');
            item.classList.remove('collapse');
          }

          sublist.classList.add('app-sub-sidebar');

          const textNode = item.firstChild;
          const link = document.createElement('a');
          link.href = '#/';
          link.textContent = textNode.textContent;
          textNode.parentNode.replaceChild(link, textNode);


          link.addEventListener('click', (e) => {
            e.preventDefault();
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

  // Add plugin to docsify's plugin array
  $docsify = $docsify || {};
  $docsify.plugins = [].concat(menuCollapse, $docsify.plugins || []);
})();
