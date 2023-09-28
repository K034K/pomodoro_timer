import { useRef } from "react";
import { createRoot } from "react-dom/client";

import Options from "./Components/Options";


import "purecss/build/pure.css";

const root = createRoot(document.getElementById("root"));

root.render(<Options />);