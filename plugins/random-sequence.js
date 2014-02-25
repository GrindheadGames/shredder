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

/**
 * @int seed A value used to seed randomness. Values between 1 - n
 */
function createRandomSequence(seed) {

  var self =
      { currentSeed: seed ? '0.' + seed : Math.random()
      , get: function() {
          return self.currentSeed = logisticMap(self.currentSeed)
        }
      }

  /**
   * Randomness is achieved by recursion over the logistic map.
   *
   * http://en.wikipedia.org/wiki/Logistic_map#Chaos_and_the_logistic_map
   */
  function logisticMap(x) {
    return 4 * x * (1 - x)
  }

  /**
   * The logistic map's randomness is evident after a number of iterations.
   */
  function init() {
    // 99 iterations will provide adequate randomness.
    for (var i = 0; i < 99; i++) {
      self.currentSeed = logisticMap(self.currentSeed)
    }

    return self
  }

  return init()
}
