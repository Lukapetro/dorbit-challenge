import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <a
            href="https://www.lukapetrovic.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-indigo-600 font-semibold tracking-wide uppercase hover:underline"
          >
            @lukapetro
          </a>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to d-orbit challenge
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Check the{" "}
            <a
              className="text-indigo-600 font-semibold hover:underline"
              href="https://github.com/Lukapetro/dorbit-challenge"
              target="_blank"
              rel="noopener noreferrer"
            >
              repo on github
            </a>{" "}
            for full project details.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Navigate between the 2 pages to see the app features.
          </p>
        </div>

        <div className="mt-4 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-12 lg:px-8">
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-start md:justify-center">
            <div className="rounded-md shadow">
              <Link
                to="/table"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Table
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link
                to="/graph"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Graph
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
