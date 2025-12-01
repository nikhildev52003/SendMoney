
export  function Button({  text}) {
  return (
    <button
      type="submit"
      className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
    >
      {text}
    </button>
  );
}
