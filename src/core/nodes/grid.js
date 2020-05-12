const serialize = require("../serialize");

class Grid {
	constructor(xdNode) {
		this.xdNode = xdNode;
		this.children = [];
		this.diff = null;
		this.childParameters = {};
	}

	toString(serializer, ctx) {

		let width = this.xdNode.width;
		let height = this.xdNode.height;
		let xSpacing = this.xdNode.paddingX;
		let ySpacing = this.xdNode.paddingY;
		let aspectRatio = this.xdNode.cellSize.width / this.xdNode.cellSize.height;
		let columnCount = this.xdNode.numColumns;
		let rowCount = this.xdNode.numRows;
		let gridWidth = this.xdNode.cellSize.width * columnCount + xSpacing * (columnCount - 1);
		let gridHeight = this.xdNode.cellSize.height * rowCount + ySpacing * (rowCount - 1);
		let child = serialize.getTransformedNodeString(this.children[0], serializer, ctx);
		let childrenData = [];
		let grabChildrenData = (node, data) => {
			if (node.parameters) {
				let childParams = Object.values(this.childParameters);
				let params = Object.values(node.parameters);
				// Find matching params
				for (let paramRef of params) {
					for (let childParamRef of childParams) {
						if (paramRef.name === childParamRef.name) {
							data[paramRef.name] = paramRef;
							break;
						}
					}
				}
			}
			if (node.children) {
				for (let child of node.children) {
					grabChildrenData(child, data);
				}
			}
		};
		for (let i = 0; i < this.children.length; ++i) {
			let data = {};
			grabChildrenData(this.children[i], data);
			childrenData.push(data);
		}
		let childData = ``;
		for (let i = 0; i < this.children.length; ++i) {
			childData += `{ `;
			for (let [k, v] of Object.entries(childrenData[i])) {
				childData += `'${k}': ${serializer.serializeParameterValue(v.parameter.owner.xdNode, v.parameter.value, ctx)}, `;
			}
			childData += `}, `;
		}
		let parameterLocals = ``;
		for (let paramRef of Object.values(this.childParameters)) {
			let name = paramRef.name;
			parameterLocals += `final ${name} = map['${name}'];`;
		}
		let str = `SpecificRectClip(rect: Rect.fromLTWH(0, 0, ${width}, ${height}), child: UnconstrainedBox(alignment: Alignment.topLeft, child: Container(width: ${gridWidth}, height: ${gridHeight}, child: GridView.count(primary: false, padding: EdgeInsets.all(0), mainAxisSpacing: ${ySpacing}, crossAxisSpacing: ${xSpacing}, crossAxisCount: ${columnCount}, childAspectRatio: ${aspectRatio}, children: [${childData}].map((map) { ${parameterLocals} return ${child}; }).toList(),),),),)`;
		return str;
	}
}
exports.Grid = Grid;
