import React from "react";
import StepIndicator from "react-native-step-indicator";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../../../store/Ui";

const FormIndicator = (props) => {
  const dispatch = useDispatch();
  const { formIndicator } = useSelector((state) => state.UI);

  const setCurrentPosition = (step) => {
    dispatch(
      UiActions.onHandleUiChange([{ element: "formIndicator", value: step }])
    );
    const forms = ["EntertainForm", "EventDetailsForm", "ContactForm"];
    props.navigation.navigate(forms[step]);
  };
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fe7013",
    stepStrokeWidth: 0,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  };

  return (
    <StepIndicator
      customStyles={customStyles}
      currentPosition={formIndicator}
      stepCount={3}
      onPress={(step) => setCurrentPosition(step)}
    />
  );
};

export default FormIndicator;
