import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { getMilestonesUser } from "../Api";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
// import { count } from "console";

const StyledVerticalTimelineElement = styled(VerticalTimelineElement)`
.vertical-timeline-element-content {
    background-color: #23272A;
}
.
`

const Timeline = () => {
  const [milestones, setMilestones] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const [counter, setCounter] = useState(0);
  const milestonesList = milestones.reverse()
  console.log(milestonesList);
console.log(counter)
//   const timelineElementStyle = {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//   };

  useEffect(() => {
    const getter = async () => {
      const result = await getMilestonesUser(userId);
      console.log(result);
      setMilestones(result);
      setCounter(counter+1)
    };
    getter();
}, [userId]);


  
  return (
    <VerticalTimeline>
      {milestonesList.map((milestone) => {
        return (
          <StyledVerticalTimelineElement
            className="vertical-timeline-element--work my-class text-white"
            iconStyle={{ background: "rgb(255, 50, 150)", color: "#fff" }}
  
            style={{color:"ff007f"}}
          >
            <div>
              <h3 className="vertical-timeline-element-title">
                {milestone.title}
              </h3>
              <p>{milestone.description}</p>
            </div>{" "}
            <div style={{textAlign:"right"}}>
              {" "}
              <img
                src={
                  "https://hacked-2023-lifestone.s3.ca-central-1.amazonaws.com/" +
                  milestone.s3_filename
                }
                style={{ objectFit: "cover", width: "115px", height: "115px" }}
                alt="I"
              />
            </div>
          </StyledVerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  );
};

export default Timeline;