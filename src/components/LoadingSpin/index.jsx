import { Loader2 } from "lucide-react";
import "./styles.css";

const LoadingSpin = () => {
  return (
    <div className="loading-animate-container">
      <Loader2 className="spinner" size={24} />
    </div>
  );
};

export default LoadingSpin;
