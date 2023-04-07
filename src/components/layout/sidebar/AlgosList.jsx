import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { List } from "@mui/material";
import ApiIcon from "@mui/icons-material/Api";
import TimelineIcon from "@mui/icons-material/Timeline";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import CallMergeOutlinedIcon from "@mui/icons-material/CallMergeOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ListHeader from "./ListHeader";
import ListButton from "../../common/ListButton";
import { shuffleAxle } from "../../../utils/axleUtils";
import { cleanPrevAlgo } from "../../../utils/boardUtils";
import { resetIndicators } from "../../../utils/commonUtils";
import { axleChanged } from "../../../store/axle";
import {
  runtimeChanged,
  snapshotTook,
  visualizingAborted,
} from "../../../store/runtime";
import useGetCategoryAndAlgo from "../../../hooks/useGetCategoryAndAlgo";

const AlgosList = () => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { axle } = useSelector(({ axle }) => axle);
  const { isPainted, midwayActive, mouseChaseActive } = useSelector(
    ({ runtime }) => runtime
  );
  const [category] = useGetCategoryAndAlgo();

  const [open, setOpen] = useState(false);

  const styles = { icon: { fontSize: 20 } };

  const pathAlgos = [
    { algo: "Dijkstra-Algorithm", icon: <ApiIcon sx={styles.icon} /> },
    { algo: "Depth-First-Search", icon: <LowPriorityIcon sx={styles.icon} /> },
  ];

  const sortAlgos = [
    { algo: "Quick-Sort", icon: <BoltOutlinedIcon sx={styles.icon} /> },
    { algo: "Merge-Sort", icon: <CallMergeOutlinedIcon sx={styles.icon} /> },
    { algo: "Heap-Sort", icon: <ArrowDropUpOutlinedIcon sx={styles.icon} /> },
    { algo: "Radix-Sort", icon: <NumbersOutlinedIcon sx={styles.icon} /> },
    { algo: "Bubble-Sort", icon: <BubbleChartOutlinedIcon sx={styles.icon} /> },
  ];

  const prepareAlgo = (label) => {
    window.hasAborted = true;
    window.snapshot.path = { visited: [], path: [], indices: [0, 0] };

    batch(() => {
      dispatch(visualizingAborted());
      resetIndicators(dispatch);

      if (category === "Sorting" && isPainted) {
        const shuffledAxle = shuffleAxle(axle);
        dispatch(axleChanged({ att: "axle", val: shuffledAxle }));
        dispatch(
          snapshotTook({ category: "sort", val: { swaps: [], idx: 0 } })
        );
        dispatch(runtimeChanged({ att: "isPainted", val: false }));
      }

      category === "Path-finding" && isPainted && cleanPrevAlgo(grid, dispatch);
      midwayActive &&
        dispatch(runtimeChanged({ att: "midwayActive", val: false }));
      mouseChaseActive &&
        dispatch(runtimeChanged({ att: "mouseChaseActive", val: false }));
    });
  };

  return (
    <List>
      <ListHeader label="Path-finding" />
      {pathAlgos.map(({ algo, icon }) => (
        <ListButton
          key={algo}
          label={algo}
          startIcon={icon}
          handleClick={prepareAlgo}
        />
      ))}

      <ListHeader label="Sorting" />

      {sortAlgos.map(({ algo, icon }) => (
        <ListButton
          key={algo}
          label={algo}
          startIcon={icon}
          handleClick={prepareAlgo}
        />
      ))}
    </List>
  );
};

export default AlgosList;
