import { IActivity } from "./../models/activity";
import { observable, action, computed } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

class ActivityStore {
  // experimentalDecorators in tsconfig.json -> since we are using TypeScript, it's okay.
  @observable activities: IActivity[] = [];
  @observable loadingInital = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;

  @computed get activtiesByDate() {
    return this.activities.slice().sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadActivities = async () => {
    this.loadingInital = true;
    try {
      const activities = await agent.activities.list();
      activities.forEach(activity => {
        activity.date = activity.date.split(".")[0];
        this.activities.push(activity);
      });
      this.loadingInital = false;
    } catch (error) {
      console.log(error);
      this.loadingInital = false;
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.activities.create(activity);
      this.activities.push(activity);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  // Open activity form
  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find(a => a.id === id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());