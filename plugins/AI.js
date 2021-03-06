/*
* Event
* Visit http://grindheadgames.com/ for documentation, updates and examples.
*
* Copyright (c) 2014 GrindheadGames
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

(function (root) {
  var ai = {

      /**
      * The current state of the AI.
      * @property currentState
      * @type int
      **/
      currentState: 0,

      stateList: [],

      /**
       * Set initial values here. Init is called automatically when the class is instantiated.
       * If you load any saved details, make sure you set them in the constructor.
       *
       * @class AI
       * @param {int} currentPos The current postion of the CTR to invoke the next think() call.
       * @param {int} currentThreshold The current threshold to meet to invoke the next think() call.
       * @constructor
       **/
      init: function()
      {

      },

      /**
      * increase the XP of the obj. Automatically handles levelling up.
      * @method increaseXP
      * @param {int} amt The amount of XP to add.
      **/
      addState: function(state)
      {
        if( this.stateList[state] != null )
        {
          this.stateList[state] = 1;
          this.stateList[state][0] = [];
        }
      },

      addAction: function(state, method)
      {
        //the state exists!
        if(this.stateList[state] >= 1)
        {
          this.stateList[state][0].push( method )
        }
      },

      update: function()
      {
        if( this.currentPos >= this.currentThreshold )
        {
          this.think();
        }
      },

      think:function()
      {
          //choose random method from actions.
          //this.stateList[state][0]
      }
    }

  if (typeof ig !== 'undefined') {
    // Impact.js
    ig.module('plugins.AI').requires().defines(function () {
      AI = ig.Class.extend({}, ai)
    })
  } else if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = ai
  } else {
    // Script tag
    root.ai = ai
  }
}(this))
