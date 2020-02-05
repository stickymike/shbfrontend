import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

import moment from "moment";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Refresh from "@material-ui/icons/Refresh";

import { RouterProps } from "react-router";
import { NEW_GET_ME } from "../../gql/queries/userQuery";
import { useQuery } from "@apollo/react-hooks";
import UserCodeScreen from "./UserCodeScreen";
import { Me, Me_me } from "../../generated/Me";
import UserPunchScreen from "./UserPunchScreen";
import MyLoading from "../../components/MyLoading";
import NewPaper from "../../components/NewPaper";

const NewPunchPage: React.FC<RouterProps> = () => {
  const [user, setUser] = useState<any | string>("");
  const screen = user && user.id ? "clockin" : "signin";
  const date = moment().startOf("isoWeek");

  const { loading, data, refetch } = useQuery<Me>(NEW_GET_ME);

  let me: Me_me | null | undefined = null;
  if (data && data.me) me = data.me;

  useEffect(() => {
    setUser(me);
  }, [me, setUser]);

  if (loading) return null;

  let submitMyForm: (() => void) | null = null;

  function changeSubmit(newsubmit: () => void) {
    if (newsubmit) submitMyForm = newsubmit;
  }

  const isDisabled = () => {
    if (user === undefined) return true;
    if (screen === "signin") return false;
    if (user && user.timeRoles && user.timeRoles[0]) return false;
    return true;
  };

  const handleSubmitMyForm = () => {
    if (submitMyForm) {
      me ? setUser(undefined) : setUser(null);
      submitMyForm();
    }
  };

  const reset = async () => {
    if (me) setUser(undefined);
    const {
      data: { me: newMe }
    } = await refetch();
    setUser(newMe);
  };

  const buttonText = () => {
    if (user === undefined) return "Loading";
    if (user && user.clockedIn) return "Punch Out";
    if (screen === "signin") return "Access";
    else return "Punch In";
  };

  const screenRender = () => {
    if (user === undefined) return <MyLoading />;
    return (
      <>
        {!user && (
          <UserCodeScreen setUser={setUser} submitMyForm={changeSubmit} />
        )}
        {user && (
          <UserPunchScreen
            user={user}
            date={date}
            submitMyForm={changeSubmit}
          />
        )}
      </>
    );
  };

  const actionIcon = {
    icon: me ? Refresh : ArrowBack,
    onClick: reset
    // iClass: outClass
  };

  return (
    <NewPaper
      title="Quick Punch"
      actionIcons={screen === "clockin" ? [actionIcon] : undefined}
    >
      {screenRender()}

      <Button
        variant={screen === "signin" ? "contained" : "outlined"}
        color={user && buttonText() === "Punch Out" ? "secondary" : "primary"}
        size="large"
        onClick={handleSubmitMyForm}
        style={{ width: "225px" }}
        disabled={isDisabled()}
      >
        {buttonText()}
      </Button>
    </NewPaper>
  );
};

export default NewPunchPage;
