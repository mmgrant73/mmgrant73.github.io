/**
Description: Custom web component that allows you to place an acronym on a 
webpage and when the mouse is hover over it.  It will expand to show what 
the meaning of the acronym.

Usage:
<x-acronym innerstyle="bg-color: red;">
    National Aeronautics Space Administration
</x-acronym>

Attribure:
    innerstyle - is used to style the text box
    type - horizontal or vertical.  is how the text is displayed
*/

const template = document.createElement('template');
template.innerHTML = `
        <style>
            
            div#main:hover div.part {
                visibility: visible;
                opacity: 1;
            }
            
            div#main {
                display: inline-block;
                margin: 5px;
                padding: 4px;
                font-size: 18px;
            }
            .letter {
                display: inline-block;  
            }
            div.part {
                display: inline-block;
                visibility: hidden;
                opacity: 0;
                width: 0; 
            }

        </style>

        <!-- NASA stands for National Aeronautics and Space Administration. -->
        <div id="main">
            <div class="letter" style="display: inline-block;">N<div class="part">ational</div></div>
            <div class="letter" style="display: inline-block">A<div class="part">eronautics</div></div>
            <div class="letter" style="display: inline-block">S<div class="part">pace</div></div>
            <div class="letter" style="display: inline-block">A<div class="part">dministration</div></div>
        </div>
`;

class Acronym extends HTMLElement {
  /** Standard template for expanding an HTML element*/
  constructor() {
    super();
    this.replaceHTML = "";
    this.acronymtext = this.innerText;
    this.placeHTML();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._main = this._shadowRoot.querySelector('#main');
    this.xwidth = [];
    this._main.innerHTML = this.replaceHTML
    this._letter = this._shadowRoot.querySelectorAll('.letter');
    this._part = this._shadowRoot.querySelectorAll(".part");
  }
    
  connectedCallback() {
    /** Set up events for mouseover and mouseout*/
    this._main.addEventListener('mouseover', this.expand);
    this._main.addEventListener('mouseout', this.contract);
  }
  
  disconnectedCallback() {
    /** Tear down the events for mouseover and mouseout*/
    this._main.removeEventListener("mouseover", this.expand);
    this._main.removeEventListener("mouseout ", this.contract);
  }
  
  getFontSize(){
    var x = window.getComputedStyle(this._main).getPropertyValue('font-size');
    x = parseInt(x);
    return x;
  }
  
  setInnerStyle(val){
    /**
    Set the style for the main div based on the innerstyle attribute
    */
    this._main.setAttribute('style', val);
    var x = this.getFontSize();
    this.getTextWidth(x);
  }
  
  setElementStyle(val){
      if(val=="vertical"){
           var len1 = this._letter.length;
           for(let k=0; k<len1; k++){
               this._letter[k].style.display = 'block';
               var test = this._letter[k].style.display;
           }
       }
  }
  
  placeHTML(){
    /**
    Take the array of words and turn it to HTML code and 
    place it into the main div tag
    */
    let wordlist = this.createWords();
    let htmlstr = "";
    for (var k = 0; k < wordlist.length; k++) {
        let list1 = wordlist[k];
        htmlstr += "<div class='letter' style='display: inline-block;'>" + list1[0] + "<div class='part'>" + list1[1] + "</div></div>";
    }
    this.replaceHTML = htmlstr;
  }
  
  createWords(){
    /**
    Split the text in an array of words
    */
    let words = [];
    let res = this.acronymtext.split(" ");  
    for (var k = 0; k < res.length; k++) { 
        words.push(this.splitWord(res[k]));
    }
    return words;
  }
  
  splitWord(word){
    /**
    Split the words in an array consisting of [firstletter, otherletters]
    */
    let firstletter = word.charAt(0);
    let otherletters = word.substr(1);
    return [firstletter, otherletters];
  }
  
  expand = (evt) => {
    /**
    Method for expanding the text into full words
    */
    let len1 = this._part.length
    for(var y=0; y<len1; y++){
        var res = this.xwidth[y];
        this._part[y].style.width = res + "px";
        this._part[y].style.visibility = "visible";
        this._part[y].style.opacity = 1;
        this._part[y].style.transition = "width 1s, visibility 1s 1s, opacity 1s 1s linear";
    }
  };
  
  contract = (evt) => {
    /**
    Method for contracting the text back into acronym
    */
    let len1 = this._part.length
    for(var y=0; y<len1; y++){
        this._part[y].style.width = "0px";
        this._part[y].style.visibility = "hidden";
        this._part[y].style.opacity = 0;
        this._part[y].style.transition = "width 1s 1s, visibility 1s, opacity 1s linear";
    }  
  };
  
  measureText(string, fontSize = 12) {
    /**
    Get the pixel length of a string
    */
    const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.15625,0.3,0.4,0.7,0.6,0.9,0.7,0.2,0.4,0.4,0.4,0.6,0.3,0.4,0.3,0.5,0.6,0.55625,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.3,0.3,0.6,0.6,0.6,0.6,1.1,0.8,0.7,0.8,0.7234375,0.7,0.6109375,0.8,0.7234375,0.3,0.5,0.8,0.6,0.834375,0.7234375,0.8,0.7,0.8,0.8,0.7,0.8,0.7234375,0.8,1.1,0.8,0.8,0.8,0.3,0.5,0.3,0.6,0.7,0.334375,0.6,0.6,0.6,0.6,0.6,0.5,0.6,0.6,0.2234375,0.3234375,0.6,0.2234375,0.834375,0.6,0.6,0.6,0.6,0.4,0.5,0.4,0.6,0.7,0.9,0.7,0.7,0.6,0.5,0.2609375,0.5,0.6]
    const avg = 0.5889638157894739
    return string
        .split('')
        .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
        .reduce((cur, acc) => acc + cur) * fontSize
  }
  
  getTextWidth(size){
    /**
    Returns an array consisting of the pixel length of each word
    */
    let len1 = this._part.length
    for(var y=0; y<len1; y++){
        var z = this._part[y].innerHTML;
        var textwidth = this.measureText(z,size);
        this.xwidth.push(textwidth);
    }
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
  
  get type() {
    /**
    Getter for the type attribute
    */
    return this.getAttribute('type');
  }
  
  set type(newValue) {
    /**
    Setter for the type attribute
    */
    this.setAttribute('type', newValue);
  }
  
  static get observedAttributes() {
    /** web component hook to tell which attribute change to watch for */
    return ['type', 'innerstyle'];
  }
  
  attributeChangedCallback(name, oldVal, newVal) {
    /** web component callback when a watched attribure is changed */
    if(name == 'type'){
        this.setElementStyle(newVal);
    }
    else if(name == 'innerstyle'){
        this.setInnerStyle(newVal);
    }
    else{
        
    }
  }

}

window.customElements.define('x-acronym', Acronym);
