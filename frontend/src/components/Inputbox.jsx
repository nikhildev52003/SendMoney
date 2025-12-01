export  function InputBox({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="mb-4 ">
      <label className=" flex text-gray-700 mb-1 ">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
