window.$docsify = {
  basePath: '/docs/', // real path to docs folder
  alias: {
    // prevent nesting sidebars
    '/.*/_sidebar.md': '/_sidebar.md', // See #301
  },

  // auto scroll to top after nav change
  auto2top: true,

  loadSidebar: true,
  subMaxLevel: 2, // auto sidebar for headers inside current file

  loadNavbar: true,

  search: 'auto',
};
