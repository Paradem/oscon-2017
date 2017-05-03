import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  Keyboard,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Camera from 'react-native-camera';

import SecondaryButton from '../components/SecondaryButton';
import PrimaryButton from '../components/PrimaryButton';
import { ActionCreators } from '../actions';
import { styles, palette } from '../styles';

const screenStyles = StyleSheet.create({
  scrollContainer: {
    flex: 10,
  },
  imagePreview: {
    height: 200,
    alignItems: 'center',
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
  },
});

class Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { photo: null };
    this.takePicture = this.takePicture.bind(this);
    this.clearPicture = this.clearPicture.bind(this);
  }

  cancel() {
    this.props.navigateBack();
  }

  savePost() {
    Keyboard.dismiss();
    this.props.navigateHome();
  }

  clearPicture() {
    this.setState({ photo: null });
  }

  takePicture() {
    this.camera.capture({
      mode: Camera.constants.CaptureMode.still,
    }).then((data) => {
      this.setState({ photo: data });
      this.nameTextInput.focus();
    });
  }

  renderStep1() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading1} >Post Photo</Text>
        <Camera
          ref={(cam) => { this.camera = cam; }}
          style={screenStyles.camera}
          captureTarget={Camera.constants.CaptureTarget.disk}
          aspect={Camera.constants.Aspect.fit}
        >
          <TouchableHighlight
            style={[screenStyles.snapButton, { backgroundColor: palette.HONEYCOMB }]}
            onPress={this.takePicture}
          >
            <Text style={styles.buttonText}>SNAP</Text>
          </TouchableHighlight>
        </Camera>
        <View style={styles.toolbar}>
          <SecondaryButton label="Cancel" onPress={() => this.cancel()} />
        </View>
      </View>
    );
  }

  renderPicturePreview() {
    return (
      <View style={{ flex: 1, height: 240 }}>
        <Text style={styles.heading1} >Post Photo</Text>
        <Image source={{ uri: this.state.photo.path }} style={screenStyles.imagePreview} />
        <Text style={styles.buttonText} onPress={this.clearPicture}>Retake</Text>
      </View>);
  }


  renderStep2() {
    return (<KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator
        scrollEventThrottle={0}
        style={screenStyles.scrollContainer}
      >
        <View style={styles.formView}>
          {this.renderPicturePreview()}
          <TextInput
            ref={(nameTextInput) => { this.nameTextInput = nameTextInput; }}
            style={styles.textInput}
            placeholder="Post Name"
          />
        </View>
      </ScrollView>
      {this.renderFooter()}
    </KeyboardAvoidingView>);
  }

  renderFooter() {
    return (<View style={styles.toolbar}>
      <SecondaryButton label="Cancel" onPress={() => this.cancel()} />
      <PrimaryButton label="Save" onPress={() => this.savePost()} />
    </View>);
  }

  render() {
    return (<View style={styles.formContainer} >
      { this.state.photo ? this.renderStep2() : this.renderStep1() }
    </View>);
  }
}

Screen.propTypes = {
  navigateBack: React.PropTypes.func.isRequired,
  navigateHome: React.PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
