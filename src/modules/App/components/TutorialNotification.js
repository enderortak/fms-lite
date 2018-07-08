import React from "react";
import { Header, Icon, Checkbox } from "semantic-ui-react";
import "./TutorialNotification.scss";

const checkboxLabel = (
  <label >Tekrar gösterme</label>
);

const TutorialNotification = () => (
  <React.Fragment>
    <Header id="tutorial-notification-message" inverted as="h4">
      <Icon name="info circle" />
      <Header.Content>
        Ford Trucks filo takip sistemine hoşgeldiniz
        <Header.Subheader>
            Filo takip sistemi öğreticisi ile hızlı bir başlangıç yapabilirsiniz
        </Header.Subheader>
      </Header.Content>
    </Header>
    <Checkbox label={checkboxLabel} className="dont-show" />
  </React.Fragment>
);

export default TutorialNotification;
