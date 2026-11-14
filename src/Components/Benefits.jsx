const benefits = [
  { num: "01", title: "Real ingredients" },
  { num: "02", title: "Auto-Saved Schedule" },
  { num: "03", title: "Drag & Drop Planning" },
  { num: "04", title: "1,000+ Global Recipes" },
];

function Benefits() {
  return (
    <div className="flex justify-center bg-[#123B2B] py-7 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-6 w-full max-w-6xl">
        {benefits.map((item) => (
          <div
            key={item.num}
            className="flex gap-4  justify-center sm:justify-start items-center"
          >
            <p className="text-[#81BE9F] text-[12px]">{item.num}</p>
            <h3 className="text-white text-[17px] font-medium">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Benefits;
