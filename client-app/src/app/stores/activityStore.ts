import { IActivity } from "./../models/activity";
import { observable, action } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

class ActivityStore {
  // experimentalDecorators in tsconfig.json -> since we are using TypeScript, it's okay.
  @observable activities: IActivity[] = [];
  @observable loadingInital = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;

  @action loadActivities = () => {
    this.loadingInital = true;

    agent.activities
      .list()
      .then(activities => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.activities.push(activity);
        });
      })
      .finally(() => (this.loadingInital = false));
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find(a => a.id === id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
