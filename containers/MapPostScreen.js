import React from 'react'
import {
  KeyboardAvoidingView,
  Animated,
  Button,
  Dimensions,
  Image,
	Platform,
  ScrollView,
  StyleSheet,
  Keyboard,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles, palette, colors } from "../styles";
import { CardStack } from 'react-navigation';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const { width, height } = Dimensions.get('window');

class Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { photo: null }
  }

	cancel() {
		this.props.navigateBack();
	}

	savePost() {
	  Keyboard.dismiss();
		this.props.createPost(Object.assign({}, this.state.photo,  this.props.draftPost));
		this.props.navigateHome();
	}

	clearPicture() {
    this.setState({ photo: null })
  }

  takePicture() {
    const options = {};
    this.camera.capture({
      mode: Camera.constants.CaptureMode.still
    }).then((data) => {
        this.setState({ photo: data })
    }).catch(err => console.error(err));
  }

  renderStep1() {
    return <View style={styles.container}>
      <Text style={styles.heading2} >Post Photo</Text>
      <Camera
        ref={(cam) => { this.camera = cam; }}
        style={screenStyles.camera}
        captureTarget={Camera.constants.CaptureTarget.disk}
        aspect={Camera.constants.Aspect.fit}>
        <TouchableHighlight style={[ screenStyles.snapButton, { backgroundColor: palette.HONEYCOMB } ] } 
          onPress={this.takePicture.bind(this)} >
          <Text style={ screenStyles.buttonText }>SNAP</Text>
        </TouchableHighlight>
      </Camera>
      <View style={screenStyles.toolbar}>
        {this.renderCancel()}
      </View>
    </View>
  }

  renderPicturePreview() {
    return <View style={{ flex: 1 }}>
      <Image source={ { uri: this.state.photo.path } } style={ screenStyles.imagePreview } />
      <Text style={screenStyles.buttonText} onPress={this.clearPicture.bind(this)}>Retake</Text>
    </View>
  }

  renderCancel() {
    return <TouchableHighlight style={ [ screenStyles.button, { backgroundColor: palette.CHARCOAL } ] } onPress={() => this.cancel() } >
      <Text style={ screenStyles.buttonText } >Cancel</Text>
    </TouchableHighlight>
  }

  renderSave() {
    return <TouchableHighlight style={ screenStyles.button } onPress={() => this.savePost() } >
      <Text style={ screenStyles.buttonText } >Save</Text>
    </TouchableHighlight>
  }

  renderFooter() {
    return <View style={screenStyles.toolbar}>
      {this.renderCancel()}
      {this.renderSave()}
    </View>
  }

  renderStep2() {
    return <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        keyboardDismissMode='interactive'
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={0}
        style={screenStyles.scrollContainer}>
          <View style={styles.formView}>
              {this.renderPicturePreview()}
              <TextInput
                style={styles.textInput}
                placeholder="Post Name"
                onChangeText={(name) => this.props.setDraftPostName(name)}
              />
          </View>
        </ScrollView>
        {this.renderFooter()}
      </KeyboardAvoidingView>
  }

  render() {
    return <View style={styles.formContainer} >
      { this.state.photo ? this.renderStep2() : this.renderStep1() }
    </View>
   }
}
const screenStyles = StyleSheet.create({
  scrollContainer: {
    flex: 10,
  },
  imagePreview: {
    height: 200,
    alignItems: 'center'
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: "#C00",
    height: 50,
  },
  button: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY
  },
  buttonText: {
    fontSize: 17,
    textAlign: 'center',
    flex: 1,
    marginTop: 15,
    justifyContent: 'space-around',
    color: palette.WHITE,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  snapButton: {
    borderRadius: 10,
    opacity: 0.8,
    backgroundColor: palette.HONEYCOMB,
    alignItems: 'center',
    width: 150,
    height: 50,
    margin: 20,
  }
});

function mapStateToProps(state) {
  return {
		draftPost: state.draftPost
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
