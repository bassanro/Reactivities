import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header as={NavLink} exact to="/">
            <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }} />
            Reactivites
          </Menu.Item>
          <Menu.Item name="Activites" as={NavLink} to="/activities" />
          <Menu.Item>
            <Button
              as={NavLink}
              to="/createActivity"
              onClick={activityStore.openCreateForm}
              positive
              content="Create Activity"
            />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default observer(NavBar);
