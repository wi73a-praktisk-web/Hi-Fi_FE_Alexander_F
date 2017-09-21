const browserSync = require('browser-sync').create();
browserSync.watch("./puclic/**/*").on("change", browserSync.reload);
browserSync.init({
    "server": "./public/assets"
});