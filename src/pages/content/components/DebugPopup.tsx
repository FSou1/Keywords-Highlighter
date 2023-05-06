import React, { useState, useCallback, useMemo } from "react";
import { OBSERVABLE_DEBOUNCE_TIME_MS } from "@services/constants";
import useMutationObservable, {
  DEFAULT_OPTIONS,
} from "../hooks/useMutationObservable";
import {
  findNodesRecursively,
  findNodesWithTreeWalker,
} from "../utils/nodeSelector";
import { measurePerformance } from "../utils/performanceTimer";

export default function DebugPopup() {
  const [mutationCounter, setMutationCounter] = useState(0);
  const [nodesFoundRecursively, setNodesFoundRecursively] = useState(0);
  const [recursiveExecutionTime, setRecursiveExecutionTime] = useState("0");
  const [nodesFoundWithTreeWalker, setNodesFoundWithTreeWalker] = useState(0);
  const [treeWalkerExecutionTime, setTreeWalkerExecutionTime] = useState("0");

  const onMutation = useCallback(() => {
    setMutationCounter((prevState) => prevState + 1);

    const { result: nodesA, executionTimeMs: recursiveExecTime } =
      measurePerformance(() => findNodesRecursively(document.body), 3);
    setRecursiveExecutionTime(recursiveExecTime + "ms");
    setNodesFoundRecursively(nodesA.length);

    const { result: nodesB, executionTimeMs: treeWalkerExecTime } =
      measurePerformance(() => findNodesWithTreeWalker(document.body), 3);
    setTreeWalkerExecutionTime(treeWalkerExecTime + "ms");
    setNodesFoundWithTreeWalker(nodesB.length);
  }, []);

  const options = useMemo(
    () => ({
      ...DEFAULT_OPTIONS,
      debounceTimeMs: OBSERVABLE_DEBOUNCE_TIME_MS,
    }),
    []
  );

  useMutationObservable(document, onMutation, options);

  return (
    <div className="content-view">
      <div>
        <span>Mutation counter: {mutationCounter}</span>
      </div>
      <div>
        <div>Recursive algorithm:</div>
        <p>Nodes found: {nodesFoundRecursively}</p>
        <p>Execution time:{recursiveExecutionTime}</p>
      </div>
      <div>
        <div>TreeWalker algorithm:</div>
        <p id="test">Nodes found: {nodesFoundWithTreeWalker}</p>
        <p>Execution time: {treeWalkerExecutionTime}</p>
      </div>
    </div>
  );
}
