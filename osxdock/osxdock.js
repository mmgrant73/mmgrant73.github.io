/**
Description:
OSX Dock - is a docking bar like the one on the OS operation system that can be used on a website.  It is easy to 
use and set up.

Usage:
<osx-dock>
    <item href="www.facebook.com" src="facebook.png">Facebook</item>
    <item href="www.google.com" src="google.png">Google</item>
    <item href="www.github.com" src="github.png">Github</item>
</osx-dock>
There are three attributes that you need to set:
1. href - is the hyperlink that will become active when a user click on the icon in the dock bar
2. src - is the image that will be used in the dock bar
3. innerText - the innerText between the item tag will be display when the mouse is hovered over the icon
*/

const template = document.createElement('template');
template.innerHTML = `
    <style>
        /* ---------- General Settings -------------- */
        ul,
        ol,
        dl {
            font-size: 1em;
            line-height: 1.6;
            margin-bottom: 1.25em;
            list-style-position: outside;
            font-family: inherit
        }
        ul,
        ol {
            margin-left: 0
        }
        ul.no-bullet,
        ol.no-bullet {
            margin-left: 0
        }
        ul li ul,
        ul li ol {
            margin-left: 1.25em;
            margin-bottom: 0;
            font-size: 1em
        }
        ul.square li ul,
        ul.circle li ul,
        ul.disc li ul {
            list-style: inherit
        }
        ul.square {
            list-style-type: square
        }
        ul.circle {
            list-style-type: circle
        }
        ul.disc {
            list-style-type: disc
        } 
        ul.no-bullet {
            list-style: none
        }
        ol li ul,
        ol li ol {
            margin-left: 1.25em;
            margin-bottom: 0
        }

        /* Dock styles */
        div.cap { 
            display: block; height: 100px; width: 40px; background: url('./osxdock/dock-background-left.png') bottom left no-repeat; 
        }
        div.cap.left { 
            position: absolute; bottom: 0px; left: 0px; 
        }
        div.cap.right { 
            background-position: right bottom; position: absolute; top: 0px; right: 0px; 
        }
        ul.osx-dock { 
            display: inline-block; height: 130px; padding: 0 40px 0 0; background: url('./osxdock/dock-background-left.png') no-repeat right bottom; overflow: hidden; margin: 0 0 0 40px; 
        }
        ul.osx-dock li { 
            display: block; position: relative; float: left; width: 50px; height: 50px; margin: 60px 0 4px 0; -webkit-transition: 0.15s linear; -webkit-transition-property: -webkit-transform margin; text-align: center; 
        }
        ul.osx-dock li a { 
            display: block; height: 50px; padding: 0 1px; -webkit-transition: 0.15s linear; -webkit-transition-property: -webkit-transform margin; margin: 0;
            -webkit-box-reflect: below 2px
            -webkit-gradient(linear, left top, left bottom, from(transparent),
            color-stop(0.45, transparent), to(rgba(255, 255, 255, 0.25)));
        }
        ul.osx-dock li a img { 
            width: 48px; 
        }
        ul.osx-dock li:hover { 
            margin-left: 9px; margin-right: 9px;
            z-index: 200;
        }
        ul.osx-dock li:hover a { 
            -webkit-transform-origin: center bottom;
            -webkit-transform: scale(1.5);
        }
        ul.osx-dock li.nearby { 
            margin-left: 6px; margin-right: 6px;
            z-index: 100;
        }
        ul.osx-dock li.nearby a { 
            -webkit-transform-origin: center bottom;
            -webkit-transform: scale(1.25);
        }

        ul.osx-dock li span { 
            background: rgba(0,0,0,0.75); position: absolute; bottom: 80px; margin: 0 auto; display: none; width: auto; font-size: 11px; font-weight: bold; padding: 3px 6px; -webkit-border-radius: 6px; color: #fff; 
        }
        ul.osx-dock li:hover span { 
            display: block; 
        }
        div#dockContainer { 
            position: fixed; bottom: 12px; height: 120px; padding: 50px 0 0; text-align: center; -webkit-border-radius: 6px; -moz-border-radius: 6px; width: 100%; line-height: 1; z-index: 100; 
        }
        div#dockWrapper { 
            width: auto; display: inline-block; position: relative; border-bottom: solid 2px rgba(255,255,255,.35); line-height: 0; 
        }
        #dockContainer, #dockContainer * {
            -webkit-box-sizing: content-box;
            -moz-box-sizing: content-box;
            box-sizing: content-box 
        }
    </style>

    <div id="dockContainer">
        <div id="dockWrapper">
            <div class="cap left"></div>
            <ul class="osx-dock">
                <!---- Have to use javascript to create the code below ----->
               
                <!---------------------------------------------------------->
            </ul>
        </div>
    </div>
`;

class OsxDock extends HTMLElement {
  /** Standard template for expanding an HTML element*/
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._dockcontainer = this._shadowRoot.querySelector('#dockContainer');
    this._dockwrapper = this._shadowRoot.querySelector('#dockWrapper');
    this._cap = this._shadowRoot.querySelector('.cap');
    this._osxdock = this._shadowRoot.querySelector('.osx-dock');
    this.items = this.getElementsByTagName('item')
  }
  
  connectedCallback() {
    /** called when first connect to page.  Set innerHTML*/ 
    var len = this.items.length;
    var html = '';
    for(var x = 0; x < len; x++){
        var txt = this.items[x].innerText;
        if(this.items[x].attributes[0].name == 'href'){
            var href = this.items[x].attributes[0].value;
            var src = this.items[x].attributes[1].value;
        }
        else{
            var src = this.items[x].attributes[0].value;
            var href = this.items[x].attributes[1].value;
        }
        html += "<li>";
        html += "<span>" + txt + "</span>";
        html += "<a href='" + href + "' title='" + txt + "'><img alt='pic' src='" + src + "'></a>";
        html += "</li>";
    }
    this._osxdock.innerHTML = html;
  }
  
  disconnectedCallback() {
    /** called when closed*/
  }

}

window.customElements.define('osx-dock', OsxDock);
