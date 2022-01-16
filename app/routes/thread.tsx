import * as React from "react";
import { buildUserName } from "~/utils";

export default function Thread() {
  React.useEffect(() => {
    const hasEnteredNoName = localStorage.getItem("name") === null;
    if (hasEnteredNoName) {
      const { name } = buildUserName();
      localStorage.setItem("name", name);
    }
  }, []);

  return <div>Hello World</div>;
}
