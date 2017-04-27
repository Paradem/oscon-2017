import React from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';
import { styles, palette } from '../styles';

export default props => <TouchableHighlight style={styles.button} onPress={props.onPress} >
  <Text style={styles.buttonText} >{props.label}</Text>
</TouchableHighlight>;
