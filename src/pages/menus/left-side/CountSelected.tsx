import "../../../styles/input.css";

export default function CountSelected({ value}: {value: number;}) {
  return (
    <>
      {value > 0 ? (
        <div className="flex flex-wrap place-content-center text-sm">
          <span className="text-center flex mx-1">{value}</span>{" "}
          <span className="hidden md:flex text-center"> selected</span>
        </div>
      ) : null}
    </>
  );
}
