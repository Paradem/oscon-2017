import {
  StyleSheet,
  Platform,
} from "react-native";

export const palette = {
  RICH_NAVY: "#2A547A",
  SKY_BLUE: "#1EB4D2",
  HONEYCOMB: "#F2B93B",
  SILVER: "#E8E9EA",
  CHARCOAL: "#4D4D4D",
  WHITE: "#FFF",

}

export const colors = {
  PRIMARY: palette.SKY_BLUE,
  DANGER: palette.HONEYCOMB
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.SILVER,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  textInput: {
    height: 40,
    fontSize: 14,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: palette.SILVER,
  },
  formContainer: {
    flex: 1,
    backgroundColor: palette.SILVER,
  },
  formView: {
    flex: 1,
    padding: 10,
    backgroundColor: palette.WHITE,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
	scrollSection: {
		flex: 1
	},
});
