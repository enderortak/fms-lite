import React from "react";
import { Header, Icon, Checkbox } from "semantic-ui-react";

const checkboxLabel = (
  <label style={{ color: "#FFFFFF" }} >Tekrar gösterme</label>
);

const TutorialNotification = () => (
  <React.Fragment>
    <Header inverted as="h4" style={{ margin: "0.5rem 1rem" }}>
      <Icon name="info circle" style={{ fontSize: "2em" }} />
      <Header.Content>
        Ford Trucks filo takip sistemine hoşgeldiniz
        <Header.Subheader style={{ marginTop: "0.5em" }}>
            Filo takip sistemi öğreticisi ile hızlı bir başlangıç yapabilirsiniz
        </Header.Subheader>
      </Header.Content>
    </Header>
    <Checkbox label={checkboxLabel} style={{ float: "right" }} />
  </React.Fragment>
);

export default TutorialNotification;
