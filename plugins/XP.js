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

ig.module('plugins.XP')
.requires()
.defines(function () {
    XP = ig.Class.extend({}

      /**
      * The current XP of the obj.
      * @property currentXP
      * @type int
      **/
      currentXP:0,

      /**
      * amount of XP needed to level up.
      * @property levelUpXPThreshold
      * @type int
      **/
      levelUpXPThreshold:0,

      /**
      * Percentage increase of XP needed to level up. IE, 1.05 would increase levelUpXPThreshold up by 5%
      * @property levelUpXPThresholdIncrease
      * @type float
      **/ 
      levelUpXPThresholdIncrease:0,

      /**
      * Current level of the obj.
      * @property currentLevel
      * @type int
      **/
      currentLevel:0,

      /**
      * Max level of the obj.
      * @property maxLevel
      * @type int
      **/ 
      maxLevel:0,

      /**
      * (optional) A callback method to invoke when the obj levels up.
      * @property levelUpCallback
      * @type Function
      **/ 
      levelUpCallback: null,

      /**
       * Set initial values here. Init is called automatically when the class is instantiated.
       * If you load any saved details, make sure you set them in the constructor. 
       * 
       * @class XP
       * @param {int} currentXP The current XP of the object
       * @param {int} currentLevel The current Level of the object
       * @param {int} maxLevel The max permitted Level of the object
       * @param {int} levelUpXPThresholdIncrease The percentage increase of XP needed to level up. IE, 1.05 would increase XP needed to level up by 5% - note, we may change this be reference a method instead.
       * @param {int} levelUpXPThreshold The amount of currentXP needed to increase the currentLevel
       * @param {int} levelUpCallback (optional) a callback method to call when the obj levels up.
       *
       * @constructor
       **/
      init: function(currentXP, currentLevel, maxLevel, levelUpXPThresholdIncrease, levelUpXPThreshold, levelUpCallback)
      {
        this.currentXP = currentXP;
        this.currentLevel = currentLevel;
        this.maxLevel = maxLevel;
        this.levelUpXPThresholdIncrease = levelUpXPThresholdIncrease;
        this.levelUpXPThreshold = levelUpXPThreshold;
        this.levelUpCallback = levelUpCallback;
      },

      /**
      * increase the XP of the obj. Automatically handles levelling up.
      * @method increaseXP
      * @param {int} amt The amount of XP to add.
      **/ 
      increaseXP: function( amt )
      {
        //increase the current XP amount
        this.currentXP += amt;

        //if we have more XP than the levelUpThreshold, and we are under the max level limit, increase the level.
        if( this.currentXP >= this.levelUpXPThreshold )
        {
          this.levelUp();
        }
      },


      /**
      * level up the obj.
      * @method levelUp
      **/ 
      levelUp: function()
      {
        //eject from this method if we are over the max level limit.
        if( this.currentLevel >= this.maxLevel )
        {
          return;
        }

        //reset the current Xp, but leave any remaining amount over the threshold.
        this.currentXP -= this.levelUpXPThreshold;
        //increase the current level
        this.currentLevel += 1;
        //increase the XP threshold amount.
        this.levelUpXPThreshold *= this.levelUpXPThresholdIncrease;

        //if, after leveling up, we still have more XP than the next threshold, level up again. 
        if( this.currentXP >= this.levelUpXPThreshold )
        {
          this.levelUp();
        }else if( levelUpCallback != null && levelUpCallback != undefined )
        {
          //if we do not have enough XP to level up again, call the levelUpCallback if it has been set.
          this.levelUpCallback();
        }
      }
    })
});
