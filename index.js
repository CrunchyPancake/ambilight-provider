var screenshot = require('desktop-screenshot');
var color = require('dominant-color')
var fs = require('fs');

var timer
var isRunning = false

exports.start = (interval, callback) => {
    isRunning = true
    timer = setInterval(() => {
        screenshot("screenshot.png", function (error, complete) {
          color("screenshot.png", { format: 'rgb' }, (err, color) => {
            if (err) {
                console.log("Computer cant keep up with interval. Try increasing by 25ms")
                return
            }
            callback(color)
          })
        })
      }, interval)
}

exports.stop = () => {
    if (timer != null && isRunning) {
        clearInterval(timer)
        isRunning = false
        try {
            fs.unlinkSync("screenshot.png")
        } catch (err) {
            console.log("Couldn't delete screenshot\n" + err)
        }
        
    }     
}

exports.isRunning = () => {
    return isRunning
}