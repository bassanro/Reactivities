import { IActivity } from "./../models/activity";
import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  // experimentalDecorators in tsconfig.json -> since we are using TypeScript, it's okay.
  @observable activityRegistry = new Map();
  @observable loadingInital = false;
  @observable activity: IActivity | null = null;
  @observable submitting = false;
  @observable target = "";

  @computed get activtiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action loadActivities = async () => {
    this.loadingInital = true;
    try {
      const activities = await agent.activities.list();
      runInAction("loading activities", () => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInital = false;
      });
      console.log(this.groupActivitiesByDate(activities));
    } catch (error) {
      runInAction("loading activities error", () => {
        this.loadingInital = false;
      });
      console.log(error);
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.activities.create(activity);
      runInAction("creating activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("creating activity error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.activities.update(activity);
      runInAction("editing an activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("editing an activity error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;

    try {
      await agent.activities.delete(id);
      runInAction("deleting an activity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("deleting an activity error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInital = true;
      try {
        activity = await agent.activities.details(id);
        runInAction("Getting Activity", () => {
          this.activity = activity;
          this.loadingInital = false;
        });
      } catch (error) {
        runInAction("get Activity error", () => {
          this.loadingInital = false;
        });
        console.log(error);
      }
    }
  };
}

export default createContext(new ActivityStore());
