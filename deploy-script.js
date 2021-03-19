let isProduction = false;
try {
    const config = JSON.parse(process.env.npm_config_argv);
    isProduction = config.original.includes("--production");
} catch (e) {}

const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;
const archiver = require("archiver");
const ncp = require("ncp").ncp;

const copy = promisify(ncp);
const read = promisify(fs.readFile);

const libDir = "./src/lib/";
const buildDir = "./build/";
const pluginName = "flutter-plugin";

(async () => {
	// TODO: clear the buildDir for production builds
    await copy("./manifest.json", buildDir + "manifest.json");
    await copy("./debug.json", buildDir + "debug.json");
    await copy(libDir, buildDir + "lib/");
    // generate zip
    if (isProduction) {
		// read version from manifest.json:
		let v = "X_X_X";
		try {
			let data = JSON.parse(await read("./manifest.json"));
			v = data.version.replace(/\./g, "_");
		} catch (e) {}

        const output = fs.createWriteStream(__dirname + "/XDtoFlutter_v" + v + ".xdx");
        const archive = archiver("zip");
        output.on("close", () => console.log(`Zip: ${archive.pointer()} total bytes`));
        // pipe archive data to the file
        archive.pipe(output);
        archive.directory(buildDir, pluginName);
        archive.finalize();
    }
})();



