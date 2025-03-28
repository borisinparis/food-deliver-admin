const AdminControllerBar = ({
  setStep,
}: {
  setStep: (value: string) => void;
}) => {
  const handleOnClickOnFoodMenu = () => {
    setStep("menu");
  };
  const handleOnClickOnOrder = () => {
    setStep("orders");
  };
  const handleOnClickOnSettings = () => {
    setStep("settings");
  };
  return (
    <>
      <div className="w-[15%] h-screen py-8 px-5 bg-white">
        <div className=" flex flex-col gap-4 mt-8">
          <button
            className={`flex py-2 px-3 w-full justify-center items-center gap-2 rounded-full ${setStep} = "menu" ? " bg-black text-white" : "bg-white text-black"`}
            onClick={handleOnClickOnFoodMenu}
          ></button>
          <button
            className="flex py-2 px-3 w-full justify-center items-center gap-2 rounded-full text-black"
            onClick={handleOnClickOnOrder}
          >
            Orders
          </button>
          <button
            className="flex py-2 px-3 w-full justify-center items-center gap-2 rounded-full text-black"
            onClick={handleOnClickOnSettings}
          >
            Settings
          </button>
        </div>
      </div>
    </>
  );
};
export default AdminControllerBar;
