import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import StepIndicator from './StepIndicator';
import {Styles as styles} from '../../style';
import Input from '../../../components/Input';
import {requestOrder} from '../../../httpServices/event';
import {EventsActions} from '../../../store/Events';

const ContactForm = props => {
  const dispatch = useDispatch();
  const {bookEvent, error} = useSelector(state => state.Events);

  /**UseEffect for Setting the type of Event */
  useEffect(() => {
    dispatch(
      EventsActions.onHandleBookEvent([{element: 'type', value: 'brief'}]),
    );
  }, []);
  /**
   *onHandleChange
   * @param {Text} text Value we need to insert
   * @param {Name} name The name of the attribute we need to change
   */
  const onHandleChange = (text, name) => {
    dispatch(EventsActions.onHandleBookEvent([{element: name, value: text}]));
    dispatch(EventsActions.onHandleError(''));
  };
  /**
   * onHandleSubmit
   *
   * Submit the event after filling the form
   */
  const onHandleSubmit = async () => {
    const result = await requestOrder(bookEvent);
    if (result.data) {
      dispatch(EventsActions.onHandleInitialize());
      props.navigation.navigate('Home');
    }
    if (result.error.length > 0)
      dispatch(EventsActions.onHandleError(result.error));
  };
  return (
    <ScrollView>
      <StepIndicator {...props} />
      <View style={styles.defaultStyles.container}>
        <View style={styles.Booking.formContainer}>
          <Text style={styles.Booking.screenLabel}>Book Your Event</Text>
          <Input
            name="name"
            value={bookEvent.name}
            title="Name"
            placeholder="Name"
            onHandleChange={onHandleChange}
          />
          <Input
            name="email"
            value={bookEvent.email}
            title="Email"
            placeholder="Email"
            onHandleChange={onHandleChange}
          />
          <Input
            name="phone_number"
            value={bookEvent.phone_number}
            title="Phone Number"
            placeholder="Phone Number"
            onHandleChange={onHandleChange}
          />
          <Input
            name="additional_info"
            value={bookEvent.additional_info}
            title="Additional Info"
            placeholder="Additional Info"
            onHandleChange={onHandleChange}
          />
          <Text style={{color: '#ff671d'}}>{error}</Text>
          <TouchableOpacity
            style={styles.AuthStyles.authButton}
            onPress={() => onHandleSubmit()}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactForm;
