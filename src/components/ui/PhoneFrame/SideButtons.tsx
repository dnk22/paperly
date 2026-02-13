const SideButtons = ({ height }: { height: number }) => {
  return (
    <>
      {/* Left Side */}
      <div
        className="absolute -left-[4px] w-[4px] bg-black dark:bg-neutral-700 rounded-l-md z-0"
        style={{ top: "12%", height: "3.5%" }} // Mute
      />
      <div
        className="absolute -left-[4px] w-[4px] bg-black dark:bg-neutral-700 rounded-l-md z-0"
        style={{ top: "18%", height: "6.5%" }} // Vol Up
      />
      <div
        className="absolute -left-[4px] w-[4px] bg-black dark:bg-neutral-700 rounded-l-md z-0"
        style={{ top: "26%", height: "6.5%" }} // Vol Down
      />
      {/* Right Side */}
      <div
        className="absolute -right-[4px] w-[4px] bg-black dark:bg-neutral-700 rounded-r-md z-0"
        style={{ top: "20%", height: "9%" }} // Power
      />
    </>
  );
};

export default SideButtons;
