import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Presale from "../pages/presale";

import "bootstrap/dist/css/bootstrap.min.css";
import "../components/assets/css/custom.css";

function Routes() {
  return (
		<BrowserRouter>			
			<Route exact path="/" component={Presale} />
		</BrowserRouter>
  );
}

export default Routes;
