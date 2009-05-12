function ContentPanel(project, rootNode) {
	this.project = project;
	this.rootNode = rootNode;
}

/**
 * @Override vle.ContentPanel.prototype.render()
 */
ContentPanel.prototype.render = function(nodeId) {
	var node = vle.getNodeById(nodeId);
	//alert("contentpanel.js. Node:" + node + ", id:" + node.id);
	if (node == null) {
		alert('ContentPanel.js. node with nodeId: ' + nodeId + 'does not exist');
	}
	//node.render(this);  this should be used in the future.
	node.render();
}

/**
 * Highlights the element with the specified identifier within the contentpanel
 */
ContentPanel.prototype.highlightElement = function(elementIdentifier, highlightColor) {
	//alert('contentpanel.highlightelement' + elementIdentifier + "," + highlightColor);
	//alert(top.ifrm);
	//alert(top.ifrm);
	//alert(top.ifrm.outsideurliframe);
	//alert(top.ifrm.outsideurliframe.document);
	//window.frames["ifrm"].highlight(elementIdentifier, highlightColor);
	if(elementIdentifier != null) {
		var elementToHighlight = window.frames["ifrm"].document.getElementById(elementIdentifier);
		if (elementToHighlight) {
			elementToHighlight.style.outline = highlightColor;
		}
	}
}