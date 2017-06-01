import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const propTypes = {
//  text: PropTypes.Number.isRequired,
  text:PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  backgroundColor:PropTypes.string,
  color:PropTypes.string,
};

const defaultProps = {
  fontSize: 13,
  backgroundColor:'#FF5A5F',
  color:'#FFFFFF',
  borderColor:"#D23F44"
};

class PinMarker extends React.Component {
  render() {
    const { fontSize, text, backgroundColor,borderColor, color } = this.props;
    return (
      //สร้าง marker
      <View style={styles.container}>
        <View style={[styles.bubble,{backgroundColor:backgroundColor, borderColor:borderColor}]}>
          <Text style={[styles.text, { fontSize , color:color}]}>{text}</Text>
        </View>
        <View style={[styles.arrowBorder,{borderTopColor:backgroundColor}]} />
        <View style={[styles.arrow, {borderTopColor:borderColor}]} />
      </View>
    );
  }
}

PinMarker.propTypes = propTypes;
PinMarker.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#FF5A5F',
    padding: 5,
    borderRadius: 15,
    borderColor: '#D23F44',
    borderWidth: 0.5,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#FF5A5F',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#D23F44',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = PinMarker;
