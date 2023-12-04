import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#2679ff',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 0.5,
    paddingHorizontal: 15,
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  theirMessageContainer: {
    justifyContent: 'flex-start',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 24,
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#2679ff',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#ccc',
    alignSelf: 'flex-start',
  },
  myMessageText: {
    color: 'white',
  },
  theirMessageText: {
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#white',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    marginRight: 10,
  },
  sendButton: {
    flex: 0.15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2679ff',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
