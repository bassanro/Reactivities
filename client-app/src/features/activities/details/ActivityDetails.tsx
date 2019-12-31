import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedSideBar } from "./ActivityDetailedSideBar";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInital } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInital || !activity) return <LoadingComponent content="Loading Activity" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSideBar />
      </Grid.Column>
    </Grid>

    // <Card fluid>
    //   <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
    //   <Card.Content>
    //     <Card.Header>{activity!.title}</Card.Header>
    //     <Card.Meta>
    //       <span className="date">{activity!.date}</span>
    //     </Card.Meta>
    //     <Card.Description>{activity!.description}</Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <Button.Group widths={2}>
    //       <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content="Edit" />
    //       <Button onClick={() => history.push("/activities")} basic color="grey" content="Cancel" />
    //     </Button.Group>
    //   </Card.Content>
    // </Card>
  );
};

export default observer(ActivityDetails);
