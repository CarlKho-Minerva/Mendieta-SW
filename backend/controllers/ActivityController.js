const { Activity } = require("../models.js");

class ActivityController {
  static init(app, mendieta) {

    app.route("/activities")
      .get((req, res) => res.send(mendieta.activities));

    app.route("/activities/current")
      .get((req, res) => {
        if (mendieta.currentActivity) {
          res.send(mendieta.currentActivity);
        } else {
          res.sendStatus(404);
        }
      })
      .delete((req, res) => {
        if (!mendieta.currentActivity){
          res.sendStatus(400);
        } else {
          mendieta.currentActivity = null;
          res.sendStatus(200);
        }
      })
      .post((req, res) => {
        if(req.body.id) {
          var activity = mendieta.findActivity(req.body.id);
          if(activity) {
            mendieta.currentActivity = activity;
            res.send(activity);
          } else {
            res.sendStatus(404);
          }
        } else {
          if(req.body.name){
            mendieta.currentActivity = new Activity(req.body.name);
            res.send(mendieta.currentActivity);
          }else{
            res.sendStatus(400);
          }
        }
      });
  }
}

module.exports = ActivityController;
