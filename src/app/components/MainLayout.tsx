import React, { ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/');
  };
  
  return (
    <div>
      <header>
        <div className="navbar bg-white">
          <div className="flex-1">
            <Image src="/mylogo.png" alt="Logo" width={150} height={150} />
          </div>
          <div className="flex-none">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image src="/ytt.png" alt="Logo" width={150} height={150} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-row min-h-screen">
        <div className="bg-primary w-[13%] p-2 flex flex-col">
          MENU
          <li>
            <a href="#">Self-Reporting</a>
          </li>
        </div>
        <main className="p-2 w-full h-full">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
