import React from "react";
import { GeneralContext } from "../App";

export default function RouterGuard({ children, permission }) {
  const { userPermission } = React.useContext(GeneralContext);
  const userHadPermission = permission.includes(userPermission);
  if (!userHadPermission) {
    return (
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        You do not have permission to view this page
      </div>
    );
  } else {
    return children;
  }
}
