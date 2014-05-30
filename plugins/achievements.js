
(function (root) {
  'use strict'

  var achievements =
      { achievementList: []
      , achievementAnimations: []
      , achievementsUnlockedLastRound: []

      , addAchievement:function (achievement_id, totalAmountNeeded, unlockedImage) {
          var achievement = [0, totalAmountNeeded, unlockedImage]
          this.achievementList[achievement_id] = achievement
        }

      , getAchievementList: function () {
          return this.achievementList
        }

      , getAchievementProgress: function (achievement_id) {
          return this.achievementList[achievement_id][0] / this.achievementList[achievement_id][1]
        }

      , setAchievementUnlockAmount: function (achievement_id , progress, defaultAttribute) {
          if (this.achievementList[achievement_id][0] >= this.achievementList[achievement_id][1]) {
            return
          }

          this.achievementList[achievement_id][0] = progress

          if (this.achievementList[achievement_id][0] >= this.achievementList[achievement_id][1] && defaultAttribute == undefined) {
            this.playUnlockAchievementAnimation(this.achievementList[achievement_id][2])
            this.achievementsUnlockedLastRound.push(achievement_id)
          }
        }

      , increaseAchievementUnlockAmount: function (achievement_id , progress) {
          this.setAchievementUnlockAmount(achievement_id, this.achievementList[achievement_id][0] + progress)
        }

      , playUnlockAchievementAnimation: function (image) {
          image.x = WIDTH/2 - image.width/2
          image.y = -image.height

          this.achievementAnimations.push(image)

          TweenMax.to(image, 1, {y:0, ease: Back.easeIn, onComplete: ig.system.bounceGraphic, onCompleteParams:[image] })
        }

      , bounceGraphic: function (image) {
          TweenMax.to(image, 1, {scale: 1.5, repeat:1, yoyo: true, ease: Back.easeInOut, onComplete: ig.system.slideOutGraphic, onCompleteParams:[image] })
        }

      , slideOutGraphic: function (image) {
          TweenMax.to(image, 1, {y:-image.height, ease: Back.easeIn, onComplete: ig.system.removeAchivementGraphic })
        }

      , removeAchivementGraphic: function () {
          //the one finishing will ALWAYS be the first in the list.
          //  NOTE!  - we have to use the long lookup as using this. does not work due to scope.
          ig.system.achievementAnimations.splice(0,1)
        }
      }

  if (typeof ig !== 'undefined') {
    // Impact.js
    ig.module('plugins.achievements').requires().defines(function () {
      Achievements = ig.Class.extend(achievements)
    })
  } else if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = achievements
  } else {
    // Script tag
    root.achievements = achievements
  }
}(this))
