import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

type NavbarProps = {
  user?: {
    id: string;
    avatar_url: string;
    name: string;
  };
};

const Navbar: FunctionComponent<NavbarProps> = ({ user }) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <>
      <header className="flex flex-row justify-between items-center w-full  border-b py-7  px-2 border-gray-500 gap-2">
        <a href="/" className="flex space-x-2">
          <svg
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="-15 0 150 120"
            class="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded fill-current text-indigo-200 h-10 w-10 "
          >
            <g>
              <path d="M112.28,107.53c0,1.01-0.82,1.84-1.84,1.84H11.93c-1.01,0-1.84-0.82-1.84-1.84V51.67 c-2.06,0.79-3.97,0.8-5.57,0.27c-1.25-0.42-2.3-1.17-3.07-2.15c-0.77-0.97-1.26-2.16-1.41-3.46C-0.18,44.3,0.43,42,2.15,39.85l0,0 c0.09-0.11,0.19-0.21,0.3-0.3l57.6-39.07c0.65-0.6,1.65-0.66,2.37-0.1l57.7,38.99l0,0c0.08,0.06,0.15,0.13,0.22,0.2 c2.32,2.5,2.9,5.27,2.34,7.62c-0.28,1.15-0.83,2.2-1.59,3.05c-0.76,0.86-1.73,1.52-2.84,1.92c-1.76,0.64-3.84,0.61-5.96-0.39 C112.28,67.37,112.28,91.94,112.28,107.53L112.28,107.53L112.28,107.53z M45.33,36.35h32.21v21.69H45.33V36.35L45.33,36.35 L45.33,36.35z M56.28,42.24c0.93,0,1.69,0.76,1.69,1.69s-0.76,1.69-1.69,1.69c-0.93,0-1.69-0.76-1.69-1.69 C54.59,42.99,55.34,42.24,56.28,42.24L56.28,42.24L56.28,42.24z M63.39,49.49l3.8-5.84l3.59,9.08h-17.6V51.6l1.41-0.07L56,48.08 l1.12,2.47h2.11l1.83-4.72L63.39,49.49L63.39,49.49L63.39,49.49z M47.27,38.58h28.35v17.23H47.27V38.58L47.27,38.58z M60.93,74.68 c0.04,0.01,0.09,0,0.13-0.04c2.16-1.69,5.33-0.98,6.78,2.56h-0.03c-2.86,2.43-4.91,5.07-5.65,8.02h-4.14L60.93,74.68L60.93,74.68 L60.93,74.68z M75.35,81.43c0.35,3-2.73,5.59-5.44,4.77c-0.38,0.66-0.67,1.49-0.9,2.49c-0.51,2.33-0.36,1.62-0.14,3.88 c0.3,3.01-0.02,5.06-1.96,5.94v1.16H27.73v-1.16c-1.51-0.54-2.16-2.02-1.93-4.45c0.5-4.58,0.19-6.01-0.96-7.74 c-2.02,0.07-3.48-0.41-4.39-1.43c-1.86-2.07-1.29-5.1,1.03-6.55c0.48-0.3,1.04-0.53,1.69-0.67c4.98-1.05,7.73,4.05,9.05,8.07 l13.07,0.35c0.89,0.12,1.46,0.52,1.84,1.06c0.35-0.53,0.86-0.93,1.64-1.11c4.07-0.18,6.98,0.36,9.95,0.36h3.46 c0.71,0,1.08-0.31,1.2-0.88c0.88-2.68,4-8.06,7.27-7.96C72.66,77.63,74.85,79.01,75.35,81.43L75.35,81.43L75.35,81.43z M27.14,76.88L27.14,76.88c1.32-2.94,3.38-3.67,6.19-2.69l3.01,10.35h-3.25C31.58,81.46,30.58,78.33,27.14,76.88L27.14,76.88 L27.14,76.88z M34.6,74.27c0.04-0.02,0.07-0.05,0.09-0.1c1.11-2.56,4.17-3.28,6.67-2.18c0-0.01,0.01-0.01,0.01-0.01l0.68,13.18 h-4.33L34.6,74.27L34.6,74.27L34.6,74.27z M42.7,71.71c0.81-3.37,8.49-2.68,9.2-0.36c0.1-0.01-0.8,12.44-0.86,13.82H49.9 c-1.8,0-3.39,0-5.17,0h-1.44l-0.56-13.46L42.7,71.71L42.7,71.71L42.7,71.71z M52.9,72.28c0.02,0,0.05-0.01,0.08-0.02 c2.78-1.48,6.65-0.4,7.02,1.53l-0.19,0.07l-3.05,11.3h-4.51L52.9,72.28L52.9,72.28L52.9,72.28z M92.83,77.9v18.35h3.7 c0.57,0,1.03,0.67,1.03,1.24c0,0.57-0.46,1.24-1.03,1.24H86.28c-0.57,0-1.03-0.67-1.03-1.24c0-0.57,0.46-1.24,1.03-1.24h3.7V77.9 H92.83L92.83,77.9z M86.09,64h10.6l3.11,12.27h-16.8L86.09,64L86.09,64L86.09,64z M107.66,104.74V49.62c0-0.12,0.01-0.24,0.03-0.35 L61.62,18.58l-46.96,30.7c0.04,0.15,0.06,0.31,0.06,0.47v54.99C45.7,104.74,76.68,104.74,107.66,104.74L107.66,104.74 L107.66,104.74z" />
            </g>
          </svg>
          <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight text-gray-300">
            roomGPT.io
          </h1>
        </a>
        {user
          ? (
            <div class="flex gap-x-8 text-gray-300 justify-center items-center">
              <a href="/logout">Logout</a>
              <a
                href="/cuartos"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
              >
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  title={user.name}
                  width="40"
                  height="40"
                  className="max-w-full rounded-full"
                />
                <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white">
                  <span className="sr-only">7 new emails</span>
                </span>
              </a>
            </div>
          )
          : (
            <div>
              <a
                className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-500 bg-blue-600 font-medium transition"
                href="/auth/login"
                rel="noopener noreferrer"
              >
                <p>Log In</p>
              </a>
            </div>
          )}
      </header>
      {/*<!-- End Navbar with Avatar--> */}
    </>
  );
};

export default Navbar;