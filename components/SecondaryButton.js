import React from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';
import { styles, palette } from '../styles';

const SecondaryButton = props =>
  <TouchableHighlight
    style={[styles.button, { backgroundColor: palette.CHARCOAL }]}
    onPress={props.onPress}
  >
    <Text style={styles.buttonText} >{props.label}</Text>
  </TouchableHighlight>;

SecondaryButton.propTypes = {
  label: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
};

export default SecondaryButton;
