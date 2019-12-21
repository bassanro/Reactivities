import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import "./styles.css";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handlerCreateActivity = (activity: IActivity) => {
    // If actitivty is not created the inside scope is not executed.
    agent.activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleEditActivity = (activity: IActivity) => {
    agent.activities.update(activity).then(() => {
      setActivities([
        ...activities.filter(a => a.id !== activity.id),
        activity
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleDeleteActivity = (id: string) => {
    agent.activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    });
  };

  useEffect(() => {
    agent.activities.list().then(response => {
      //console.log(response);
      let activities: IActivity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });
      setActivities(activities);
    });
    return () => {};
    // Empty array would ensure useEffect runs one time only.
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handlerCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
