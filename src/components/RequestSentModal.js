import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../httpServices/user';
import {Styles} from '../screens/style';
import {EventsActions} from '../store/Events';
import {UiActions} from '../store/Ui';

const RequestSentModal = () => {
  const dispatch = useDispatch();
  const {requestModal} = useSelector(state => state.UI);
  const onHandleDiscover = () => {
    dispatch(
      UiActions.onHandleUiChange([{element: 'requestModal', value: false}]),
    );
  };
  return (
    <Modal visible={requestModal} animationType="slide" transparent={true}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={Styles.settings.modal}>
          <Text style={Styles.settings.modalText}>
            Request Sent Sucessfully
          </Text>
          <TouchableOpacity
            style={Styles.settings.modlaBtnLogut}
            onPress={() => onHandleDiscover()}>
            <Text style={{color: 'white'}}>Discover More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.settings.modalBtnCancel}
            onPress={() =>
              dispatch(
                UiActions.onHandleUiChange([
                  {element: 'requestModal', value: false},
                ]),
              )
            }>
            <Text style={{color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RequestSentModal;
