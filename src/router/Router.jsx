import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Buttle } from "../components/pages/Buttle"
import { Home } from "../components/pages/Home";

export const Router=()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/buttle">
                    <Buttle />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}