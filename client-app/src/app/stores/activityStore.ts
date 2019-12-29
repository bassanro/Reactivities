import { IActivity } from "./../models/activity";
import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";

class ActivityStore {
  // experimentalDecorators in tsconfig.json -> since we are using TypeScript, it's okay.
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInital = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activtiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInital = true;
    try {
      const activities = await agent.activities.list();
      activities.forEach(activity => {
        activity.date = activity.date.split(".")[0];
        this.activityRegistry.set(activity.id, activity);
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
      this.activityRegistry.set(activity.id, activity);
      this.activities.push(activity);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
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

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;

    try {
      await agent.activities.delete(id);
      this.activityRegistry.delete(id);
      this.submitting = false;
      this.target = "";
    } catch (error) {
      this.submitting = false;
      this.target = "";
      console.log(error);
    }
  };
}

export default createContext(new ActivityStore());
