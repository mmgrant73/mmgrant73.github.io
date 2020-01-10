/**
 This is a custom tree like flowchart web component (block element).  It only has one attribute that aLinkcolor
 user needs to set (tree).  The tree attribute is an array that represent the nodes on the tree. For example,
 tree = ['parent', ['child1',['grandchild1'], 'child2', 'child3', ['grandchild2', 'grandchild3', ['greatgrandchild1', 'greatgrandchild2', 'greatgrandchild3'], 'grandchild4']]]
*/
export declare class MyComponent {
    /**
    * The tree array for the flowchart
    * ["root name", [child name,[greatchild name], child name]]
    *                                   |root name|
    *           |child name|            |child name|                |child name|
    *                                 |greatchild name|
    */
    treeArray: Array<string>;
    tree: string;
    private getHTML;
    private makeTree;
    render(): any;
}
