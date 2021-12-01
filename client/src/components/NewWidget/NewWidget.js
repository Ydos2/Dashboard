
import { BsFillCursorFill } from "react-icons/bs";

export default function NewWidget(props) {
    return (
        <form>
          <div className="bg-white  p-4 px-4 text-sm ">
            <div className="md:col-span-5">
              <label htmlFor="full_name" className="text-left">
                Full Name
              </label>
    
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Full Name"
              />
              <p className="mt-2 text-sm text-red-600"></p>
            </div>
    
            <div className="mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="email@domain.com"
              />
              <p className="mt-2 text-sm text-red-600"></p>
            </div>
            <div className="mt-3">
              <label htmlFor="email">PhoneNumber</label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="250 788 841 494"
              />
              <p className="mt-2 text-sm text-red-600">
              </p>
            </div>
    
            <div className="mt-3 text-right">
              <div className="inline-flex items-end">
                <button
                  type="submit"
                  className="flex items-center bg-indigo-600 text-white hover:bg-purple-500 p-2 rounded text-sm w-auto"
                  // onClick={onSubmitHandle}
                >
                  <BsFillCursorFill />
                  <span>&nbsp;Submit</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      );
}