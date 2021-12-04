import React, { useEffect } from "react";
import { View } from "react-native";
import Logo from "./Logo";
import { Default as styles } from "../screens/style";
import { getUserData } from "../httpServices/user";
import { useDispatch } from "react-redux";
import { UiActions } from "../store/Ui";

const Loading = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      const result = await getUserData();
      dispatch(UiActions.onhandleChangeUser(result.data));
    };
    fetch();
  }, []);
  return (
    <View style={styles.defaultStyles.defaultTheme}>
      <View style={styles.defaultStyles.centered}>
        <Logo width="250" height="100" />
      </View>
    </View>
  );
};

export default Loading;
