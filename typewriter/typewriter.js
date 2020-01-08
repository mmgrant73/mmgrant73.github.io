/**
Description: Is a text effect web component. Whatever you put in the innerText will look like its being
type out.

It has two attributes that can be set:
1) cursor - this could be a hortline, underline, block or none
2) align - left, right or centered
3) effect - standard or smooth

Usage:
<type-writer cursor="underline" align="left" effect="standard">This is a test sentence</type-writer>

Note: The innertext should only be as long as the width of its parent element for the effect 
to work correctly.  I have plans on adding multiple lines when I have time
*/

const template = document.createElement('template');
template.innerHTML = `

    <!---------- Style ------------>
    <style>
    
        .base {
            --x-width: 470px;
            --y-height: 40px;
            --y-heighthalf: 20px;
            --y-heighteeigth: 5px;
            --x-cursorcolor: rgba(0,255,0,.75);
        }
        
        #outer {
            text-align: left;
        }
        
        #common {
            display: inline-block;
            height: var(--y-height);
            white-space: nowrap;
            overflow: hidden; 
            font-family: 'Source Code Pro', monospace;  
            font-size: 28px;
            color: rgba(255,255,255,.70);
            position: relative;
        }
        
        
        #underline {
              display: inline-block;
              border-bottom: solid 3px rgba(0,255,0,.75);
              position: absolute;
              right: -7px;
              width: var(--y-heighthalf);
              animation: animated-cursor-underline 600ms steps(30,end) infinite;
        }
        
        #line {
              display: inline-block;
              border-left: solid 3px rgba(0,255,0,.75);
              position: absolute; 
              right: -12px; 
              width: var(--y-heighthalf);
              animation: animated-cursor-line 600ms steps(29,end) infinite;
        }
        
        #block {
            display: inline-block;
            position: absolute; 
            background-color: var(--x-cursorcolor); 
            right: -7px;
            top: var(--y-heighteeigth);
            height: calc(var(--y-heighthalf) + var(--y-heighteeigth));
            width: var(--y-heighthalf);
            animation: animated-cursor-block 600ms steps(29,end) infinite;
        }
        
        @keyframes animated-text{
            from{width: 0;}
            to{width: var(--x-width);} 
        }

        @keyframes animated-cursor-underline{
            from{border-bottom-color: var(--x-cursorcolor);}
            to{border-bottom-color: transparent;}
        }
        
        @keyframes animated-cursor-line{
            from{border-left-color: var(--x-cursorcolor);}
            to{border-left-color: transparent;}
        }
            
        @keyframes animated-cursor-block{
            from{background-color: var(--x-cursorcolor);}
            to{background-color: transparent;}
        }
           
    </style>
    
    <!-------- HTML Template ------------->

    <div id="outer">
    
        <div class="base" id="common" cursor="line" effect="standard" align="left" fontsize="22px">
            This is a typewriter effect.<div id="line" inner>&nbsp</div>
        </div>
    
    </div>
`;

