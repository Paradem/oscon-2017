import {
  StyleSheet,
  Platform,
} from 'react-native';

export const palette = {
  RICH_NAVY: '#2A547A',
  SKY_BLUE: '#1EB4D2',
  HONEYCOMB: '#F2B93B',
  SILVER: '#E8E9EA',
  CHARCOAL: '#4D4D4D',
  WHITE: '#FFF',

};

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
  heading1: {
    fontSize: 24,
    fontWeight: '300',
    paddingLeft: 10,
    paddingBottom: 2,
    paddingTop: 4,
    color: palette.SKY_BLUE,
  },
  heading2: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 2,
    paddingTop: 4,
    color: palette.RICH_NAVY,
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
  postCard: {
    marginBottom: 10,
    marginHorizontal: 7,
    backgroundColor: palette.WHITE,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 10,
    borderBottomColor: palette.CHARCOAL,
    borderBottomWidth: 4,

  },
  button: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.SKY_BLUE,
  },
  buttonText: {
    fontSize: 17,
    textAlign: 'center',
    flex: 1,
    marginTop: 15,
    justifyContent: 'space-around',
    color: palette.WHITE,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#C00',
    height: 50,
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
    flex: 1,
  },
});
