(function () {
    const httpsRegex = /^https?:\/\//;
    // line start or not ! (to skip images), then link text [...], then internal link destination ([a-z]...)
    const markdownLinkRegex = /(^|[^!])\[.*?\](\([a-zA-Z]+.*?\))/g;
    const folderNameRegex = /(.+)\//;

    const folderRelatedLinks = function (hook, vm) {
        hook.beforeEach(function (markdown) {
            // skip if it root
            if (vm.route.path === '/') {
                return markdown;
            }

            const folder = vm.route.file.match(folderNameRegex)[1];
            const matches = markdown.matchAll(markdownLinkRegex);
            let newMarkdown = markdown;
          console.log([folder, matches]);

            for (const [match, firstSymbol, urlInBrackets] of matches) {
              console.log([match, firstSymbol, urlInBrackets])
                const url = urlInBrackets.slice(1, -1);

                if (firstSymbol === '!' || httpsRegex.test(url)) {
                    continue;
                }

                const replaced = match.replace(urlInBrackets, `(${folder}/${url})`);
                newMarkdown = newMarkdown.replace(match, replaced);
            }

            return newMarkdown;
        });
    };

    // Add plugin to docsify's plugin array
    $docsify = $docsify || {};
    $docsify.plugins = [].concat(folderRelatedLinks, $docsify.plugins || []);
})();
