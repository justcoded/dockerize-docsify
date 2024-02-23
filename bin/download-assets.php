#!/usr/bin/env php
<?php

$assetsDir = __DIR__ . '/../html/assets';
$json = file_get_contents(__DIR__ . '/assets.json');
$assets = json_decode($json, true);

$sources = $assets['assets'];
echo "\nFound " . count($sources) . " docsify assets to download.";
echo "\nFound " . count($assets['prism']['supports']) . " prism.js language packs to download.";

foreach ($assets['prism']['supports'] as $name) {
    $sources[] = [
        'asset' => str_replace('*', $name, $assets['prism']['asset']),
        'source' => str_replace('*', $name, $assets['prism']['source']),
    ];
}

echo "\n\nDownloading...\n";

foreach ($sources as $source) {
    if (! $script = file_get_contents($source['source'])) {
        echo "    FAILED to download {$source['asset']}\n";
        continue;
    }

    $status = file_put_contents("{$assetsDir}/{$source['asset']}", $script)
        ? 'saved'
        : 'FAILED to save';
    echo "    {$status} {$source['asset']}\n";
}

echo "Done.\n";
exit(0);
