import React from "react";
import { HashLoader, BeatLoader } from 'react-spinners';

interface FallbackProps {
  h?: number;
  styles?: React.CSSProperties;
}

export default function FallbackLoader({ h, styles }: FallbackProps) {
  return (
    <div
      className="blinking"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
        height: (h ? h : 100) + "vh",
        ...styles
      }}
    >
      <BeatLoader color="#36d7b7"/>
      {/* <HashLoader color="#e80027" size={80} /> */}
    </div>
  );
}
