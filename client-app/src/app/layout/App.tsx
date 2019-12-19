import React, { Component } from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../models/activity";

interface IState {
  activities: IActivity[];
}

// {} to skip props.
class App extends Component<{}, IState> {
  readonly state = {
    activities: []
  };

  componentDidMount() {
    // rerender of component.
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        //console.log(response);
        this.setState({ activities: response.data });
      });
  }

  render() {
    return (
      <div className="App">
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivites</Header.Content>
        </Header>

        <List>
          {this.state.activities.map((activity: IActivity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
