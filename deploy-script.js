// move build files to their destination

let doCompress = false;
try {
    const config = JSON.parse(process.env.npm_config_argv);
    doCompress = config.original.includes("--compress");
} catch (e) {}

const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;
const archiver = require("archiver");
const ncp = require("ncp").ncp;

const copy = promisify(ncp);

const libDir = "./src/lib/";
const buildDir = "./build/";
const pluginName = "flutter-plugin";

let pluginDir = process.env.LOCALAPPDATA;
switch (process.platform) {
    case "linux":
        pluginDir = path.resolve(process.env.APPDATA.replace(/\\/g, "/").replace("C:", "/mnt/c"), "../Local");
        // falling through since linux is just running on the windows drive
    case "win32":
        pluginDir += "/Packages/Adobe.CC.XD_adky2gkssdxte/LocalState/develop/";
        break;
    case "darwin": // mac
        pluginDir = `${process.env.HOME}/Library/Application Support/Adobe/Adobe XD/develop/`;
        break;
    default:
        console.error(`\nOS '${process.platform}' not supported.\n`);
        process.exit(1);
}
pluginDir += pluginName + "/";

(async () => {
    await copy("./manifest.json", buildDir + "manifest.json");
    await copy("./debug.json", buildDir + "debug.json");
    await copy(libDir, buildDir + "lib/");
    try { await copy(buildDir, pluginDir); }
    catch (e) {
        console.error("\nCopy to plugin directory failed.\nIf you have XD installed, please report this issue.\n");
        process.exit(1);
    }
    // generate zip
    if (doCompress) {
        const output = fs.createWriteStream(__dirname + "/build.zip");
        const archive = archiver("zip");
        output.on("close", () => console.log(`Zip: ${archive.pointer()} total bytes`));
        // pipe archive data to the file
        archive.pipe(output);
        archive.directory(buildDir, pluginName);
        archive.finalize();
    }
})();



