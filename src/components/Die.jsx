import "./die.css";

export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "var(--held-color)" : "var(--secondary-color)",
    color: props.isHeld ? "white" : "var(--primary-color)",
  };

  return (
    <button
      className="die-btn"
      style={style}
      onClick={props.hold}
      aria-label={`Die with value ${props.value} is ${props.isHeld ? "held" : "not held"}`}
      aria-pressed={Die.isHeld}
    >
      {props.value}
    </button>
  );
}