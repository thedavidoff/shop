import React from "react";
import { HashLink } from "react-router-hash-link";

const ForwardLink = React.forwardRef((props, ref) => (
  <HashLink {...props} innerRef={ref} />
));

export default ForwardLink;
