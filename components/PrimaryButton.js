import React from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';

import { styles } from '../styles';

const PrimaryButton = props =>
  <TouchableHighlight style={styles.button} onPress={props.onPress} >
    <Text style={styles.buttonText} >{props.label}</Text>
  </TouchableHighlight>;

PrimaryButton.propTypes = {
  label: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
};

export default PrimaryButton;
