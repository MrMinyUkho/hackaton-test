import React from "react";
import "./LimitedContainer.scss";

const LimitedContainer = ({ children }) => {
    return <div className="limited-container">{children}</div>;
};

export default LimitedContainer;
