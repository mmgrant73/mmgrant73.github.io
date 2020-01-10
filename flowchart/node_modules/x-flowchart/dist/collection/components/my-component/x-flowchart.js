/**
 This is a custom tree like flowchart web component (block element).  It only has one attribute that aLinkcolor
 user needs to set (tree).  The tree attribute is an array that represent the nodes on the tree. For example,
 tree = ['parent', ['child1',['grandchild1'], 'child2', 'child3', ['grandchild2', 'grandchild3', ['greatgrandchild1', 'greatgrandchild2', 'greatgrandchild3'], 'grandchild4']]]
*/
import { h } from "@stencil/core";
export class MyComponent {
    constructor() {
        /**
        * The tree array for the flowchart
        * ["root name", [child name,[greatchild name], child name]]
        *                                   |root name|
        *           |child name|            |child name|                |child name|
        *                                 |greatchild name|
        */
        this.treeArray = [];
    }
    getHTML(treeStr, lastPart, testArray) {
        var fLen = testArray.length;
        treeStr += "<ul>";
        for (var i = 0; i < fLen; i++) {
            if (typeof (testArray[i]) == "string") {
                if (i != 0) {
                    treeStr += "</li>";
                }
                treeStr += "<li><a href='#'>" + testArray[i] + "</a>";
            }
            else {
                treeStr = this.getHTML(treeStr, lastPart, testArray[i]);
            }
        }
        treeStr += "</li>";
        treeStr += "</ul>";
        return treeStr;
    }
    makeTree() {
        let treeStr = "";
        let lastPart = [];
        let testArray = JSON.parse(this.tree);
        treeStr = this.getHTML(treeStr, lastPart, testArray);
        return treeStr;
    }
    render() {
        return (h("div", { class: "tree", innerHTML: this.makeTree() }));
    }
    static get is() { return "x-flowchart"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["x-flowchart.css"]
    }; }
    static get styleUrls() { return {
        "$": ["x-flowchart.css"]
    }; }
    static get properties() { return {
        "treeArray": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<string>",
                "resolved": "string[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The tree array for the flowchart\n[\"root name\", [child name,[greatchild name], child name]]\n                                   |root name|\n           |child name|            |child name|                |child name|\n                                 |greatchild name|"
            },
            "defaultValue": "[]"
        },
        "tree": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "tree",
            "reflect": false
        }
    }; }
}
