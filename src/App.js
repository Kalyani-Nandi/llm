import React, { useRef, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Input from "./components/Input";
import Output from "./components/Output";
import LlmEngine from "./components/LlmEngine";
import { DnDProvider, useDnD } from "./context/DnDContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  // onConnect to handle adding edges
  const onConnect = useCallback((params) => {
    console.log("Edge connected:", params);
    setEdges((eds) => addEdge(params, eds));
  }, []);

  // onDragOver to allow dropping nodes
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    console.log("Dragging over flow area");
  }, []);

  // onDrop to handle dropped node creation
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      console.log("Drop event detected");

      // Check if valid type is being dragged
      if (!type) {
        return;
      }

      // Calculate position and create new node
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      console.log("Drop position:", position);

      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: (() => {
            if (type === "input") {
              return <Input />;
            } else if (type === "output") {
              return <Output />;
            } else {
              return <LlmEngine />;
            }
          })(),
        },
      };

      // Add new node to nodes state
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="mt-20 dndflow">
        <Sidebar />
        <div style={{ width: "100vw", height: "90vh" }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <App />
    </DnDProvider>
  </ReactFlowProvider>
);
