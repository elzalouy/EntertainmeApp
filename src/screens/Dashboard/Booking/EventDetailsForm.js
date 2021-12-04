import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {UiActions} from '../../../store/Ui';
import StepIndicator from './StepIndicator';
import {Styles as styles} from '../../style';
import Input from '../../../components/Input';
import {EventsActions} from '../../../store/Events';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const EventDetailsForm = props => {
  const [show, setshow] = useState(false);
  const dispatch = useDispatch();
  const {bookEvent} = useSelector(state => state.Events);
  const onPressNext = () => {
    dispatch(
      UiActions.onHandleUiChange([{element: 'formIndicator', value: 2}]),
    );
    props.navigation.navigate('ContactForm');
  };
  const onHandleChange = (text, name) => {
    dispatch(EventsActions.onHandleBookEvent([{element: name, value: text}]));
    dispatch(EventsActions.onHandleError(''));
  };
  const onHandleChangeDate = (element, date) => {
    setshow(false);
    if (date)
      dispatch(
        EventsActions.onHandleBookEvent([
          {element: element, value: new Date(date).toLocaleDateString()},
        ]),
      );
  };
  return (
    <ScrollView>
      <StepIndicator {...props} />
      <View style={styles.defaultStyles.container}>
        <View style={styles.Booking.formContainer}>
          <Text style={styles.Booking.screenLabel}>Event Details</Text>
          <Input
            name="event_name"
            value={bookEvent.event_name}
            title="Event Name"
            placeholder="Event Name"
            onHandleChange={onHandleChange}
          />
          <Input
            name="description"
            value={bookEvent.description}
            title="Event Description"
            placeholder="Event Description"
            multiline={true}
            numberOfLines={4}
            onHandleChange={onHandleChange}
          />
          <Input
            name="address"
            value={bookEvent.address}
            title="Event Address"
            placeholder="Event Address"
            onHandleChange={onHandleChange}
          />
          <Text style={styles.AuthStyles.authText}>Event Date</Text>
          <TouchableOpacity
            style={styles.AuthStyles.authInput}
            onPress={() => setshow(!show)}>
            <Text style={{color: 'white', paddingVertical: 14}}>
              {bookEvent.date
                ? `${new Date(bookEvent.date).toLocaleDateString()}`
                : 'Event Date'}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={bookEvent.date ? new Date(bookEvent.date) : new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, date) => onHandleChangeDate('date', date)}
              dateFormat="day month year"
            />
          )}
          <Input
            name="guests"
            value={bookEvent.guests}
            title="Number of Guests"
            placeholder="Number of Guests"
            onHandleChange={onHandleChange}
          />
          <View style={[styles.defaultStyles.flexContainer]}>
            <View
              style={styles.defaultStyles.flexContainer}
              onTouchEnd={() =>
                onHandleChange(
                  bookEvent.placement === 'indoor' ? 'outdoor' : 'indoor',
                  'placement',
                )
              }>
              <Icon
                name={bookEvent.placement === 'indoor' ? 'square' : 'square-o'}
                size={16}
                color="#ff671d"
                style={styles.AuthStyles.authCheckBox}
              />
              <Text style={styles.AuthStyles.authText}>Indoors</Text>
              <Icon
                name={bookEvent.placement === 'outdoor' ? 'square' : 'square-o'}
                size={16}
                color="#ff671d"
                style={styles.AuthStyles.authCheckBox}
              />
              <Text style={styles.AuthStyles.authText}>OutDoors</Text>
            </View>
          </View>
          <Input
            name="duration"
            value={bookEvent.duration}
            title="Performing Hours"
            placeholder="0"
            onHandleChange={onHandleChange}
          />
          <View
            style={styles.defaultStyles.flexContainer}
            onTouchEnd={() =>
              onHandleChange(
                bookEvent.duration_tbd === true ? false : true,
                'duration_tbd',
              )
            }>
            <Icon
              name={bookEvent.duration_tbd ? 'square' : 'square-o'}
              size={16}
              color="#ff671d"
              style={styles.AuthStyles.authCheckBox}
            />
            <Text style={styles.AuthStyles.authText}>To Be Discussed</Text>
          </View>
          <Input
            name="budget"
            value={bookEvent.budget}
            title="Budget"
            placeholder="Budget"
            onHandleChange={onHandleChange}
          />
          <View
            style={styles.defaultStyles.flexContainer}
            onTouchEnd={() =>
              onHandleChange(bookEvent.budget_tbd ? false : true, 'budget_tbd')
            }>
            <Icon
              name={bookEvent.budget_tbd ? 'square' : 'square-o'}
              size={16}
              color="#ff671d"
              style={styles.AuthStyles.authCheckBox}
            />
            <Text style={styles.AuthStyles.authText}>To Be Discussed</Text>
          </View>
          <TouchableOpacity
            style={styles.AuthStyles.authButton}
            onPress={() => onPressNext()}>
            <Text style={{color: 'white'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EventDetailsForm;
