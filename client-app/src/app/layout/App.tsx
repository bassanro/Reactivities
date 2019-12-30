import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import "./styles.css";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
    // Empty array would ensure useEffect runs one time only.
  }, [activityStore]);

  if (activityStore.loadingInital) return <LoadingComponent content="Loading Activities .. " />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route path="/" component={HomePage} />
        <Route path="/activities" component={ActivityDashboard} />
        <Route path="/activities/:id" component={ActivityDetails} />
        <Route path="/createActivity" component={ActivityForm} />
      </Container>
    </Fragment>
  );
};

// App will start observing and all updated to the store. (activityStore)
export default observer(App);
