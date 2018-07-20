import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import {Header,Left,Button, Container, Icon,Right,Body,Title, Tab, Tabs} from 'native-base';

export default class AppHeader extends Component {
  render() {
    return (
      <Container>
      <Header hasTabs>
       <Left>
       <Button transparent
              onPress={()=>this.props.openDrawer()}
       >
         <Icon name='menu' />
       </Button>
       </Left>
       <Body>
         <Title>Restaurant Deals</Title>
       </Body>
       <Right>
         <Button transparent>
           <Icon name='bulb' />
         </Button>
       </Right>
     </Header>
     <Tabs initialPage={0}>
          <Tab heading="Santiago">
          <Text>tab uno</Text>
          </Tab>
          <Tab heading="Santo Domingo">
            <Text>tab 2</Text>
          </Tab>
          </Tabs>
        </Container>

    );
  }
}

module.exports = AppHeader;