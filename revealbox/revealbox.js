/**
Description:
Reveal box is a custom web component.  It hides contents of a box with another box.  When a user
hovers over the box the top box will move out of the way so that the user can see the hidden box contents.
The top box will move out of the way by the effects you assign to it.  Currently there are 9 effects and 
more will be added later.

Usage:
<reveal-box width="100px" height="50px" effect="flip-hort" style="background-color: Beige; border: 3px solid black;">
    <div slot="cover">
        <p>Cover Box</p>
    </div>
    <div slot="reveal">
        <p>Reveal</p>
    </div>
</reveal-box>
There are four attributes that you need to set:
1. width - the width of the reveal box
2. height - the height of the reveal box
3. effect - the type of effect the box will have when a user hovers over it
4. style - this allows you to style the look of the outer reveal box

There are two div elements that you need to include:
1. div with the slot = "cover" will hold the html code for the cover box
2. div with the slot = "reveal" will hold the html code for the reveal box

Note: a user can style these two div anyway you want but the width and height will be 
determine by the attribute set in the reveal-box tag

Effects: There are currently nine effects that can be used by this custom element
when you hover over the reveal-box
1. flip-hort: will rotate the top box along the horizontal axis (180 degrees)
2. flip-vert: will rotate the top box along the vertical axis (180 degrees)
3. slide-left: will slide the top box to the left
4. slide-right: will slide the top box to the right
5. rotate: will rotate the top box by 180 degrees
6. sweep-hort: will sweep the top box along the horizontal axis
7. sweep-vert: will sweep the top box along the vertical axis
8. shrink: will shrink the top box until it is gone
9. fade:  Will fade out the top box
*/

const template = document.createElement('template');
template.innerHTML = `
    <style>
        
        /* ---------- General Settings -------------- */
        div {
            --x-height: 50px;
            --x-width: 100px;
            --x-border: 4px;
            --x-abswidth: -100px;
            --x-abswidth1: -100px;
            --x-abswidth2: -100px;
            --x-abswidth3: -100px;
            --x-absheight: -50px;
            --x-absheight1: -50px;
            --x-absheight1: -6px;
            width: var(--x-width);
            height: var(--x-height);
            display: inline-block;
            margin: 0px;
            padding: 0px;
        }
            
         /* -------------- Reveal ------------------ */
        div.reveal {
            position: relative;
            z-index: -1;
            left: -200px;
        }
        div.reveal p{
            text-align: center;
        }
        
        /* --------------Flip Horizontal------------------ */
        div[effect="flip-hort"] {
            transform: translate(0px) rotateY(0deg);
            transition: transform 1s;
        }
        div[effect="flip-hort"]:hover {
            transform: translate(var(--x-abswidth1)) rotateY(180deg);
            /* box-shadow: 5px 0px 0px 0px rgba(0,0,0,0.75); */
        }
        div[effect="flip-hort"] p{
            text-align: center;
        }
        
        /* -------------- Slide Left ------------------ */
        div[effect="slide-left"] {
            transform: translate(0px);
            transition: transform 1s;
        }
        div[effect="slide-left"]:hover {
            transform: translate(var(--x-abswidth2));
        }
        div[effect="slide-left"] p{
            text-align: center;
        }
        
        /* -------------- Slide Right ------------------ */
        div[effect="slide-right"] {
            transform: translate(0px);
            transition: transform 1s;
        }
        div[effect="slide-right"]:hover {
            transform: translate(var(--x-abswidth3));
        }
        div[effect="slide-right"] p{ 
            text-align: center;
        }
        
        /* --------------Flip Vertical------------------ */
        div[effect="flip-vert"] {
            transform: translate(0px, 0px) rotateX(0deg);
            transition: transform 1s;
        }
        div[effect="flip-vert"]:hover {
            transform: translate(0px, var(--x-absheight1)) rotateX(180deg);
        }
        div[effect="flip-vert"] p{
            text-align: center;
        }
        
        /* -------------- Rotate ------------------ */
        div[effect="rotate"] {
            transform: translate(0px, 0px) rotateZ(0deg);
            transition: transform 1s;
        }
        div[effect="rotate"]:hover {
            transform: translate(var(--x-abswidth1), var(--x-absheight2)) rotateZ(180deg);
        }
        div[effect="rotate"] p{
            text-align: center;
        }
        
        /* -------------- Fade ------------------ */
        div[effect="fade"] {
            opacity: 1;
            transition: opacity 1s;
        }
        div[effect="fade"]:hover {
            opacity: 0;
        }
        div[effect="fade"] p{
            text-align: center;
        }
        
        /* -------------- Shrink ------------------ */
        div[effect="shrink"] {
            transform: scale(1, 1);
            transition: transform 1s;
        }
        div[effect="shrink"]:hover {
            transform: scale(0, 0);
        }
        div[effect="shrink"] p{
            text-align: center;
        }
        
        /* -------------- Sweep Horizontal ------------------ */
        div[effect="sweep-hort"] {
            transform: scaleX(1);
            transition: transform 1s;
        }
        div[effect="sweep-hort"]:hover {
            transform: scaleX(0);
        }
        div[effect="sweep-hort"] p{
            text-align: center;
        }
        
        /* -------------- Sweep Vertical ------------------ */
        div[effect="sweep-vert"] {
            transform: scaleY(1);
            transition: transform 1s;
        }
        div[effect="sweep-vert"]:hover {
            transform: scaleY(0);
        }
        div[effect="sweep-vert"] p{
            text-align: center;
        }
           
    </style>

    <div class="cover" effect="flip-hort" id="cover">
        <slot name="cover">
            <p>Cover</p>
        </slot>
    </div>
    <div class="reveal">
        <slot name="reveal">
            <p>Reveal</p>
        </slot>
    </div>
`;

class RevealBox extends HTMLElement {
  /** Standard template for expanding an HTML element*/
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._cover = this._shadowRoot.querySelector('#cover');
    this._reveal = this._shadowRoot.querySelector('.reveal');
    this._div = this._shadowRoot.querySelector('div');
    this.cover = this.querySelector('div[slot="cover"]');
    this.reveal = this.querySelector('div[slot="reveal"]');
  }
  
  connectedCallback() {
    /** Set up events for mouseover and mouseout*/
    //this._main.addEventListener('mouseover', this.expand);
    //this._main.addEventListener('mouseout', this.contract);
  }
  
  disconnectedCallback() {
    /** Tear down the events for mouseover and mouseout*/
    //this._main.removeEventListener("mouseover", this.expand);
    //this._main.removeEventListener("mouseout ", this.contract);
  }
  
  setInnerStyle(val){
    /**
    Set the style for the cover div based on the innerstyle attribute
    */
    this._cover.setAttribute('style', val);
  }
  
  setRevealHTML(){
     /**
    Set the innerHTML for the reveal div based on the innerHTML of custom tag
    */ 
    this._reveal.innerHTML = this.innerHTML;
  }
  
  get innerstyle() {
    /**
    Getter for the type attribute
    */
    return this.getAttribute('innerstyle');
  }
  
  set innerstyle(newValue) {
    /**
    Setter for the type attribute
    */
    this.setAttribute('innerstyle', newValue);
  }
  
  get width() {
    /**
    Getter for the width attribute
    */
    return this.getAttribute('width');
  }
  
  set width(newValue) {
    /**
    Setter for the width attribute
    */
    this.setAttribute('width', newValue);
  }
  
  get height() {
    /**
    Getter for the height attribute
    */
    return this.getAttribute('height');
  }
  
  set height(newValue) {
    /**
    Setter for the height attribute
    */
    this.setAttribute('height', newValue);
  }
  
  get effect() {
    /**
    Getter for the effect attribute
    */
    return this.getAttribute('effect');
  }
  
  set effect(newValue) {
    /**
    Setter for the effect attribute
    */
    this.setAttribute('effect', newValue);
  }
  
  static get observedAttributes() {
    /** web component hook to tell which attribute change to watch for */
    return ['width', 'height', 'effect', 'innerstyle'];
  }
  
  attributeChangedCallback(name, oldVal, newVal) {
    /** web component callback when a watched attribure is changed */
    if(name == 'width'){
        let borderwidth = parseInt(this.reveal.style.borderWidth);
        let adjustwidth = (-1) * parseInt(newVal) - borderwidth - 1;
        let adjustwidth1 = (-1) * parseInt(newVal); // + borderwidth - 1;
        let adjustwidth2 = (-1) * parseInt(newVal) - (2 * borderwidth);
        let adjustwidth3 = parseInt(newVal) + (2 * borderwidth);
        //newVal = parseInt(newVal) + borderwidth + "px";
        //alert(adjustwidth1);
        this._div.style.setProperty('--x-width', newVal);
        this._div.style.setProperty('--x-abswidth', adjustwidth + "px");
        this._div.style.setProperty('--x-abswidth1', adjustwidth1 + "px");
        this._div.style.setProperty('--x-abswidth2', adjustwidth2 + "px");
        this._div.style.setProperty('--x-abswidth3', adjustwidth3 + "px");
        this.cover.style.width = newVal;
        this.reveal.style.width = newVal;
        this._reveal.style.left = adjustwidth+"px";
    }
    else if(name == 'height'){
        let borderwidth = parseInt(this.reveal.style.borderWidth);
        let adjustheight = (-1) * parseInt(newVal) + borderwidth;
        let adjustheight1 = parseInt(newVal) + (4 * borderwidth);
        let adjustheight2 = (2 * borderwidth);
        this._div.style.setProperty('--x-height', newVal);
        this._div.style.setProperty('--x-absheight', adjustheight + "px");
        this._div.style.setProperty('--x-absheight1', adjustheight1 + "px");
        this._div.style.setProperty('--x-absheight2', adjustheight2 + "px");
        this.cover.style.height = newVal;
        this.reveal.style.height = newVal;
    }
    else if(name == 'effect'){
        this.setInnerStyle(newVal);
        this._cover.setAttribute('effect', newVal);
    }
    else if(name == 'innerstyle'){
    }
    else{
        
    }
  }

}

window.customElements.define('reveal-box', RevealBox);
