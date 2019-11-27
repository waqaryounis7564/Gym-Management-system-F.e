import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../components/container/dashboard";
import Equipment from "../components/container/equipment";
import Exercise from "../components/container/exercise";
import Fee from "../components/container/fee";
import Login from "../components/container/login";
import Member from "../components/container/members";
import PhysicalRecord from "../components/container/physicalRecord";
import Salary from "../components/container/salary";
import Trainer from "../components/container/trainer";
import Registration from "../components/common/registration";
import Cardcomp from "../components/common/card";
import LoginForm from "../components/common/loginForm";
import SignUpForm from "../components/common/signUpForm";
import CardDetails from "../components/common/cardDetails";
import ExerciseCard from "../components/common/exerciseCard";
import CreateExercise from "../components/common/formExercise";
import RegisterUser from "../components/container/registerUser";
import RegisterTrainer from "../components/container/registerTrainer";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/equipment" component={Equipment}></Route>
      <Route path="/exercise" component={Exercise}></Route>
      <Route path="/member/:id?" component={Member}></Route>
      <Route path="/trainer" component={Trainer}></Route>
      <Route path="/physical" component={PhysicalRecord}></Route>
      <Route path="/fee/" component={Fee}></Route>
      <Route path="/salary" component={Salary}></Route>
      <Route path="/registration" component={Registration}></Route>
      <Route path="/card" component={Cardcomp}></Route>
      <Route path="/registerUser" component={RegisterUser}></Route>
      <Route path="/loginform" component={LoginForm}></Route>
      <Route path="/signupform" component={SignUpForm}></Route>
      <Route path="/exercisecard" component={ExerciseCard}></Route>
      <Route path="/carddetails" component={CardDetails}></Route>
      <Route path="/createexercise" component={CreateExercise}></Route>
      <Route path="/registerTrainer" component={RegisterTrainer}></Route>
    </Switch>
  );
};

export default Routes;
