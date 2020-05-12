const xd = require("scenegraph");
const fs = require("uxp").storage.localFileSystem;

const $ = require("./utils");
const NodeUtils = require("./nodeutils");
const PropType = require("./proptype");
const { Pubspec } = require('./pubspec');
const { Log } = require('./log');
const { projectAlert, prompt } = require("../ui/alert");

class Project {
	constructor() {
		this.root = new _Folder(null, PropType.EXPORT_PATH, null);
		this.code = new _Folder(this.root, PropType.CODE_PATH, DefaultPath.CODE);
		this.images = new _Folder(this.root, PropType.IMAGE_PATH, DefaultPath.IMAGE);
		this.imagesX2 = new _Folder(this.images, null, DefaultPath.IMAGE_X2);
		this.imagesX3 = new _Folder(this.images, null, DefaultPath.IMAGE_X3);
	}

	async checkRoot(alert = true) {
		if (this.hasRoot) { return true; }
		if (alert && !(await projectAlert(this))) { return false; }
		return (await this.promptForRoot());
	}

	async validate(ctx) {
		// check for pubspec.yaml
		let str = await this.root.readFile("pubspec.yaml");
		if (!str) { ctx.log.warn(Project.PUBSPEC_WARNING, null); return false; }
		let pubspec = new Pubspec(str);
		pubspec.checkFonts(ctx.fonts, ctx.log);
		// The XD package links to any other dependencies.
		pubspec.checkDependencies([Project.XD_PACKAGE], ctx.log);
		// Flutter asset directories always end in `/`:
		pubspec.checkAssets([this.images.path + '/'], ctx.log);
		return true;
	}

	async promptForRoot() {
		let f = await fs.getFolder();
		if (!f) { return false; }
		if (!(await this._verifyRoot(f))) { return false; }
		this.root._f = f;
		this.root._path = f.nativePath;
		NodeUtils.setProp(xd.root, this.root._prop, this.root._path);
		return true;
	}

	get hasRoot() {
		return !!this.root._f;
	}

	async _verifyRoot(f) {
		// we can't run this through _Folder, because we're verifying before we assign it to the folder.
		// this doesn't check images or fonts, since they may not have been set up yet.
		let file;
		try { file = await f.getEntry('pubspec.yaml'); } catch (e) {}
		if (!file) { return prompt(Project.PUBSPEC_WARNING); }
		let log = new Log(), str = await file.read();
		if (!str) { log.warn("Unable to read pubspec.yaml.", null); }
		else { new Pubspec(str).checkDependencies([Project.XD_PACKAGE], log); }
		let results = log.getResults();
		str = results.errors.concat(results.warnings).reduce((s,o) => `${s}<div>  • ${o}</div>`, '');
		return !str || prompt(`Warnings were generated while validating your Flutter project.${str}`);
	}
}

class _Folder {
	constructor(parent, prop, defaultPath) {
		this._parent = parent;
		this._prop = prop;
		this._defaultPath = defaultPath;
		this._path = null;
		this._f = null; // UXP filesystem reference
	}

	async getFile(name, ctx, create=true) {
		let file = null, f = await this._getF(ctx);
		if (!f) { return null; }
		name = $.cleanFileName(name);
		if (create) {
			try { file = f.createFile(name, { overwrite: true }); }
			catch (e) { ctx.log.error(`Unable to create file ('${this._getFullPath()}${name}'): ${e}`, null); }
		} else {
			try { file = await f.getEntry(name); }
			catch (e) {}
			if (!file.isFile) { file = null; }
		}
		return file;
	}

	async writeFile(name, content, ctx) {
		let file = await this.getFile(name, ctx);
		if (!file) { return false; }
		try { file.write(content); } catch (e) { return false; }
		return true;
	}

	async readFile(name, ctx) {
		let file = await this.getFile(name, ctx, false);
		if (!file) { return null; }
		return await file.read();
	}

	get path() {
		return this._getRelPath();
	}

	async _getF(ctx) {
		if (!this._parent) { return this._f; } // root

		let fullPath = this._getFullPath();
		if (this._f && fullPath === this._path) { return this._f; } // cached reference

		let parentF = await this._parent._getF(ctx);
		this._f = await this._getNestedF(parentF, this._getRelPath().split('/'), ctx);
		return this._f;
	}

	async _getNestedF(parentF, names, ctx) {
		if (!parentF) { return null; }
		let f, err, name = names.shift().substr(0, 160);
		// check if it already exists:
		try { f = await parentF.getEntry(name); } catch (e) { }
		if (!f) {
			// create it:
			try { f = await parentF.createFolder(name); }
			catch (e) { err = e; }
		} else if (!f.isFolder) {
			err = 'A file with that name already exists.'; // tested.
			f = null;
		}
		if (err) { ctx.log.error(`Unable to create folder ('${this._getFullPath()}'): ${err}`, null); }
		return names.length && f ? this._getNestedF(f, names) : f;
	}

	_hasRootPath() {
		if (!this._parent) { return !!this._f; }
		return this._parent._hasRootPath();
	}

	_getFullPath() {
		if (!this._parent) { return this._f && this._f.nativePath; } // root
		return this._parent._getFullPath() + this._getRelPath() + '/';
	}

	_getRelPath() {
		let path = (this._prop && NodeUtils.getProp(xd.root, this._prop)) || this._defaultPath;
		return $.cleanPath(path);
	}
}

Project.PUBSPEC_WARNING = 'A "pubspec.yaml" file was not found in the specified Flutter project folder.';
Project.XD_PACKAGE = 'adobe_xd'; // TODO: GS: update package name when ready.

let DefaultPath = Object.freeze({
	ROOT: "Select a project path.", // only used for placeholder UI
	CODE: "lib",
	IMAGE: "assets/images",
	IMAGE_X2: "2.0x",
	IMAGE_X3: "3.0x",
});

let project = new Project();

module.exports = {
	DefaultPath,
	project,
};