import React from 'react'
import {
  Text,
  TouchableHighlight,
} from 'react-native';
import { styles, palette } from "../styles";

export default (props) => {
  return <TouchableHighlight style={ [ styles.button, { backgroundColor: palette.CHARCOAL } ] } onPress={props.onPress} >
    <Text style={ styles.buttonText } >{props.label}</Text>
  </TouchableHighlight>
}
