const AskPage = () =>{
  return (
    <div className="w-full p-4">
      <div className="container mx-auto max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <div className="chatbox">
          <div className="grid items-center gap-2">
            <h3 className="text-2xl font-bold">Eco Score</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Your Eco Score is calculated based on your consumption and
              recycling habits.
            </p>
          </div>
          <div className="grid items-center gap-2">
            <h3 className="text-2xl font-bold">Nutri Score</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Your Nutri Score is calculated based on the nutritional value of
              your diet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskPage