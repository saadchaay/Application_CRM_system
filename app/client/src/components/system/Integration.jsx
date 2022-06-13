export default function Integration() {
  return (
    <>
      <div className="flex-1 min-w-0 lg:border-t pt-4 mx-3">
        <div className="bg-white rounded-3xl border shadow-xl p-8 w-full sm:w-3/6">
          <div className="flex justify-between items-center mb-4">
            <img
              src="https://cdn.neow.in/news/images/uploaded/2019/10/1570089797_google-sheets_story.jpg"
              alt=""
              className="w-32"
            />
            <div className="ml-1">
              <span className="font-bold text-cyan-600">
                {" "}
                Linked Your app with Google sheet{" "}
              </span>
              <br />
              <span className="font-medium text-xs text-gray-500 flex justify-end">
                Manage all your order with google sheets
              </span>
            </div>
          </div>
          <div>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg">
              Connect Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