class TypeWriter extends HTMLElement {
  /** Standard template for expanding an HTML element*/
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._div = this._shadowRoot.querySelector('div.base');
    this._underline = this._shadowRoot.querySelector('#underline');
    this._line = this._shadowRoot.querySelector('#line');
    this._block = this._shadowRoot.querySelector('#block');
    this.sentence = this.innerHTML;
    this.setHTML();
    this._common = this._shadowRoot.querySelector("#common");
    this._border = this._shadowRoot.querySelector("div[inner]");
    this._outer = this._shadowRoot.querySelector("div#outer");
  }
  
  setHTML(){
     /**
    Set the innerHTML for the reveal div based on the innerHTML of custom tag
    */ 
    this.sentence = this.sentence + "<div id='line' inner>&nbsp</div>";
    this._div.innerHTML = this.sentence;
  }
  
  get cursor() {
    /**
    Getter for the cursor attribute
    */
    return this.getAttribute('cursor');
  }
  
  set cursor(newValue) {
    /**
    Setter for the cursor attribute
    */
    this.setAttribute('cursor', newValue);
  }
  
  get align() {
    /**
    Getter for the align attribute
    */
    return this.getAttribute('align');
  }
  
  set align(newValue) {
    /**
    Setter for the align attribute
    */
    this.setAttribute('align', newValue);
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
  
  get fontsize() {
    /**
    Getter for the fontsize attribute
    */
    return this.getAttribute('fontsize');
  }
  
  set fontsize(newValue) {
    /**
    Setter for the fontsize attribute
    */
    this.setAttribute('fontsize', newValue);
  }
  
  get textcolor() {
    /**
    Getter for the textcolor attribute
    */
    return this.getAttribute('textcolor');
  }
  
  set textcolor(newValue) {
    /**
    Setter for the textcolor attribute
    */
    this.setAttribute('textcolor', newValue);
  }
  
  get cursorcolor() {
    /**
    Getter for the cursorcolor attribute
    */
    return this.getAttribute('cursorcolor');
  }
  
  set cursorcolor(newValue) {
    /**
    Setter for the cursorcolor attribute
    */
    this.setAttribute('cursorcolor', newValue);
  }
  
  getHeight() {
    let h = this._outer.offsetHeight;
    let hh = Math.round(h/2);
    let he = Math.round(h/8);
    this._div.style.setProperty('--y-height', h+"px");
    this._div.style.setProperty('--y-heighthalf', hh+"px");
    this._div.style.setProperty('--y-heighteeigth', he+"px");
    alert("height - " + h);
  }
  
  getWidth(){
    /**
    Get the Width and Height for the Text and store it in variables
    */
    let w = this._div.offsetWidth;
    this._div.style.setProperty('--x-width', w+"px");
    let len1 = this._div.innerText.length
    let lw = Math.round(w/len1);
    var x = window.getComputedStyle(this._div).getPropertyValue('font-size');
    x = parseInt(x);
    let h = (w/len1)*1.4 *2;
    let hh = Math.round(h/2);
    let he = Math.round(h/8);
    if(x<18){ hh += 3; }
    this._div.style.setProperty('--y-height', h+"px");
    this._div.style.setProperty('--y-heighthalf', hh+"px");
    this._div.style.setProperty('--y-heighteeigth', he+"px");
  }
  
  setCursorType(val){
    /**
    Set the id attribute for the Div that holds the cursor
    */
    if(val == 'line'){
        this._border.setAttribute("id", "line");
    }
    else if(val == 'underline'){
        this._border.setAttribute("id", "underline");
    }
    else if(val == 'block'){
        this._border.setAttribute("id", "block");
    }
    else{
        this._border.setAttribute("id", "none");
    }
    //alert('cursortype');
  }
  
  setAlignType(val){
    /**
    Set the text alignment for the text
    */
    if(val == "center"){
        this._outer.style.textAlign = "center";
    }
    else if(val == "right"){
        this._outer.style.textAlign = "right";
    }
    else{
        this._outer.style.textAlign = "left";
    }
  }
  
  setEffectType(val){
    /**
    Set the animation for the correct effect
    */
    if(val == "smooth"){
        //this._div.style.animation = "animated-text 4s linear 1s 1 normal both, animated-cursor3 600ms linear infinite";
        this._div.setAttribute("effect", "smooth");
        //this._div.style.animation = "animated-text 4s linear 1s 1 normal both";
        //this._border.
    }
    else{
        //this._div.style.animation = "animated-text 4s steps(29,end) 1s 1 normal both, animated-cursor 600ms steps(29,end) infinite";
        this._div.setAttribute("effect", "standard");
        //this._div.style.animation = "animated-text 4s steps(30,end) 1s 1 normal both";
    }
  }
  
  setFont(val){
    /**
    Set the Font Size for the text
    */
    this._div.style.fontSize = val;
  }
  
  setTextColor(val){
    this._div.style.color = val;
  }
  
  setCursorColor(val) {
    let type = this._border.getAttribute("id");
    //alert(val);
    this._div.style.setProperty('--x-cursorcolor', val);
    if(type == "line"){
        this._border.style.borderLeft = "solid 3px " + val;
    }
    else if(type == "underline"){
        this._border.style.borderBottom = "solid 3px " + val; 
    }
    else if(type == "block"){
        this._border.style.backgroundColor = val;
    }
    else{
        
    }
  }
  
  connectedCallback() {
    this.getWidth();
    let effect = this._div.getAttribute("effect");
    if(effect == "smooth"){
        this._div.style.animation = "animated-text 4s linear 1s 1 normal both";
    }
    else{
        this._div.style.animation = "animated-text 4s steps(30,end) 1s 1 normal both";
    }
  }

  static get observedAttributes() {
    /** web component hook to tell which attribute change to watch for */
    return ['cursor', 'align', 'effect', 'fontsize', 'textcolor', 'cursorcolor'];
  }
  
  attributeChangedCallback(name, oldVal, newVal) {
    /** web component callback when a watched attribure is changed */
    if(name == 'cursor'){
        this.setCursorType(newVal);
    }
    else if(name == 'align'){
        this.setAlignType(newVal);
    }
    else if(name == 'effect'){
        this.setEffectType(newVal);
    }
    else if(name == 'fontsize'){
        this.setFont(newVal);
    }
    else if(name == 'textcolor'){
        this.setTextColor(newVal);
    }
    else if(name == 'cursorcolor'){
        this.setCursorColor(newVal);
    }
    else{
        
    }

  }

}

window.customElements.define('type-writer', TypeWriter);
