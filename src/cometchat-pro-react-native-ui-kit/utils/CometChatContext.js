import PropTypes from 'prop-types';
import React from 'react';

import { theme } from '../resources/theme';

import { FeatureRestriction } from './FeatureRestriction';
import { UIKitSettings } from './UIKitSettings';

export const CometChatContext = React.createContext({});

export class CometChatContextProvider extends React.Component {
  constructor(props) {
    super(props);

    const settings = new UIKitSettings();
    const featureRestriction = new FeatureRestriction(settings);

    this.state = {
      UIKitSettings: settings,
      FeatureRestriction: featureRestriction,
      theme: theme,
    };
  }

  render() {
    return (
      <CometChatContext.Provider value={this.state}>
        {this.props.children}
      </CometChatContext.Provider>
    );
  }
}
