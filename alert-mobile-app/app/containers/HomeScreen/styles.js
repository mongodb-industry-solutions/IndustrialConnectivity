import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
    // center the recordPlayer in the background Image
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', // make sure background covers all of screen
  },
  cover: {
  },
  close: {
    position: "absolute",
    zIndex: 0,
    top: 90,
    left: 40,
    width: 78,
    height: 78,
  },
  recordPlayer: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  backgroundContainerr: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerr: {
    flex: 1,
    height: 50,
    alignItems: 'center',
  },
  overlay: {
    opacity: 0.5,
  },
  logo: {
    width: 52,
    height: 52
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },

  scrollView: {
    backgroundColor: '#fff',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  footer: {
    color: '#444',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  body: {
    backgroundColor: '#FFF',
  },
  container: {
    marginTop: 12,
    // paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  localeToggle: {
    flex: 2,
    fontSize: 18,
    fontWeight: '400',
    color: '#1292B4',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#444',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    flex: 3,
    paddingVertical: 16,
    fontWeight: '400',
    fontSize: 18,
    color: '#444',
  },
  separator: {
    backgroundColor: '#DAE1E7',
    height: 1,
  },
});

export default styles;
