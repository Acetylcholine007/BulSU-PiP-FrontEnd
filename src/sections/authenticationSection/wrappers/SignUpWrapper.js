import React, { useEffect, useState } from "react";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Institute } from "../../../utils/bulsupis_mw";
import SignUpPage from '../pages/SignUpPage';
function SignUpWrapper() {
  const [institutes, setInstitutes] = useState(null);

  useEffect(() => {
    Institute.get()
      .then((res) => {
        setInstitutes(res.data.map((item) => item.institute))
      })
      .catch((err) => console.log(err.message));
  });

  return (
    <React.Fragment>
      {!institutes && <LoadingComponent />}
      {institutes && <SignUpPage institutes={institutes} />}
    </React.Fragment>
  );
}

export default SignUpWrapper;
